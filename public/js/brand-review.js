// Brand Review — Read-only campaign view

let campaignData = null;
let currentPreviewAsset = null;
let activeTab = 'reel';

// Timeline state
let _timelineState = { video: null, onTimeUpdate: null, isScrubbing: false };

// --- Init ---
document.addEventListener('DOMContentLoaded', async () => {
  campaignData = await loadCampaignData();
  if (!campaignData) {
    showEmpty();
    return;
  }
  renderCampaign();
  initTabSwitching();
  initStatusButtons();
  document.getElementById('previewBackBtn').addEventListener('click', showCards);
});

async function loadCampaignData() {
  // Extract slug from URL path: /share/<slug>
  const slug = window.location.pathname.split('/share/')[1];
  if (!slug) return null;

  try {
    const res = await fetch(`/api/shares/${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch (e) {
    console.error('Failed to load campaign data:', e);
    return null;
  }
}

function showEmpty() {
  document.getElementById('cardsView').style.display = 'none';
  document.getElementById('emptyState').style.display = 'flex';
}

// --- Render Cards ---
function renderCampaign() {
  const nameEl = document.getElementById('campaignName');
  nameEl.textContent = campaignData.name || 'Campaign';
  document.title = `Okent - ${campaignData.name || 'Brand Review'}`;

  const videos = campaignData.videos || [];
  const images = campaignData.images || [];

  if (videos.length === 0 && images.length === 0) {
    showEmpty();
    return;
  }

  const container = document.getElementById('contentCards');
  let html = '';

  videos.forEach(vid => {
    html += `
      <div class="brand-card" data-id="${vid.id}" data-type="video">
        <img class="brand-card-img" src="${escapeAttr(vid.thumbnail)}" alt="${escapeAttr(vid.filename)}">
        <div class="brand-card-overlay">
          <img src="/images/reel-reels-icon.svg" alt="Reel">
          <span>Reel</span>
        </div>
      </div>
    `;
  });

  images.forEach(img => {
    html += `
      <div class="brand-card" data-id="${img.id}" data-type="image">
        <img class="brand-card-img" src="${escapeAttr(img.thumbnail)}" alt="${escapeAttr(img.filename)}">
        <div class="brand-card-overlay">
          <img src="/images/reel-image.svg" alt="Cover">
          <span>Reel Cover Image</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Attach click handlers
  container.querySelectorAll('.brand-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      const type = card.dataset.type;
      openPreview(id, type);
    });
  });
}

// --- Preview ---
function openPreview(assetId, type) {
  const allAssets = [...(campaignData.videos || []), ...(campaignData.images || [])];
  const asset = allAssets.find(a => a.id === assetId);
  if (!asset) return;

  currentPreviewAsset = { ...asset, assetType: type };

  // Update header
  const typeIcon = document.getElementById('previewTypeIcon');
  const typeLabel = document.getElementById('previewTypeLabel');
  if (type === 'video') {
    typeIcon.src = '/images/reel-reels-icon.svg';
    typeLabel.textContent = 'Instagram Reel';
  } else {
    typeIcon.src = '/images/reel-image.svg';
    typeLabel.textContent = 'Cover Image';
  }

  // Set default tab based on asset type
  activeTab = type === 'video' ? 'reel' : 'cover';
  document.querySelectorAll('.reel-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === activeTab);
  });

  // Update sidebar info
  document.getElementById('sidebarFilename').textContent = asset.filename || '—';

  updateStatusUI(asset.status || 'pending');

  // Caption
  const captionText = campaignData.caption || '';
  document.getElementById('sidebarCaption').textContent = captionText || 'No caption provided';

  // Show preview view, hide cards
  document.getElementById('cardsView').style.display = 'none';
  document.getElementById('previewView').style.display = 'flex';

  // Render phone mockup
  updatePreviewPhone();
}

