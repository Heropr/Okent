const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Anthropic = require('@anthropic-ai/sdk');
const db = require('../db/database');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const videoUpload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 } // 500MB limit
});

// Upload images and create a batch
router.post('/upload', upload.array('images', 20), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const batchId = uuidv4();
    db.createBatch(batchId);

    const assets = req.files.map(file => {
      const assetId = uuidv4();
      db.createAsset(assetId, batchId, file.originalname, file.filename);
      return {
        id: assetId,
        filename: file.originalname,
        filepath: file.filename
      };
    });

    res.json({
      batchId,
      assets,
      reviewUrl: `/review/${batchId}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get batch with all assets
router.get('/batches/:id', (req, res) => {
  try {
    const batch = db.getBatch(req.params.id);
    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' });
    }

    const assets = db.getAssetsByBatch(req.params.id);
    res.json({ ...batch, assets });
  } catch (error) {
    console.error('Get batch error:', error);
    res.status(500).json({ error: 'Failed to get batch' });
  }
});

// Get single asset with comments
router.get('/assets/:id', (req, res) => {
  try {
    const asset = db.getAsset(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    const comments = db.getCommentsByAsset(req.params.id);
    res.json({ ...asset, comments });
  } catch (error) {
    console.error('Get asset error:', error);
    res.status(500).json({ error: 'Failed to get asset' });
  }
});

// Update asset status (approve/reject)
router.post('/assets/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const asset = db.getAsset(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    db.updateAssetStatus(req.params.id, status);
    res.json({ success: true, status });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Add comment to asset
router.post('/assets/:id/comments', (req, res) => {
  try {
    const { author, content } = req.body;
    if (!author || !content) {
      return res.status(400).json({ error: 'Author and content are required' });
    }

    const asset = db.getAsset(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    const comment = db.createComment(req.params.id, author, content);
    res.json(comment);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Create a share link (store data server-side)
router.post('/shares', (req, res) => {
  try {
    const { slug, data } = req.body;
    if (!slug || !data) {
      return res.status(400).json({ error: 'slug and data are required' });
    }
    db.createShare(slug, JSON.stringify(data));
    res.json({ slug });
  } catch (error) {
    console.error('Create share error:', error);
    res.status(500).json({ error: 'Failed to create share' });
  }
});

// Get share data
router.get('/shares/:slug', (req, res) => {
  try {
    const share = db.getShare(req.params.slug);
    if (!share) {
      return res.status(404).json({ error: 'Share not found' });
    }
    res.json({ data: JSON.parse(share.data) });
  } catch (error) {
    console.error('Get share error:', error);
    res.status(500).json({ error: 'Failed to get share' });
  }
});

// Upload a video file
router.post('/upload-video', (req, res) => {
  videoUpload.single('video')(req, res, (err) => {
    if (err) {
      console.error('Video upload multer error:', err.message, err.code || '');
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No video file in request' });
    }
    console.log('Video uploaded:', req.file.filename, req.file.size, 'bytes');
    res.json({ url: `/uploads/${req.file.filename}` });
  });
});

// Upload a single image file (for cover images)
router.post('/upload-image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }
    res.json({ url: `/uploads/${req.file.filename}` });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// Update asset status on a share
router.patch('/shares/:slug/status', (req, res) => {
  try {
    const { assetId, status } = req.body;
    if (!assetId || !status) {
      return res.status(400).json({ error: 'assetId and status are required' });
    }
    if (!['approved', 'needs-revision', 'pending'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const share = db.getShare(req.params.slug);
    if (!share) {
      return res.status(404).json({ error: 'Share not found' });
    }

    const data = JSON.parse(share.data);
    const allAssets = [...(data.videos || []), ...(data.images || [])];
    const asset = allAssets.find(a => a.id === assetId);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found in share' });
    }

    asset.status = status;
    db.createShare(req.params.slug, JSON.stringify(data));
    res.json({ data });
  } catch (error) {
    console.error('Update share status error:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Generate caption using Claude Vision
router.post('/generate-caption', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    // Parse data URL: "data:<mediaType>;base64,<data>"
    const match = image.match(/^data:(.+?);base64,(.+)$/);
    if (!match) {
      return res.status(400).json({ error: 'Invalid image data URL' });
    }

    const mediaType = match[1];
    const base64Data = match[2];

    const client = new Anthropic();
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system: 'You are a social media expert. Generate an engaging Instagram caption for this image. Include relevant emojis and 3-5 hashtags. Keep it under 200 characters before hashtags.',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64Data,
              },
            },
            {
              type: 'text',
              text: 'Generate an Instagram caption for this image.',
            },
          ],
        },
      ],
    });

    const caption = response.content[0].text;
    res.json({ caption });
  } catch (error) {
    console.error('Caption generation error:', error.status, error.message, error.error || '');
    res.status(500).json({ error: 'Failed to generate caption' });
  }
});

module.exports = router;
