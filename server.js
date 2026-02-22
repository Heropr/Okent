require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./db/database');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api', apiRoutes);

// Serve review page for any /review/:id route
app.get('/review/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'review.html'));
});

// Serve brand review page for share links
app.get('/share/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'brand-review.html'));
});

// Global error handler — catches multer and other middleware errors
app.use((err, req, res, next) => {
  console.error('Server error:', err.message, err.code || '');
  res.status(err.status || 500).json({ error: err.message });
});

// Initialize database and start server
db.initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`Upload images at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
