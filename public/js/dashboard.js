// Default mock campaigns
const defaultCampaigns = {
  'Target campaign': {
    hasContent: true,
    members: [
      { id: 'm1', name: 'Sarah Chen', role: 'creator', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
      { id: 'm2', name: 'Mike Johnson', role: 'brand', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
      { id: 'm3', name: 'Emily Davis', role: 'brand', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
    ],
    images: [
      { id: 1, filename: 'target_hero_banner.jpg', status: 'approved', thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=400&fit=crop' },
      { id: 2, filename: 'product_shot_01.jpg', status: 'pending', thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&h=400&fit=crop' },
      { id: 3, filename: 'lifestyle_image.jpg', status: 'approved', thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=400&fit=crop' },
    ],
    videos: [
      { id: 4, filename: 'Target_Promo_30s.mp4', status: 'pending', duration: '00:30', thumbnail: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&h=400&fit=crop' },
    ]
  },
  'Replica': {
    hasContent: true,
    members: [
      { id: 'm4', name: 'Jessica Lee', role: 'creator', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face' },
      { id: 'm5', name: 'David Kim', role: 'brand', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
      { id: 'm6', name: 'Amanda Roberts', role: 'brand', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face' },
    ],
    images: [
      { id: 5, filename: '1st_IG_story_frame.jpg', status: 'approved', thumbnail: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=400&fit=crop' },
      { id: 6, filename: '2nd_IG_story_frame.jpg', status: 'approved', thumbnail: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=400&fit=crop' },
      { id: 7, filename: '3rd_IG_story_frame.jpg', status: 'approved', thumbnail: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop' },
      { id: 8, filename: 'IG_Reel_Cover.jpg', status: 'approved', thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop' },
    ],
    videos: [
      { id: 9, filename: 'Replica_Summer_Glow_IG.mp4', status: 'approved', duration: '00:32', thumbnail: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=400&fit=crop' },
    ]
  },
  'Niluu summer campaign': {
    hasContent: true,
    members: [
      { id: 'm7', name: 'Nina Patel', role: 'creator', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face' },
      { id: 'm8', name: 'Tom Wilson', role: 'brand', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
      { id: 'm9', name: 'Rachel Green', role: 'brand', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face' },
    ],
    images: [
      { id: 10, filename: 'beach_photoshoot_01.jpg', status: 'approved', thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=400&fit=crop' },
      { id: 11, filename: 'summer_vibes.jpg', status: 'rejected', thumbnail: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=300&h=400&fit=crop' },
      { id: 12, filename: 'poolside_content.jpg', status: 'approved', thumbnail: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=300&h=400&fit=crop' },
      { id: 13, filename: 'sunset_shot.jpg', status: 'pending', thumbnail: 'https://images.unsplash.com/photo-1476673160081-cf065bc4cf51?w=300&h=400&fit=crop' },
      { id: 14, filename: 'niluu_product.jpg', status: 'approved', thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=400&fit=crop' },
    ],
    videos: [
      { id: 15, filename: 'Niluu_Summer_Reel.mp4', status: 'approved', duration: '00:45', thumbnail: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=300&h=400&fit=crop' },
      { id: 16, filename: 'BTS_Photoshoot.mp4', status: 'pending', duration: '01:12', thumbnail: 'https://images.unsplash.com/photo-1504681869696-d977211a5f4c?w=300&h=400&fit=crop' },
    ]
  }
};

// Load campaigns from localStorage or use defaults
let campaigns = loadCampaigns();
let currentCampaign = localStorage.getItem('olive_currentCampaign') || 'Replica';
let assetIdCounter = parseInt(localStorage.getItem('olive_assetIdCounter')) || 100;

// Migrate old avatar URLs to new real photos
migrateAvatarUrls();

function migrateAvatarUrls() {
  const oldAvatarPattern = /api\.dicebear\.com/;
  const newAvatarUrl = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face';
  let needsSave = false;

  Object.values(campaigns).forEach(campaign => {
    [...(campaign.images || []), ...(campaign.videos || [])].forEach(asset => {
      if (asset.comments) {
        asset.comments.forEach(comment => {
          if (comment.avatar && oldAvatarPattern.test(comment.avatar)) {
            comment.avatar = newAvatarUrl;
            needsSave = true;
          }
        });
      }
    });
  });

  if (needsSave) {
    localStorage.setItem('olive_campaigns', JSON.stringify(campaigns));
  }
}

function loadCampaigns() {
  const saved = localStorage.getItem('olive_campaigns');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading campaigns:', e);
      return JSON.parse(JSON.stringify(defaultCampaigns));
    }
  }
  return JSON.parse(JSON.stringify(defaultCampaigns));
}

function saveCampaigns() {
  try {
    localStorage.setItem('olive_campaigns', JSON.stringify(campaigns));
    localStorage.setItem('olive_currentCampaign', currentCampaign);
    localStorage.setItem('olive_assetIdCounter', assetIdCounter.toString());
  } catch (e) {
    console.error('Error saving campaigns:', e);
    // If localStorage is full, try to continue without saving
    if (e.name === 'QuotaExceededError') {
      alert('Storage is full. Some data may not be saved.');
    }
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function renderSidebarCampaigns() {
  const campaignsList = document.querySelector('.campaigns-list');
  if (!campaignsList) return;

  campaignsList.innerHTML = '';

  Object.keys(campaigns).forEach(name => {
    const wrapper = document.createElement('div');
    wrapper.className = 'campaign-item-wrapper';
    if (name === currentCampaign) {
      wrapper.classList.add('active');
    }
    wrapper.innerHTML = `
      <svg class="folder-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.66634 4.66667L7.92265 3.17928C7.70861 2.7512 7.60158 2.53715 7.44192 2.38078C7.30073 2.24249 7.13056 2.13732 6.94372 2.07287C6.73245 2 6.49315 2 6.01453 2H3.46634C2.7196 2 2.34624 2 2.06102 2.14532C1.81014 2.27316 1.60616 2.47713 1.47833 2.72801C1.33301 3.01323 1.33301 3.3866 1.33301 4.13333V4.66667M1.33301 4.66667H11.4663C12.5864 4.66667 13.1465 4.66667 13.5743 4.88465C13.9506 5.0764 14.2566 5.38236 14.4484 5.75869C14.6663 6.18651 14.6663 6.74656 14.6663 7.86667V10.8C14.6663 11.9201 14.6663 12.4802 14.4484 12.908C14.2566 13.2843 13.9506 13.5903 13.5743 13.782C13.1465 14 12.5864 14 11.4663 14H4.53301C3.4129 14 2.85285 14 2.42503 13.782C2.0487 13.5903 1.74274 13.2843 1.55099 12.908C1.33301 12.4802 1.33301 11.9201 1.33301 10.8V4.66667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <a href="#" class="campaign-item${name === currentCampaign ? ' active' : ''}">${escapeHtml(name)}</a>
      <div class="campaign-menu-container">
        <button class="campaign-menu-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2"></circle>
            <circle cx="12" cy="12" r="2"></circle>
            <circle cx="12" cy="19" r="2"></circle>
          </svg>
        </button>
        <div class="campaign-dropdown">
          <button class="rename-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 12L13.3332 12.7294C12.9796 13.1161 12.5001 13.3333 12.0001 13.3333C11.5001 13.3333 11.0205 13.1161 10.6669 12.7294C10.3128 12.3434 9.83332 12.1267 9.33345 12.1267C8.83359 12.1267 8.35409 12.3434 7.99998 12.7294M2 13.3333H3.11636C3.44248 13.3333 3.60554 13.3333 3.75899 13.2965C3.89504 13.2638 4.0251 13.21 4.1444 13.1368C4.27895 13.0544 4.39425 12.9391 4.62486 12.7085L13 4.33333C13.5523 3.78104 13.5523 2.88561 13 2.33333C12.4477 1.78104 11.5523 1.78104 11 2.33333L2.62484 10.7085C2.39424 10.9391 2.27894 11.0544 2.19648 11.1889C2.12338 11.3082 2.0695 11.4383 2.03684 11.5744C2 11.7278 2 11.8909 2 12.217V13.3333Z" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Rename
          </button>
          <div class="dropdown-divider"></div>
          <button class="delete-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.6667 3.99999V3.46666C10.6667 2.71992 10.6667 2.34656 10.5213 2.06134C10.3935 1.81046 10.1895 1.60648 9.93865 1.47865C9.65344 1.33333 9.28007 1.33333 8.53333 1.33333H7.46667C6.71993 1.33333 6.34656 1.33333 6.06135 1.47865C5.81046 1.60648 5.60649 1.81046 5.47866 2.06134C5.33333 2.34656 5.33333 2.71992 5.33333 3.46666V3.99999M6.66667 7.66666V11M9.33333 7.66666V11M2 3.99999H14M12.6667 3.99999V11.4667C12.6667 12.5868 12.6667 13.1468 12.4487 13.5746C12.2569 13.951 11.951 14.2569 11.5746 14.4487C11.1468 14.6667 10.5868 14.6667 9.46667 14.6667H6.53333C5.41323 14.6667 4.85318 14.6667 4.42535 14.4487C4.04903 14.2569 3.74307 13.951 3.55132 13.5746C3.33333 13.1468 3.33333 12.5868 3.33333 11.4667V3.99999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Delete
          </button>
        </div>
      </div>
    `;
    campaignsList.appendChild(wrapper);
  });
}

function createAssetCard(asset, isVideo = false) {
  const statusClass = asset.status === 'pending' ? 'pending' : asset.status === 'rejected' ? 'rejected' : '';
  const statusText = asset.status.charAt(0).toUpperCase() + asset.status.slice(1);

  let thumbnailHTML = `
    <div class="asset-thumbnail">
      <img src="${asset.thumbnail}" alt="${asset.filename}">
    </div>
  `;

  if (isVideo) {
    thumbnailHTML = `
      <div class="asset-thumbnail video-thumbnail">
        <img src="${asset.thumbnail}" alt="${asset.filename}">
        <div class="play-overlay">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </div>
        <div class="video-duration">${asset.duration}</div>
      </div>
    `;
  }

  return `
    <div class="asset-card" data-id="${asset.id}">
      <input type="checkbox" class="asset-checkbox">
      ${thumbnailHTML}
      <div class="asset-card-info">
        <div class="status-dropdown ${statusClass}">
          <span class="status-dot"></span>
          <span class="status-text">${statusText}</span>
          <svg class="status-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  `;
}

function renderAssets() {
  const imagesGrid = document.getElementById('imagesGrid');
  const videosGrid = document.getElementById('videosGrid');
  const campaign = campaigns[currentCampaign];

  if (!campaign) return;

  const images = campaign.images || [];
  const videos = campaign.videos || [];

  if (imagesGrid) {
    if (images.length > 0) {
      imagesGrid.innerHTML = images.map(img => createAssetCard(img)).join('');
      imagesGrid.parentElement.style.display = 'block';
    } else {
      imagesGrid.innerHTML = '';
      imagesGrid.parentElement.style.display = 'none';
    }
  }

  if (videosGrid) {
    if (videos.length > 0) {
      videosGrid.innerHTML = videos.map(vid => createAssetCard(vid, true)).join('');
      videosGrid.parentElement.style.display = 'block';
    } else {
      videosGrid.innerHTML = '';
      videosGrid.parentElement.style.display = 'none';
    }
  }
}

// Dashboard functions
function showDashboard() {
  const dashboardHome = document.getElementById('dashboardHome');
  const campaignView = document.getElementById('campaignView');
  const homeLink = document.getElementById('homeLink');

  dashboardHome.style.display = 'flex';
  campaignView.style.display = 'none';

  // Remove active state from all campaigns and wrappers
  document.querySelectorAll('.campaign-item').forEach(item => {
    item.classList.remove('active');
  });
  document.querySelectorAll('.campaign-item-wrapper').forEach(wrapper => {
    wrapper.classList.remove('active');
  });

  // Add active state to Home link
  if (homeLink) {
    homeLink.classList.add('active');
  }

  // Update dashboard data
  updateDashboardStats();
  renderPendingAssets();
  renderRecentComments();
}

function updateDashboardStats() {
  let totalAssets = 0;
  let pendingCount = 0;
  let totalComments = 0;
  const campaignCount = Object.keys(campaigns).length;

  Object.values(campaigns).forEach(campaign => {
    const allAssets = [...(campaign.images || []), ...(campaign.videos || [])];
    totalAssets += allAssets.length;

    allAssets.forEach(asset => {
      if (asset.status === 'pending') pendingCount++;
      if (asset.comments) totalComments += asset.comments.length;
    });
  });

  document.getElementById('statPending').textContent = pendingCount;
  document.getElementById('statAssets').textContent = totalAssets;
  document.getElementById('statComments').textContent = totalComments;
  document.getElementById('statCampaigns').textContent = campaignCount;
}

function renderPendingAssets() {
  const grid = document.getElementById('pendingAssetsGrid');
  const emptyPending = document.getElementById('emptyPending');
  const pendingCount = document.getElementById('pendingCount');

  const pendingAssets = [];

  Object.entries(campaigns).forEach(([campaignName, campaign]) => {
    const allAssets = [...(campaign.images || []), ...(campaign.videos || [])];
    allAssets.forEach(asset => {
      if (asset.status === 'pending') {
        pendingAssets.push({ ...asset, campaignName });
      }
    });
  });

  pendingCount.textContent = `${pendingAssets.length} item${pendingAssets.length !== 1 ? 's' : ''}`;

  // Clear existing cards (but keep empty state)
  grid.querySelectorAll('.pending-asset-card').forEach(card => card.remove());

  if (pendingAssets.length === 0) {
    emptyPending.style.display = 'block';
  } else {
    emptyPending.style.display = 'none';

    pendingAssets.forEach(asset => {
      const card = document.createElement('div');
      card.className = 'pending-asset-card';
      card.dataset.assetId = asset.id;
      card.dataset.campaignName = asset.campaignName;
      card.innerHTML = `
        <img src="${asset.thumbnail}" alt="${asset.filename}" class="pending-asset-thumb">
        <div class="pending-asset-info">
          <div class="pending-asset-name">${escapeHtml(asset.filename)}</div>
          <div class="pending-asset-campaign">${escapeHtml(asset.campaignName)}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        switchCampaign(asset.campaignName);
        // Small delay to let campaign load, then open asset detail
        setTimeout(() => {
          const isVideo = asset.filename.match(/\.(mp4|webm|mov)$/i);
          openAssetDetail(asset.id, isVideo);
        }, 100);
      });

      grid.appendChild(card);
    });
  }
}

function renderRecentComments() {
  const list = document.getElementById('recentCommentsList');
  const emptyComments = document.getElementById('emptyComments');
  const commentsCount = document.getElementById('commentsCount');

  const allComments = [];

  Object.entries(campaigns).forEach(([campaignName, campaign]) => {
    const allAssets = [...(campaign.images || []), ...(campaign.videos || [])];
    allAssets.forEach(asset => {
      if (asset.comments) {
        asset.comments.forEach(comment => {
          allComments.push({
            ...comment,
            assetId: asset.id,
            assetName: asset.filename,
            campaignName
          });
        });
      }
    });
  });

  // Sort by time (most recent first) - assumes time is relative like "2m ago"
  // For simplicity, just show the last 5 comments
  const recentComments = allComments.slice(-5).reverse();

  commentsCount.textContent = `${allComments.length} comment${allComments.length !== 1 ? 's' : ''}`;

  // Clear existing items (but keep empty state)
  list.querySelectorAll('.recent-comment-item').forEach(item => item.remove());

  if (recentComments.length === 0) {
    emptyComments.style.display = 'block';
  } else {
    emptyComments.style.display = 'none';

    recentComments.forEach(comment => {
      const item = document.createElement('div');
      item.className = 'recent-comment-item';
      item.innerHTML = `
        <img src="${comment.avatar}" alt="${comment.author}" class="recent-comment-avatar">
        <div class="recent-comment-content">
          <div class="recent-comment-header">
            <span class="recent-comment-author">${escapeHtml(comment.author)}</span>
            <span class="recent-comment-time">${comment.time}</span>
          </div>
          <div class="recent-comment-text">${formatCommentWithMentions(comment.text, comment.campaignName)}</div>
          <div class="recent-comment-asset">${escapeHtml(comment.campaignName)} / ${escapeHtml(comment.assetName)}</div>
        </div>
      `;

      item.addEventListener('click', () => {
        switchCampaign(comment.campaignName);
        setTimeout(() => {
          const campaign = campaigns[comment.campaignName];
          const asset = [...(campaign.images || []), ...(campaign.videos || [])].find(a => a.id === comment.assetId);
          if (asset) {
            const isVideo = asset.filename.match(/\.(mp4|webm|mov)$/i);
            openAssetDetail(comment.assetId, isVideo);
          }
        }, 100);
      });

      list.appendChild(item);
    });
  }
}

function switchCampaign(name) {
  currentCampaign = name;
  localStorage.setItem('olive_currentCampaign', currentCampaign);

  // Hide dashboard, show campaign view
  const dashboardHome = document.getElementById('dashboardHome');
  const campaignView = document.getElementById('campaignView');
  const homeLink = document.getElementById('homeLink');

  dashboardHome.style.display = 'none';
  campaignView.style.display = 'flex';

  // Remove active state from Home link
  if (homeLink) {
    homeLink.classList.remove('active');
  }

  // Update active state in sidebar
  document.querySelectorAll('.campaign-item-wrapper').forEach(wrapper => {
    wrapper.classList.remove('active');
    const item = wrapper.querySelector('.campaign-item');
    if (item) {
      item.classList.remove('active');
      if (item.textContent === name) {
        item.classList.add('active');
        wrapper.classList.add('active');
      }
    }
  });

  // Update title
  document.querySelector('.campaign-title').textContent = name;

  // Show/hide content based on campaign
  const emptyState = document.getElementById('emptyState');
  const assetsView = document.getElementById('assetsView');
  const briefLink = document.querySelector('.brief-link');

  if (campaigns[name] && campaigns[name].hasContent) {
    emptyState.style.display = 'none';
    assetsView.style.display = 'block';
    if (briefLink) briefLink.style.display = 'inline-flex';
    renderAssets();
  } else {
    emptyState.style.display = 'flex';
    assetsView.style.display = 'none';
    if (briefLink) briefLink.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderSidebarCampaigns();
  renderAssets();
  initCampaignMenus();
  initCampaignSwitching();
  initCreateCampaignModal();
  initShareModal();
  initEmptyStateUpload();
  initAddMoreUpload();
  initGlobalDragDrop();
  initAssetDetailView();
  initAssetCardClicks();

  // Initialize with current campaign (make sure it exists)
  if (!campaigns[currentCampaign]) {
    const firstCampaign = Object.keys(campaigns)[0];
    if (firstCampaign) {
      currentCampaign = firstCampaign;
    }
  }

  // Show dashboard on load
  showDashboard();

  // Make sidebar logo clickable to return to dashboard
  const sidebarLogo = document.querySelector('.sidebar-logo');
  if (sidebarLogo) {
    sidebarLogo.style.cursor = 'pointer';
    sidebarLogo.addEventListener('click', () => {
      showDashboard();
    });
  }

  // Make Home link clickable to return to dashboard
  const homeLink = document.getElementById('homeLink');
  if (homeLink) {
    homeLink.addEventListener('click', (e) => {
      e.preventDefault();
      showDashboard();
    });
  }

  // Initialize campaigns toggle
  const campaignsToggle = document.getElementById('campaignsToggle');
  const campaignsList = document.getElementById('campaignsList');
  if (campaignsToggle && campaignsList) {
    campaignsToggle.addEventListener('click', () => {
      campaignsToggle.classList.toggle('collapsed');
      campaignsList.classList.toggle('collapsed');
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.campaign-dropdown').forEach(d => {
      d.classList.remove('show');
    });
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.remove('dropdown-open');
    }
  });
});

function initCampaignSwitching() {
  document.querySelectorAll('.campaign-item-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', (e) => {
      // Don't switch campaign if clicking on menu button or dropdown
      if (e.target.closest('.campaign-menu-container')) {
        return;
      }
      e.preventDefault();
      const campaignName = wrapper.querySelector('.campaign-item').textContent;
      switchCampaign(campaignName);
    });
  });
}

function initCampaignMenus() {
  const menuButtons = document.querySelectorAll('.campaign-menu-btn');

  menuButtons.forEach(btn => {
    // Remove old listeners by cloning
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      const container = newBtn.closest('.campaign-menu-container');
      const dropdown = container.querySelector('.campaign-dropdown');

      // Close all other dropdowns
      document.querySelectorAll('.campaign-dropdown').forEach(d => {
        if (d !== dropdown) {
          d.classList.remove('show');
        }
      });

      // Toggle this dropdown
      dropdown.classList.toggle('show');

      // Add/remove class to sidebar when dropdown is open
      const sidebar = document.querySelector('.sidebar');
      if (dropdown.classList.contains('show')) {
        sidebar.classList.add('dropdown-open');
      } else {
        sidebar.classList.remove('dropdown-open');
      }
    });
  });

  // Rename buttons
  const renameButtons = document.querySelectorAll('.rename-btn');
  renameButtons.forEach(btn => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const wrapper = newBtn.closest('.campaign-item-wrapper');
      const campaignName = wrapper.querySelector('.campaign-item').textContent;
      const sidebar = document.querySelector('.sidebar');

      // Close dropdown
      newBtn.closest('.campaign-dropdown').classList.remove('show');
      sidebar.classList.remove('dropdown-open');

      // Prompt for new name
      const newName = prompt('Enter new campaign name:', campaignName);
      if (newName && newName.trim() && newName.trim() !== campaignName) {
        const trimmedName = newName.trim();

        // Check if name already exists
        if (campaigns[trimmedName]) {
          alert('A campaign with this name already exists.');
          return;
        }

        // Rename the campaign
        campaigns[trimmedName] = campaigns[campaignName];
        delete campaigns[campaignName];
        saveCampaigns();

        // Update current campaign if it was renamed
        if (currentCampaign === campaignName) {
          currentCampaign = trimmedName;
          localStorage.setItem('olive_currentCampaign', currentCampaign);
        }

        // Re-render sidebar
        renderSidebarCampaigns();
        initCampaignMenus();
        initCampaignSwitching();

        // Update title if current campaign was renamed
        if (currentCampaign === trimmedName) {
          document.querySelector('.campaign-title').textContent = trimmedName;
        }

        // Re-apply active state
        switchCampaign(currentCampaign);
      }
    });
  });

  // Delete buttons
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(btn => {
    // Remove old listeners by cloning
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const wrapper = newBtn.closest('.campaign-item-wrapper');
      const campaignName = wrapper.querySelector('.campaign-item').textContent;
      const sidebar = document.querySelector('.sidebar');

      // Close dropdown
      newBtn.closest('.campaign-dropdown').classList.remove('show');
      sidebar.classList.remove('dropdown-open');

      if (confirm(`Are you sure you want to delete "${campaignName}"?`)) {
        delete campaigns[campaignName];
        saveCampaigns();

        // Re-render sidebar
        renderSidebarCampaigns();
        initCampaignMenus();
        initCampaignSwitching();

        // If deleted current campaign, switch to first available
        if (campaignName === currentCampaign) {
          const firstCampaign = Object.keys(campaigns)[0];
          if (firstCampaign) {
            switchCampaign(firstCampaign);
          }
        }
      }
    });
  });

  // Re-init campaign switching for new items
  initCampaignSwitching();
}

function initCreateCampaignModal() {
  const modal = document.getElementById('createCampaignModal');
  const addBtn = document.querySelector('.add-campaign-btn');
  const closeBtn = document.getElementById('closeModal');
  const createBtn = document.getElementById('createCampaignBtn');
  const campaignNameInput = document.getElementById('campaignName');
  const uploadArea = document.getElementById('briefUploadArea');
  const fileInput = document.getElementById('briefFileInput');
  const filenameDisplay = document.getElementById('briefFilename');

  let selectedFile = null;

  // Open modal
  addBtn.addEventListener('click', () => {
    modal.classList.add('show');
    campaignNameInput.focus();
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    closeModal();
  });

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  // Create on Enter key
  campaignNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      createBtn.click();
    }
  });

  // File upload area click
  uploadArea.addEventListener('click', () => {
    fileInput.click();
  });

  // File input change
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      selectedFile = e.target.files[0];
      filenameDisplay.textContent = selectedFile.name;
    }
  });

  // Drag and drop
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      selectedFile = e.dataTransfer.files[0];
      filenameDisplay.textContent = selectedFile.name;
    }
  });

  // Create campaign
  createBtn.addEventListener('click', () => {
    const name = campaignNameInput.value.trim();
    if (!name) {
      campaignNameInput.focus();
      return;
    }

    // Add to campaigns store
    campaigns[name] = { hasContent: false, members: [], images: [], videos: [] };
    saveCampaigns();

    // Re-render sidebar and reinitialize
    renderSidebarCampaigns();
    initCampaignMenus();
    initCampaignSwitching();

    // Switch to the new campaign
    switchCampaign(name);

    closeModal();
  });

  function closeModal() {
    modal.classList.remove('show');
    campaignNameInput.value = '';
    document.getElementById('campaignPeople').value = '';
    filenameDisplay.textContent = '';
    selectedFile = null;
    fileInput.value = '';
  }
}

function initEmptyStateUpload() {
  const uploadArea = document.getElementById('emptyUploadArea');
  const fileInput = document.getElementById('emptyFileInput');
  const browseBtn = document.getElementById('browseBtn');

  // Browse button click
  browseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });

  // Upload area click
  uploadArea.addEventListener('click', () => {
    fileInput.click();
  });

  // File input change
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFilesUpload(e.target.files);
    }
  });

  // Drag and drop
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      handleFilesUpload(e.dataTransfer.files);
    }
  });
}

function initAddMoreUpload() {
  const addArea = document.getElementById('addAssetsArea');
  const uploadBox = addArea ? addArea.querySelector('.upload-content-box') : null;
  const fileInput = document.getElementById('addMoreFileInput');

  if (!addArea || !fileInput || !uploadBox) return;

  // Click to browse (only on the button)
  uploadBox.addEventListener('click', () => {
    fileInput.click();
  });

  // File input change
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFilesUpload(e.target.files);
      fileInput.value = '';
    }
  });

  // Drag and drop on the add area
  addArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    addArea.classList.add('dragover');
  });

  addArea.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    addArea.classList.remove('dragover');
  });

  addArea.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    addArea.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      handleFilesUpload(e.dataTransfer.files);
    }
  });
}

function initGlobalDragDrop() {
  const dropOverlay = document.getElementById('dropOverlay');
  let dragCounter = 0;

  // Show overlay when dragging files over the window
  document.addEventListener('dragenter', (e) => {
    e.preventDefault();
    dragCounter++;
    if (e.dataTransfer.types.includes('Files')) {
      dropOverlay.classList.add('show');
    }
  });

  document.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dragCounter--;
    if (dragCounter === 0) {
      dropOverlay.classList.remove('show');
    }
  });

  document.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  document.addEventListener('drop', (e) => {
    e.preventDefault();
    dragCounter = 0;
    dropOverlay.classList.remove('show');

    if (e.dataTransfer.files.length > 0) {
      handleFilesUpload(e.dataTransfer.files);
    }
  });
}

async function handleFilesUpload(files) {
  const campaign = campaigns[currentCampaign];

  if (!campaign) return;

  // Initialize arrays if they don't exist
  if (!campaign.images) campaign.images = [];
  if (!campaign.videos) campaign.videos = [];

  // Process each file
  for (const file of Array.from(files)) {
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    if (isImage || isVideo) {
      try {
        // Convert to base64 for persistence
        const thumbnail = await fileToBase64(file);

        const asset = {
          id: assetIdCounter++,
          filename: file.name,
          status: 'pending',
          thumbnail: thumbnail
        };

        if (isVideo) {
          asset.duration = '00:00';
          campaign.videos.push(asset);
        } else {
          campaign.images.push(asset);
        }
      } catch (e) {
        console.error('Error processing file:', file.name, e);
      }
    }
  }

  // Mark campaign as having content
  campaign.hasContent = true;

  // Save to localStorage
  saveCampaigns();

  // Switch to show the assets view with new content
  switchCampaign(currentCampaign);
}

function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Asset Detail View Functionality
let currentAsset = null;
let pendingPin = null;

let commentsVisible = true;
let allAssets = [];
let currentAssetIndex = 0;

function initAssetDetailView() {
  const overlay = document.getElementById('assetDetailOverlay');
  const backBtn = document.getElementById('backToAssets');
  const imageContainer = document.getElementById('detailImageContainer');
  const toggleCommentsBtn = document.getElementById('toggleCommentsBtn');
  const navPrev = document.getElementById('navPrev');
  const navNext = document.getElementById('navNext');
  const detailLogo = document.querySelector('.detail-logo');
  const themeToggle = document.getElementById('themeToggle');
  const imageArea = document.querySelector('.detail-image-area');

  // Theme toggle functionality
  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      const btn = e.target.closest('.theme-btn');
      if (!btn) return;

      const theme = btn.dataset.theme;
      const allBtns = themeToggle.querySelectorAll('.theme-btn');

      allBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update slider position
      themeToggle.classList.remove('light-active', 'dark-active');
      themeToggle.classList.add(theme + '-active');

      if (theme === 'light') {
        imageArea.classList.add('light-mode');
      } else {
        imageArea.classList.remove('light-mode');
      }
    });
  }

  // Close detail view
  backBtn.addEventListener('click', closeAssetDetail);

  // Logo click goes to home dashboard
  if (detailLogo) {
    detailLogo.style.cursor = 'pointer';
    detailLogo.addEventListener('click', () => {
      closeAssetDetail();
      showDashboard();
    });
  }

  // Click on image to add comment pin
  imageContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      handleImageClick(e);
    }
  });

  // Toggle comments visibility
  toggleCommentsBtn.addEventListener('click', () => {
    commentsVisible = !commentsVisible;
    toggleCommentsVisibility();
  });

  // Navigation buttons
  navPrev.addEventListener('click', () => navigateAsset(-1));
  navNext.addEventListener('click', () => navigateAsset(1));

  // Close on Escape, navigate with arrow keys
  document.addEventListener('keydown', (e) => {
    if (overlay.classList.contains('show')) {
      // Don't navigate if user is typing in an input or textarea
      const isTyping = document.activeElement.tagName === 'INPUT' ||
                       document.activeElement.tagName === 'TEXTAREA';

      if (e.key === 'Escape' && !isTyping) {
        closeAssetDetail();
      } else if (e.key === 'ArrowLeft' && !isTyping) {
        navigateAsset(-1);
      } else if (e.key === 'ArrowRight' && !isTyping) {
        navigateAsset(1);
      }
    }
  });

  // Close comment dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.comment-menu-btn')) {
      document.querySelectorAll('.comment-dropdown.show').forEach(d => {
        d.classList.remove('show');
      });
    }
  });

  // Filename editing functionality
  const detailFilename = document.getElementById('detailFilename');
  const detailFilenameInput = document.getElementById('detailFilenameInput');
  const saveFilenameBtn = document.getElementById('saveFilenameBtn');
  const filenameWrapper = document.querySelector('.detail-filename-wrapper');
  const breadcrumbWrapper = document.querySelector('.detail-breadcrumb-wrapper');

  function enterEditMode() {
    filenameWrapper.classList.add('editing');
    breadcrumbWrapper.classList.add('editing');
    detailFilenameInput.value = detailFilename.textContent;
    detailFilenameInput.focus();
    detailFilenameInput.select();
  }

  function exitEditMode() {
    filenameWrapper.classList.remove('editing');
    breadcrumbWrapper.classList.remove('editing');
  }

  function saveFilename() {
    const newFilename = detailFilenameInput.value.trim();
    if (newFilename && newFilename !== detailFilename.textContent) {
      detailFilename.textContent = newFilename;
      // Update the asset in the data
      if (currentAsset) {
        currentAsset.filename = newFilename;
        // Update in campaigns data
        const campaign = campaigns[currentCampaign];
        if (campaign) {
          const assetList = currentAsset.isVideo ? campaign.videos : campaign.images;
          const asset = assetList.find(a => a.id === currentAsset.id);
          if (asset) {
            asset.filename = newFilename;
          }
        }
      }
    }
    exitEditMode();
  }

  // Click filename to edit
  detailFilename.addEventListener('click', enterEditMode);

  // Save button click
  saveFilenameBtn.addEventListener('click', saveFilename);

  // Enter to save, Escape to cancel
  detailFilenameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveFilename();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      exitEditMode();
    }
    e.stopPropagation(); // Prevent overlay keyboard shortcuts
  });

  // Click outside to cancel edit
  document.addEventListener('click', (e) => {
    if (filenameWrapper.classList.contains('editing')) {
      if (!e.target.closest('.detail-filename-wrapper') && !e.target.closest('.save-filename-btn')) {
        exitEditMode();
      }
    }
  });

  // Sidebar comment input functionality
  const sidebarTextarea = document.getElementById('sidebarCommentTextarea');
  const sidebarSubmitBtn = document.getElementById('sidebarCommentSubmit');
  const sidebarMentionDropdown = document.getElementById('sidebarMentionDropdown');

  if (sidebarTextarea && sidebarSubmitBtn) {
    // Initialize mention dropdown for sidebar
    initSidebarMentionDropdown(sidebarTextarea, sidebarMentionDropdown);

    // Auto-resize textarea as user types
    sidebarTextarea.addEventListener('input', () => {
      autoResizeTextarea(sidebarTextarea);
    });

    // Handle submit button click
    sidebarSubmitBtn.addEventListener('click', () => {
      submitSidebarComment(sidebarTextarea);
    });

    // Handle Enter to submit (but not if mention dropdown is open)
    sidebarTextarea.addEventListener('keydown', (e) => {
      const isMentionOpen = sidebarMentionDropdown && sidebarMentionDropdown.classList.contains('show');

      if (e.key === 'Enter' && !e.shiftKey && !isMentionOpen) {
        e.preventDefault();
        submitSidebarComment(sidebarTextarea);
      }
    });
  }
}

function submitSidebarComment(textarea) {
  const text = textarea.value.trim();
  if (text && currentAsset) {
    addCommentWithoutPin(text);
    textarea.value = '';
    // Reset textarea height
    textarea.style.height = 'auto';
    textarea.style.overflowY = 'hidden';
  }
}

function autoResizeTextarea(textarea) {
  const maxHeight = 90; // 5 lines × 18px line-height

  // Reset height to auto to get the correct scrollHeight
  textarea.style.height = 'auto';

  // Set the height based on content
  if (textarea.scrollHeight > maxHeight) {
    textarea.style.height = maxHeight + 'px';
    textarea.style.overflowY = 'auto';
  } else {
    textarea.style.height = textarea.scrollHeight + 'px';
    textarea.style.overflowY = 'hidden';
  }
}

function initSidebarMentionDropdown(textarea, dropdown) {
  if (!dropdown) return;

  let sidebarMentionState = {
    isActive: false,
    startPosition: 0,
    searchText: '',
    selectedIndex: 0
  };

  // Listen for input to detect @ mentions
  textarea.addEventListener('input', () => {
    const text = textarea.value;
    const cursorPos = textarea.selectionStart;

    // Find the @ symbol before cursor
    let atPos = -1;
    for (let i = cursorPos - 1; i >= 0; i--) {
      if (text[i] === '@') {
        atPos = i;
        break;
      }
      if (text[i] === ' ' || text[i] === '\n') {
        break;
      }
    }

    if (atPos !== -1) {
      const searchText = text.substring(atPos + 1, cursorPos).toLowerCase();
      sidebarMentionState.isActive = true;
      sidebarMentionState.startPosition = atPos;
      sidebarMentionState.searchText = searchText;
      sidebarMentionState.selectedIndex = 0;

      const members = getCampaignMembers();
      const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchText)
      );

      if (filteredMembers.length > 0) {
        renderSidebarMentionDropdown(dropdown, filteredMembers, sidebarMentionState, textarea);
        dropdown.classList.add('show');
      } else {
        closeSidebarMentionDropdown(dropdown, sidebarMentionState);
      }
    } else {
      closeSidebarMentionDropdown(dropdown, sidebarMentionState);
    }
  });

  // Handle keyboard navigation in dropdown
  textarea.addEventListener('keydown', (e) => {
    if (!sidebarMentionState.isActive) return;

    const items = dropdown.querySelectorAll('.mention-item');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      sidebarMentionState.selectedIndex = Math.min(sidebarMentionState.selectedIndex + 1, items.length - 1);
      updateSidebarMentionSelection(dropdown, sidebarMentionState);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      sidebarMentionState.selectedIndex = Math.max(sidebarMentionState.selectedIndex - 1, 0);
      updateSidebarMentionSelection(dropdown, sidebarMentionState);
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      if (sidebarMentionState.isActive) {
        e.preventDefault();
        const selectedItem = items[sidebarMentionState.selectedIndex];
        if (selectedItem) {
          insertSidebarMention(textarea, selectedItem.dataset.name, sidebarMentionState, dropdown);
        }
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeSidebarMentionDropdown(dropdown, sidebarMentionState);
    }
  });
}

function renderSidebarMentionDropdown(dropdown, members, state, textarea) {
  dropdown.innerHTML = members.map((member, index) => `
    <div class="mention-item${index === state.selectedIndex ? ' selected' : ''}"
         data-name="${escapeHtml(member.name)}"
         data-id="${member.id}">
      <img src="${member.avatar}" alt="${escapeHtml(member.name)}" class="mention-item-avatar">
      <div class="mention-item-info">
        <span class="mention-item-name">${escapeHtml(member.name)}</span>
        <span class="mention-item-role">${member.role}</span>
      </div>
    </div>
  `).join('');

  // Add click handlers
  dropdown.querySelectorAll('.mention-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      insertSidebarMention(textarea, item.dataset.name, state, dropdown);
    });
  });
}

function updateSidebarMentionSelection(dropdown, state) {
  const items = dropdown.querySelectorAll('.mention-item');
  items.forEach((item, index) => {
    item.classList.toggle('selected', index === state.selectedIndex);
  });
}

function insertSidebarMention(textarea, name, state, dropdown) {
  const text = textarea.value;
  const beforeMention = text.substring(0, state.startPosition);
  const afterMention = text.substring(textarea.selectionStart);

  const mentionText = `@${name} `;
  textarea.value = beforeMention + mentionText + afterMention;

  // Set cursor position after the mention
  const newCursorPos = state.startPosition + mentionText.length;
  textarea.setSelectionRange(newCursorPos, newCursorPos);
  textarea.focus();

  closeSidebarMentionDropdown(dropdown, state);
}

function closeSidebarMentionDropdown(dropdown, state) {
  if (dropdown) {
    dropdown.classList.remove('show');
    dropdown.innerHTML = '';
  }
  state.isActive = false;
  state.searchText = '';
  state.selectedIndex = 0;
}

function buildAssetsList() {
  const campaign = campaigns[currentCampaign];
  if (!campaign) return [];

  const images = (campaign.images || []).map(img => ({ ...img, isVideo: false }));
  const videos = (campaign.videos || []).map(vid => ({ ...vid, isVideo: true }));

  return [...images, ...videos];
}

function navigateAsset(direction) {
  const newIndex = currentAssetIndex + direction;

  if (newIndex < 0 || newIndex >= allAssets.length) return;

  currentAssetIndex = newIndex;
  const asset = allAssets[currentAssetIndex];

  loadAssetIntoDetail(asset);
  updateNavButtons();
}

function loadAssetIntoDetail(asset) {
  currentAsset = { ...asset, campaignName: currentCampaign };

  const detailImage = document.getElementById('detailImage');
  const detailFilename = document.getElementById('detailFilename');
  const detailCampaignName = document.getElementById('detailCampaignName');
  const detailStatus = document.getElementById('detailStatus');

  // Update UI
  detailImage.src = asset.thumbnail;
  detailImage.alt = asset.filename;
  detailFilename.textContent = asset.filename;
  detailCampaignName.textContent = currentCampaign;

  // Update status
  detailStatus.textContent = asset.status.charAt(0).toUpperCase() + asset.status.slice(1);
  detailStatus.className = 'status-badge';
  if (asset.status === 'pending') detailStatus.classList.add('pending');
  if (asset.status === 'rejected') detailStatus.classList.add('rejected');

  // Reset pin visibility
  commentsVisible = true;
  const eyeIcon = document.querySelector('.toggle-comments-btn .eye-icon');
  const eyeOffIcon = document.querySelector('.toggle-comments-btn .eye-off-icon');
  if (eyeIcon) eyeIcon.style.display = 'block';
  if (eyeOffIcon) eyeOffIcon.style.display = 'none';

  // Render comments
  renderCommentPins();
  renderCommentsList();
}

function updateNavButtons() {
  const navPrev = document.getElementById('navPrev');
  const navNext = document.getElementById('navNext');

  navPrev.disabled = currentAssetIndex === 0;
  navNext.disabled = currentAssetIndex === allAssets.length - 1;
}

function toggleCommentsVisibility() {
  const eyeIcon = document.querySelector('.toggle-comments-btn .eye-icon');
  const eyeOffIcon = document.querySelector('.toggle-comments-btn .eye-off-icon');
  const commentPins = document.querySelectorAll('.comment-pin:not(.pending-pin)');

  if (commentsVisible) {
    eyeIcon.style.display = 'block';
    eyeOffIcon.style.display = 'none';
    commentPins.forEach(pin => pin.style.display = 'flex');
  } else {
    eyeIcon.style.display = 'none';
    eyeOffIcon.style.display = 'block';
    commentPins.forEach(pin => pin.style.display = 'none');
  }
}

function openAssetDetail(assetId, isVideo = false) {
  const campaign = campaigns[currentCampaign];
  if (!campaign) return;

  // Build the assets list for navigation
  allAssets = buildAssetsList();

  // Find the index of the clicked asset
  currentAssetIndex = allAssets.findIndex(a => a.id === assetId);
  if (currentAssetIndex === -1) return;

  const asset = allAssets[currentAssetIndex];

  // Initialize comments array if not exists
  const originalAsset = isVideo
    ? campaign.videos.find(a => a.id === assetId)
    : campaign.images.find(a => a.id === assetId);
  if (originalAsset && !originalAsset.comments) {
    originalAsset.comments = [];
  }

  // Load the asset
  loadAssetIntoDetail(asset);
  updateNavButtons();

  // Show overlay
  const overlay = document.getElementById('assetDetailOverlay');
  overlay.classList.add('show');
}

function closeAssetDetail() {
  const overlay = document.getElementById('assetDetailOverlay');
  overlay.classList.remove('show');

  // Clean up any pending pin input
  removeFloatingInput();
  pendingPin = null;
  currentAsset = null;
}

function handleImageClick(e) {
  const img = e.target;
  const rect = img.getBoundingClientRect();

  // Calculate position as percentage
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  // Remove any existing floating input
  removeFloatingInput();

  // Create floating input at click position
  createFloatingInput(x, y, e.clientX - rect.left, e.clientY - rect.top);
}

function createFloatingInput(percentX, percentY, pixelX, pixelY) {
  const container = document.getElementById('detailImageContainer');
  const img = document.getElementById('detailImage');

  // Store pending pin position
  pendingPin = { x: percentX, y: percentY };

  // Create pin marker
  const pinNumber = getNextCommentNumber();
  const pin = document.createElement('div');
  pin.className = 'comment-pin pending-pin';
  pin.textContent = pinNumber;
  pin.style.left = percentX + '%';
  pin.style.top = percentY + '%';
  container.appendChild(pin);

  // Create floating input
  const floatingInput = document.createElement('div');
  floatingInput.className = 'floating-comment-input show';
  floatingInput.id = 'floatingCommentInput';

  // Position the input (adjust for screen bounds)
  const imgRect = img.getBoundingClientRect();
  let inputLeft = pixelX + 20;
  let inputTop = pixelY;

  // Adjust if too close to right edge
  if (inputLeft + 320 > imgRect.width) {
    inputLeft = pixelX - 340;
  }

  floatingInput.style.left = inputLeft + 'px';
  floatingInput.style.top = inputTop + 'px';

  floatingInput.innerHTML = `
    <div class="mention-dropdown" id="mentionDropdown"></div>
    <textarea placeholder="Add a comment (@ to mention)" id="floatingTextarea"></textarea>
    <button class="floating-comment-submit" id="floatingSubmit">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    </button>
  `;

  container.appendChild(floatingInput);

  // Focus textarea
  const textarea = document.getElementById('floatingTextarea');
  textarea.focus();

  // Initialize mention functionality
  initMentionDropdown(textarea);

  // Handle submit
  const submitBtn = document.getElementById('floatingSubmit');
  submitBtn.addEventListener('click', () => {
    const text = textarea.value.trim();
    if (text && pendingPin) {
      addCommentWithPin(text, pendingPin.x, pendingPin.y);
    }
  });

  // Handle Enter to submit (but not if mention dropdown is open)
  textarea.addEventListener('keydown', (e) => {
    const mentionDropdown = document.getElementById('mentionDropdown');
    const isMentionOpen = mentionDropdown && mentionDropdown.classList.contains('show');

    if (e.key === 'Enter' && !e.shiftKey && !isMentionOpen) {
      e.preventDefault();
      const text = textarea.value.trim();
      if (text && pendingPin) {
        addCommentWithPin(text, pendingPin.x, pendingPin.y);
      }
    }
    if (e.key === 'Escape' && !isMentionOpen) {
      removeFloatingInput();
      pendingPin = null;
    }
  });

  // Click outside to close
  setTimeout(() => {
    document.addEventListener('click', handleOutsideClick);
  }, 100);
}

function handleOutsideClick(e) {
  const floatingInput = document.getElementById('floatingCommentInput');
  if (floatingInput && !floatingInput.contains(e.target) && !e.target.classList.contains('pending-pin')) {
    removeFloatingInput();
    pendingPin = null;
    document.removeEventListener('click', handleOutsideClick);
  }
}

function removeFloatingInput() {
  const floatingInput = document.getElementById('floatingCommentInput');
  if (floatingInput) {
    floatingInput.remove();
  }

  // Remove pending pin
  const pendingPinEl = document.querySelector('.pending-pin');
  if (pendingPinEl) {
    pendingPinEl.remove();
  }

  document.removeEventListener('click', handleOutsideClick);
}

function getNextCommentNumber() {
  if (!currentAsset) return 1;
  const campaign = campaigns[currentAsset.campaignName];
  const assets = currentAsset.isVideo ? campaign.videos : campaign.images;
  const asset = assets.find(a => a.id === currentAsset.id);
  return (asset.comments?.length || 0) + 1;
}

function addCommentWithPin(text, x, y) {
  if (!currentAsset) return;

  const campaign = campaigns[currentAsset.campaignName];
  const assets = currentAsset.isVideo ? campaign.videos : campaign.images;
  const asset = assets.find(a => a.id === currentAsset.id);

  if (!asset.comments) {
    asset.comments = [];
  }

  const comment = {
    id: Date.now(),
    author: 'Elisamar',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    text: text,
    time: formatTime(new Date()),
    pinX: x,
    pinY: y,
    number: asset.comments.length + 1
  };

  asset.comments.push(comment);
  saveCampaigns();

  // Clean up and re-render
  removeFloatingInput();
  pendingPin = null;
  renderCommentPins();
  renderCommentsList();
}

function addCommentWithoutPin(text) {
  if (!currentAsset) return;

  const campaign = campaigns[currentAsset.campaignName];
  const assets = currentAsset.isVideo ? campaign.videos : campaign.images;
  const asset = assets.find(a => a.id === currentAsset.id);

  if (!asset.comments) {
    asset.comments = [];
  }

  const comment = {
    id: Date.now(),
    author: 'Elisamar',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    text: text,
    time: formatTime(new Date()),
    pinX: null,
    pinY: null,
    number: asset.comments.length + 1
  };

  asset.comments.push(comment);
  saveCampaigns();

  renderCommentsList();
}

function renderCommentPins() {
  const container = document.getElementById('detailImageContainer');

  // Remove existing pins (except pending)
  container.querySelectorAll('.comment-pin:not(.pending-pin)').forEach(pin => pin.remove());

  if (!currentAsset) return;

  const campaign = campaigns[currentAsset.campaignName];
  const assets = currentAsset.isVideo ? campaign.videos : campaign.images;
  const asset = assets.find(a => a.id === currentAsset.id);

  if (!asset.comments) return;

  asset.comments.forEach((comment, index) => {
    if (comment.pinX !== null && comment.pinY !== null) {
      const pin = document.createElement('div');
      pin.className = 'comment-pin';
      pin.dataset.commentId = comment.id;
      pin.textContent = comment.number || index + 1;
      pin.style.left = comment.pinX + '%';
      pin.style.top = comment.pinY + '%';

      // Hover to dim others
      pin.addEventListener('mouseenter', () => {
        dimOtherComments(comment.id);
      });

      pin.addEventListener('mouseleave', () => {
        clearDimming();
      });

      // Drag functionality
      makePinDraggable(pin, comment.id);

      container.appendChild(pin);
    }
  });
}

function makePinDraggable(pin, commentId) {
  let isDragging = false;
  let hasMoved = false;
  let startX, startY;

  pin.addEventListener('mousedown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging = true;
    hasMoved = false;
    startX = e.clientX;
    startY = e.clientY;
    pin.classList.add('dragging');

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e) {
    if (!isDragging) return;

    const dx = Math.abs(e.clientX - startX);
    const dy = Math.abs(e.clientY - startY);

    // Only consider it a drag if moved more than 3px
    if (dx > 3 || dy > 3) {
      hasMoved = true;
    }

    const img = document.getElementById('detailImage');
    const rect = img.getBoundingClientRect();

    // Calculate new position as percentage
    let newX = ((e.clientX - rect.left) / rect.width) * 100;
    let newY = ((e.clientY - rect.top) / rect.height) * 100;

    // Clamp to image bounds
    newX = Math.max(0, Math.min(100, newX));
    newY = Math.max(0, Math.min(100, newY));

    pin.style.left = newX + '%';
    pin.style.top = newY + '%';
  }

  function onMouseUp(e) {
    if (!isDragging) return;
    isDragging = false;
    pin.classList.remove('dragging');

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    // If actually moved, update the comment position
    if (hasMoved) {
      const img = document.getElementById('detailImage');
      const rect = img.getBoundingClientRect();

      let newX = ((e.clientX - rect.left) / rect.width) * 100;
      let newY = ((e.clientY - rect.top) / rect.height) * 100;

      // Clamp to image bounds
      newX = Math.max(0, Math.min(100, newX));
      newY = Math.max(0, Math.min(100, newY));

      updateCommentPinPosition(commentId, newX, newY);
    }
  }
}

function updateCommentPinPosition(commentId, newX, newY) {
  if (!currentAsset) return;

  const campaign = campaigns[currentAsset.campaignName];
  const assets = currentAsset.isVideo ? campaign.videos : campaign.images;
  const asset = assets.find(a => a.id === currentAsset.id);

  if (!asset.comments) return;

  const comment = asset.comments.find(c => c.id === commentId);
  if (comment) {
    comment.pinX = newX;
    comment.pinY = newY;
    saveCampaigns();
  }
}

function renderCommentsList() {
  const list = document.getElementById('commentsList');
  list.innerHTML = '';

  if (!currentAsset) return;

  const campaign = campaigns[currentAsset.campaignName];
  const assets = currentAsset.isVideo ? campaign.videos : campaign.images;
  const asset = assets.find(a => a.id === currentAsset.id);

  if (!asset.comments || asset.comments.length === 0) {
    list.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No comments yet. Click on the image to add a comment.</p>';
    return;
  }

  asset.comments.forEach((comment, index) => {
    const item = document.createElement('div');
    item.className = 'comment-item';
    item.dataset.commentId = comment.id;

    item.innerHTML = `
      <div class="comment-header">
        <div class="comment-avatar">
          <img src="${comment.avatar}" alt="${comment.author}">
        </div>
        <span class="comment-author">${escapeHtml(comment.author)}</span>
        <span class="comment-time">${comment.time}</span>
        <button class="comment-menu-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.99984 8.66659C8.36803 8.66659 8.6665 8.36811 8.6665 7.99992C8.6665 7.63173 8.36803 7.33325 7.99984 7.33325C7.63165 7.33325 7.33317 7.63173 7.33317 7.99992C7.33317 8.36811 7.63165 8.66659 7.99984 8.66659Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.6665 8.66659C13.0347 8.66659 13.3332 8.36811 13.3332 7.99992C13.3332 7.63173 13.0347 7.33325 12.6665 7.33325C12.2983 7.33325 11.9998 7.63173 11.9998 7.99992C11.9998 8.36811 12.2983 8.66659 12.6665 8.66659Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.33317 8.66659C3.70136 8.66659 3.99984 8.36811 3.99984 7.99992C3.99984 7.63173 3.70136 7.33325 3.33317 7.33325C2.96498 7.33325 2.6665 7.63173 2.6665 7.99992C2.6665 8.36811 2.96498 8.66659 3.33317 8.66659Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="comment-dropdown">
          <button class="comment-edit-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Edit
          </button>
          <button class="comment-delete-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            Delete
          </button>
        </div>
        ${comment.number ? `<div class="comment-number">${comment.number}</div>` : ''}
      </div>
      <p class="comment-text">${formatCommentWithMentions(comment.text)}</p>
    `;

    // Menu button click
    const menuBtn = item.querySelector('.comment-menu-btn');
    const dropdown = item.querySelector('.comment-dropdown');

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close other dropdowns
      document.querySelectorAll('.comment-dropdown.show').forEach(d => {
        if (d !== dropdown) d.classList.remove('show');
      });
      dropdown.classList.toggle('show');
    });

    // Edit button
    item.querySelector('.comment-edit-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.remove('show');
      editComment(comment.id);
    });

    // Delete button
    item.querySelector('.comment-delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.remove('show');
      deleteComment(comment.id);
    });

    // Hover to dim others
    item.addEventListener('mouseenter', () => {
      dimOtherComments(comment.id);
    });

    item.addEventListener('mouseleave', () => {
      clearDimming();
    });

    list.appendChild(item);
  });
}

function dimOtherComments(activeCommentId) {
  // Dim all pins except the active one
  document.querySelectorAll('.comment-pin:not(.pending-pin)').forEach(pin => {
    if (pin.dataset.commentId == activeCommentId) {
      pin.classList.add('highlighted');
      pin.classList.remove('dimmed');
    } else {
      pin.classList.add('dimmed');
      pin.classList.remove('highlighted');
    }
  });

  // Dim all comment items except the active one
  document.querySelectorAll('.comment-item').forEach(item => {
    if (item.dataset.commentId == activeCommentId) {
      item.classList.add('highlighted');
      item.classList.remove('dimmed');
    } else {
      item.classList.add('dimmed');
      item.classList.remove('highlighted');
    }
  });
}

function clearDimming() {
  document.querySelectorAll('.comment-pin').forEach(pin => {
    pin.classList.remove('dimmed', 'highlighted');
  });

  document.querySelectorAll('.comment-item').forEach(item => {
    item.classList.remove('dimmed', 'highlighted');
  });
}

function editComment(commentId) {
  if (!currentAsset) return;

  const campaign = campaigns[currentAsset.campaignName];
  const assets = currentAsset.isVideo ? campaign.videos : campaign.images;
  const asset = assets.find(a => a.id === currentAsset.id);

  if (!asset.comments) return;

  const comment = asset.comments.find(c => c.id === commentId);
  if (!comment) return;

  const newText = prompt('Edit comment:', comment.text);
  if (newText !== null && newText.trim()) {
    comment.text = newText.trim();
    saveCampaigns();
    renderCommentsList();
  }
}

function deleteComment(commentId) {
  if (!currentAsset) return;

  const campaign = campaigns[currentAsset.campaignName];
  const assets = currentAsset.isVideo ? campaign.videos : campaign.images;
  const asset = assets.find(a => a.id === currentAsset.id);

  if (!asset.comments) return;

  if (confirm('Are you sure you want to delete this comment?')) {
    const index = asset.comments.findIndex(c => c.id === commentId);
    if (index !== -1) {
      asset.comments.splice(index, 1);

      // Renumber remaining comments
      asset.comments.forEach((c, i) => {
        if (c.number !== null) {
          c.number = i + 1;
        }
      });

      saveCampaigns();
      renderCommentPins();
      renderCommentsList();
    }
  }
}

function highlightComment(commentId) {
  // Remove active from all comments
  document.querySelectorAll('.comment-item').forEach(item => {
    item.classList.remove('active');
  });

  // Add active to clicked comment
  const commentItem = document.querySelector(`.comment-item[data-comment-id="${commentId}"]`);
  if (commentItem) {
    commentItem.classList.add('active');
    commentItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Also highlight the pin
  document.querySelectorAll('.comment-pin').forEach(pin => {
    pin.classList.remove('active');
  });
  const pin = document.querySelector(`.comment-pin[data-comment-id="${commentId}"]`);
  if (pin) {
    pin.classList.add('active');
  }
}

function highlightPin(commentId) {
  // Remove active from all pins
  document.querySelectorAll('.comment-pin').forEach(pin => {
    pin.classList.remove('active');
  });

  // Add active to the pin
  const pin = document.querySelector(`.comment-pin[data-comment-id="${commentId}"]`);
  if (pin) {
    pin.classList.add('active');
  }

  // Also highlight the comment
  document.querySelectorAll('.comment-item').forEach(item => {
    item.classList.remove('active');
  });
  const commentItem = document.querySelector(`.comment-item[data-comment-id="${commentId}"]`);
  if (commentItem) {
    commentItem.classList.add('active');
  }
}

function formatTime(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutesStr}${ampm}`;
}

function initAssetCardClicks() {
  // Use event delegation for asset cards
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.asset-card');
    if (card && !e.target.closest('.asset-checkbox')) {
      const assetId = parseInt(card.dataset.id);
      const isVideo = card.querySelector('.video-thumbnail') !== null;
      openAssetDetail(assetId, isVideo);
    }
  });
}

// ============================================
// Mention Functionality
// ============================================

let mentionState = {
  isActive: false,
  startPosition: 0,
  searchText: '',
  selectedIndex: 0
};

function getCampaignMembers() {
  const campaign = campaigns[currentCampaign];
  return campaign?.members || [];
}

function initMentionDropdown(textarea) {
  const dropdown = document.getElementById('mentionDropdown');
  if (!dropdown) return;

  // Listen for input to detect @ mentions
  textarea.addEventListener('input', (e) => {
    handleMentionInput(textarea, dropdown);
  });

  // Handle keyboard navigation in dropdown
  textarea.addEventListener('keydown', (e) => {
    if (!mentionState.isActive) return;

    const items = dropdown.querySelectorAll('.mention-item');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      mentionState.selectedIndex = Math.min(mentionState.selectedIndex + 1, items.length - 1);
      updateMentionSelection(dropdown);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      mentionState.selectedIndex = Math.max(mentionState.selectedIndex - 1, 0);
      updateMentionSelection(dropdown);
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      const selectedItem = items[mentionState.selectedIndex];
      if (selectedItem) {
        insertMention(textarea, selectedItem.dataset.name);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeMentionDropdown(dropdown);
    }
  });
}

function handleMentionInput(textarea, dropdown) {
  const text = textarea.value;
  const cursorPos = textarea.selectionStart;

  // Find the @ symbol before cursor
  let atPos = -1;
  for (let i = cursorPos - 1; i >= 0; i--) {
    if (text[i] === '@') {
      atPos = i;
      break;
    }
    // Stop if we hit a space or newline before finding @
    if (text[i] === ' ' || text[i] === '\n') {
      break;
    }
  }

  if (atPos !== -1) {
    const searchText = text.substring(atPos + 1, cursorPos).toLowerCase();
    mentionState.isActive = true;
    mentionState.startPosition = atPos;
    mentionState.searchText = searchText;
    mentionState.selectedIndex = 0;

    const members = getCampaignMembers();
    const filteredMembers = members.filter(m =>
      m.name.toLowerCase().includes(searchText)
    );

    if (filteredMembers.length > 0) {
      renderMentionDropdown(dropdown, filteredMembers);
      dropdown.classList.add('show');
    } else {
      closeMentionDropdown(dropdown);
    }
  } else {
    closeMentionDropdown(dropdown);
  }
}

function renderMentionDropdown(dropdown, members) {
  dropdown.innerHTML = members.map((member, index) => `
    <div class="mention-item${index === mentionState.selectedIndex ? ' selected' : ''}"
         data-name="${escapeHtml(member.name)}"
         data-id="${member.id}">
      <img src="${member.avatar}" alt="${escapeHtml(member.name)}" class="mention-item-avatar">
      <div class="mention-item-info">
        <span class="mention-item-name">${escapeHtml(member.name)}</span>
        <span class="mention-item-role">${member.role}</span>
      </div>
    </div>
  `).join('');

  // Add click handlers
  dropdown.querySelectorAll('.mention-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const textarea = document.getElementById('floatingTextarea');
      insertMention(textarea, item.dataset.name);
    });
  });
}

function updateMentionSelection(dropdown) {
  const items = dropdown.querySelectorAll('.mention-item');
  items.forEach((item, index) => {
    item.classList.toggle('selected', index === mentionState.selectedIndex);
  });
}

function insertMention(textarea, name) {
  const text = textarea.value;
  const beforeMention = text.substring(0, mentionState.startPosition);
  const afterMention = text.substring(textarea.selectionStart);

  const mentionText = `@${name} `;
  textarea.value = beforeMention + mentionText + afterMention;

  // Set cursor position after the mention
  const newCursorPos = mentionState.startPosition + mentionText.length;
  textarea.setSelectionRange(newCursorPos, newCursorPos);
  textarea.focus();

  closeMentionDropdown(document.getElementById('mentionDropdown'));
}

function closeMentionDropdown(dropdown) {
  if (dropdown) {
    dropdown.classList.remove('show');
    dropdown.innerHTML = '';
  }
  mentionState.isActive = false;
  mentionState.searchText = '';
  mentionState.selectedIndex = 0;
}

function formatCommentWithMentions(text, campaignName = null) {
  // Replace @Name patterns with highlighted mentions
  const campaign = campaigns[campaignName || currentCampaign];
  const members = campaign?.members || [];
  let formattedText = escapeHtml(text);

  members.forEach(member => {
    const mentionPattern = new RegExp(`@${escapeRegExp(member.name)}`, 'gi');
    formattedText = formattedText.replace(mentionPattern, `<span class="mention">@${escapeHtml(member.name)}</span>`);
  });

  return formattedText;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ============================================
// Share Modal Functionality
// ============================================

function initShareModal() {
  const shareBtn = document.querySelector('.share-btn');
  const shareModal = document.getElementById('shareModal');
  const closeShareModalBtn = document.getElementById('closeShareModal');
  const shareEmailInput = document.getElementById('shareEmailInput');
  const inviteBtn = document.getElementById('inviteBtn');
  const shareLinkInput = document.getElementById('shareLinkInput');
  const copyLinkBtn = document.getElementById('copyLinkBtn');

  if (!shareBtn || !shareModal) return;

  // Open share modal
  shareBtn.addEventListener('click', () => {
    // Generate share link based on current campaign
    const shareLink = generateShareLink();
    shareLinkInput.value = shareLink;
    shareModal.classList.add('show');
    shareEmailInput.focus();
  });

  // Close modal
  closeShareModalBtn.addEventListener('click', () => {
    closeShareModal();
  });

  // Close on overlay click
  shareModal.addEventListener('click', (e) => {
    if (e.target === shareModal) {
      closeShareModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && shareModal.classList.contains('show')) {
      closeShareModal();
    }
  });

  // Invite button click
  inviteBtn.addEventListener('click', () => {
    const email = shareEmailInput.value.trim();
    if (email && isValidEmail(email)) {
      handleInvite(email);
    } else {
      shareEmailInput.focus();
      shareEmailInput.style.borderColor = '#dc2626';
      setTimeout(() => {
        shareEmailInput.style.borderColor = '';
      }, 2000);
    }
  });

  // Enter key on email input
  shareEmailInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inviteBtn.click();
    }
  });

  // Copy link button
  copyLinkBtn.addEventListener('click', () => {
    copyToClipboard(shareLinkInput.value);

    // Show copied feedback
    const originalHTML = copyLinkBtn.innerHTML;
    copyLinkBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Copied!</span>
    `;
    copyLinkBtn.classList.add('copied');

    setTimeout(() => {
      copyLinkBtn.innerHTML = originalHTML;
      copyLinkBtn.classList.remove('copied');
    }, 2000);
  });

  function closeShareModal() {
    shareModal.classList.remove('show');
    shareEmailInput.value = '';
    shareEmailInput.style.borderColor = '';
  }
}

function generateShareLink() {
  // Generate a shareable link for the current campaign
  const baseUrl = window.location.origin;
  const campaignSlug = currentCampaign.toLowerCase().replace(/\s+/g, '-');
  const shareId = btoa(currentCampaign).replace(/=/g, '');
  return `${baseUrl}/share/${campaignSlug}?id=${shareId}`;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function handleInvite(email) {
  // In a real app, this would send an API request to invite the user
  // For now, we'll show a success message
  alert(`Invitation sent to ${email}!`);

  // Clear the input
  const shareEmailInput = document.getElementById('shareEmailInput');
  shareEmailInput.value = '';
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}