function showCards() {
  cleanupTimeline();
  document.getElementById('previewView').style.display = 'none';
  document.getElementById('cardsView').style.display = 'block';
  currentPreviewAsset = null;
}

function updatePreviewPhone() {
  const phoneContent = document.getElementById('previewPhoneContent');
  const phoneMockup = document.getElementById('previewPhoneMockup');
  const overlay = document.getElementById('previewReelOverlay');
  const timelineTrack = document.getElementById('previewTimelineTrack');
  const caption = document.getElementById('previewCaption');

  // Clean existing media
  const existingVideo = phoneContent.querySelector('.reel-phone-video');
  const existingCover = phoneContent.querySelector('.reel-phone-cover');
  if (existingVideo) existingVideo.remove();
  if (existingCover) existingCover.remove();
  cleanupTimeline();

  if (!currentPreviewAsset) return;

  // Find the paired video and image for this reel
  const videos = campaignData.videos || [];
  const images = campaignData.images || [];

  if (activeTab === 'reel') {
    // Show reel overlay
    overlay.style.display = 'flex';
    caption.textContent = campaignData.caption || '';

    // Try to find a video to display
    const vidAsset = currentPreviewAsset.assetType === 'video'
      ? currentPreviewAsset
      : videos[0]; // fallback to first video

    if (vidAsset && vidAsset.videoUrl) {
      // Play actual video
      phoneMockup.classList.add('has-content');
      const videoEl = document.createElement('video');
      videoEl.className = 'reel-phone-video';
      videoEl.src = vidAsset.videoUrl;
      videoEl.controls = false;
      videoEl.playsInline = true;
      videoEl.loop = true;
      videoEl.muted = true;
      videoEl.autoplay = true;
      phoneContent.insertBefore(videoEl, overlay);

      // Start playback explicitly (autoplay can be blocked)
      videoEl.play().catch(() => {});

      // Click to toggle play/pause
      videoEl.addEventListener('click', () => {
        if (videoEl.paused) videoEl.play();
        else videoEl.pause();
      });

      // Log video load errors for debugging
      videoEl.addEventListener('error', () => {
        console.error('Video failed to load:', vidAsset.videoUrl);
      });

      // Wire timeline to video progress
      if (timelineTrack) {
        timelineTrack.style.display = 'block';
        const progressBar = document.getElementById('previewTimelineProgress');

        const onTimeUpdate = () => {
          if (!_timelineState.isScrubbing && videoEl.duration) {
            progressBar.style.width = (videoEl.currentTime / videoEl.duration * 100) + '%';
          }
        };
        videoEl.addEventListener('timeupdate', onTimeUpdate);
        _timelineState.video = videoEl;
        _timelineState.onTimeUpdate = onTimeUpdate;

        // Scrubbing
        const onPointerDown = (e) => {
          _timelineState.isScrubbing = true;
          seekToPointer(e, timelineTrack, videoEl, progressBar);
        };
        const onPointerMove = (e) => {
          if (_timelineState.isScrubbing) seekToPointer(e, timelineTrack, videoEl, progressBar);
        };
        const onPointerUp = () => { _timelineState.isScrubbing = false; };

        timelineTrack.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
        _timelineState._onPointerDown = onPointerDown;
        _timelineState._onPointerMove = onPointerMove;
        _timelineState._onPointerUp = onPointerUp;
      }
    } else if (vidAsset && vidAsset.thumbnail) {
      // Fallback to static thumbnail
      phoneMockup.classList.add('has-content');
      const img = document.createElement('img');
      img.className = 'reel-phone-cover';
      img.src = vidAsset.thumbnail;
      img.alt = vidAsset.filename || 'Reel';
      phoneContent.insertBefore(img, overlay);

      if (timelineTrack) {
        timelineTrack.style.display = 'block';
        document.getElementById('previewTimelineProgress').style.width = '35%';
      }
    } else {
      phoneMockup.classList.remove('has-content');
      if (timelineTrack) timelineTrack.style.display = 'none';
    }
  } else if (activeTab === 'cover') {
    // Hide reel overlay for cover image
    overlay.style.display = 'none';
    if (timelineTrack) timelineTrack.style.display = 'none';

    // Find cover image
    const coverImg = currentPreviewAsset.assetType === 'image'
      ? currentPreviewAsset
      : images[0]; // fallback to first image

    if (coverImg && coverImg.thumbnail) {
      phoneMockup.classList.add('has-content');
      const img = document.createElement('img');
      img.className = 'reel-phone-cover';
      img.src = coverImg.thumbnail;
      img.alt = coverImg.filename || 'Cover Image';
      phoneContent.appendChild(img);
    } else {
      phoneMockup.classList.remove('has-content');
    }
  }
}

// --- Tab Switching ---
function initTabSwitching() {
  document.querySelectorAll('.reel-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.reel-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.dataset.tab;
      updatePreviewPhone();
    });
  });
}

// --- Timeline Cleanup ---
function cleanupTimeline() {
  if (_timelineState.video && _timelineState.onTimeUpdate) {
    _timelineState.video.removeEventListener('timeupdate', _timelineState.onTimeUpdate);
  }
  const track = document.getElementById('previewTimelineTrack');
  if (track && _timelineState._onPointerDown) {
    track.removeEventListener('pointerdown', _timelineState._onPointerDown);
  }
  document.removeEventListener('pointermove', _timelineState._onPointerMove);
  document.removeEventListener('pointerup', _timelineState._onPointerUp);
  _timelineState = { video: null, onTimeUpdate: null, isScrubbing: false };
}

// --- Timeline scrubbing helper ---
function seekToPointer(e, track, videoEl, progressBar) {
  const rect = track.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  if (videoEl.duration) {
    videoEl.currentTime = pct * videoEl.duration;
  }
  progressBar.style.width = (pct * 100) + '%';
}

// --- Status UI ---
function updateStatusUI(status) {
  const statusBadge = document.getElementById('sidebarStatus');
  const btnApprove = document.getElementById('btnApprove');
  const btnNeedsRevision = document.getElementById('btnNeedsRevision');

  // Map status to display
  const statusMap = {
    'approved': { text: 'Approved', className: 'approved' },
    'needs-revision': { text: 'Needs Revision', className: 'needs-revision' },
    'pending': { text: 'Pending', className: 'pending' },
    'rejected': { text: 'Rejected', className: 'rejected' }
  };
  const info = statusMap[status] || statusMap['pending'];

  statusBadge.querySelector('.status-text').textContent = info.text;
  statusBadge.className = 'preview-status-badge ' + info.className;

  // Highlight selected button
  if (btnApprove && btnNeedsRevision) {
    btnApprove.classList.toggle('active', status === 'approved');
    btnNeedsRevision.classList.toggle('active', status === 'needs-revision');
  }
}

function initStatusButtons() {
  const btnApprove = document.getElementById('btnApprove');
  const btnNeedsRevision = document.getElementById('btnNeedsRevision');

  if (btnApprove) {
    btnApprove.addEventListener('click', () => setAssetStatus('approved'));
  }
  if (btnNeedsRevision) {
    btnNeedsRevision.addEventListener('click', () => setAssetStatus('needs-revision'));
  }
}

async function setAssetStatus(status) {
  if (!currentPreviewAsset) return;

  const slug = window.location.pathname.split('/share/')[1];
  if (!slug) return;

  try {
    const res = await fetch(`/api/shares/${encodeURIComponent(slug)}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assetId: currentPreviewAsset.id, status })
    });

    if (res.ok) {
      const json = await res.json();
      campaignData = json.data;
      currentPreviewAsset.status = status;
      updateStatusUI(status);
    }
  } catch (err) {
    console.error('Failed to update status:', err);
  }
}

// --- Helpers ---
function escapeAttr(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
