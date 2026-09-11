/**
 * ONE LOVE TATTOOS - Static / Client-Side Admin Dashboard Engine
 * Enables 100% full dashboard functionality directly on GitHub Pages!
 */

const DEFAULT_DEMO_PHOTOS = [
  {
    "title": "Hyper-Realistic Lion & Crown Sleeve",
    "description": "Full forearm black and grey piece featuring realistic fur texture, deep shadows, and imperial crown composition.",
    "image_url": "static/uploads/demo/tattoo_bg_lion.jpg",
    "artist_name": "Marcus 'Vex' Cole",
    "category": "Black & Grey",
    "tags": "Lion, Crown, Realism, Sleeve, Forearm",
    "is_featured": 1,
    "sort_order": 1,
    "id": 1
  },
  {
    "title": "Classic American Traditional Dagger & Heart",
    "description": "Bold American traditional clash piece with heavyweight outlines, rich crimson fills, and timeless flash aesthetic.",
    "image_url": "static/uploads/demo/tattoo_trad_dagger.jpg",
    "artist_name": "Elena 'Ink' Cruz",
    "category": "Traditional",
    "tags": "Dagger, Heart, Traditional, Color, Bold",
    "is_featured": 1,
    "sort_order": 2,
    "id": 2
  },
  {
    "title": "Micro Botanical Wildflower Wrap",
    "description": "Single-needle delicate floral bouquet with Texas bluebonnets, fern leaves, and micro-shading wrapping the wrist.",
    "image_url": "static/uploads/demo/tattoo_fineline_botanical.jpg",
    "artist_name": "Kai Soren",
    "category": "Fine Line",
    "tags": "Floral, Botanical, Wrist, Fine Line, Minimal",
    "is_featured": 1,
    "sort_order": 3,
    "id": 3
  },
  {
    "title": "Curated Ear Project - Titanium & Opal Rings",
    "description": "Triple helix piercing paired with daith ring in ASTM F-136 titanium and genuine synthetic opal clusters.",
    "image_url": "static/uploads/demo/piercing_ear_curation.jpg",
    "artist_name": "Samira Dawn",
    "category": "Piercings",
    "tags": "Helix, Daith, Piercing, Titanium, Ear Curation",
    "is_featured": 1,
    "sort_order": 4,
    "id": 4
  },
  {
    "title": "Japanese Irezumi Koi & Lotus Wave",
    "description": "Dynamic oriental scale work with wind bars, stormy waves, and vibrant lotus accents across forearm.",
    "image_url": "static/uploads/demo/tattoo_japanese_koi.jpg",
    "artist_name": "Elena 'Ink' Cruz",
    "category": "Japanese",
    "tags": "Koi, Lotus, Japanese, Irezumi, Sleeve",
    "is_featured": 1,
    "sort_order": 5,
    "id": 5
  },
  {
    "title": "Dark Chicano Skull & Hourglass Roses",
    "description": "Hand-rendered smooth gradients, high-contrast dark surrealism, and hyper-detailed bone texture.",
    "image_url": "static/uploads/demo/tattoo_bg_skull.jpg",
    "artist_name": "Marcus 'Vex' Cole",
    "category": "Black & Grey",
    "tags": "Skull, Roses, Black & Grey, Surrealism, Arm",
    "is_featured": 1,
    "sort_order": 6,
    "id": 6
  },
  {
    "title": "Geometric Dotwork Forearm Tattoo",
    "description": "Intricate stippling and sacred geometry concentric patterns wrapping the forearm and wrist.",
    "image_url": "static/uploads/demo/tattoo_bg_mandala.jpg",
    "artist_name": "Kai Soren",
    "category": "Fine Line",
    "tags": "Mandala, Dotwork, Sacred Geometry, Forearm",
    "is_featured": 1,
    "sort_order": 7,
    "id": 7
  },
  {
    "title": "Bold Sailor Jerry Style Eagle & Banner",
    "description": "Iconic traditional swooping bald eagle clutching banner with saturated red, gold, and green tones.",
    "image_url": "static/uploads/demo/tattoo_trad_eagle.jpg",
    "artist_name": "Elena 'Ink' Cruz",
    "category": "Traditional",
    "tags": "Eagle, Americana, Traditional, Color, Chest",
    "is_featured": 0,
    "sort_order": 8,
    "id": 8
  },
  {
    "title": "Cinematic Realism Eye & Pocketwatch",
    "description": "Dramatic chiaroscuro realism depicting reflective iris, tear highlight, and Roman numeral mechanical gear detail.",
    "image_url": "static/uploads/demo/tattoo_realism_eye.jpg",
    "artist_name": "Marcus 'Vex' Cole",
    "category": "Realism",
    "tags": "Eye, Clock, Realism, Black & Grey, Bicep",
    "is_featured": 1,
    "sort_order": 9,
    "id": 9
  },
  {
    "title": "Precision Solid Gold Septum Clicker",
    "description": "Flawless sweet-spot placement healed with a hand-polished 14-karat solid yellow gold clicker ring.",
    "image_url": "static/uploads/demo/piercing_septum_gold.jpg",
    "artist_name": "Samira Dawn",
    "category": "Piercings",
    "tags": "Septum, Gold, Nose, Piercing, Facial",
    "is_featured": 0,
    "sort_order": 10,
    "id": 10
  },
  {
    "title": "Double Nostril & Piercing Studs",
    "description": "Symmetrical nostril piercings styled with high-polish titanium bezel-set cubic zirconia studs.",
    "image_url": "static/uploads/demo/piercing_nostril_stud.jpg",
    "artist_name": "Samira Dawn",
    "category": "Piercings",
    "tags": "Nostril, Stud, Piercing, Titanium, Facial",
    "is_featured": 0,
    "sort_order": 11,
    "id": 11
  },
  {
    "title": "Delicate Minimalist Constellation & Moon",
    "description": "Micro single-needle celestial astronomy piece with crescent moon, orbit rings, and stippled star dust.",
    "image_url": "static/uploads/demo/tattoo_fineline_stars.jpg",
    "artist_name": "Kai Soren",
    "category": "Fine Line",
    "tags": "Moon, Stars, Celestial, Fine Line, Ankle",
    "is_featured": 0,
    "sort_order": 12,
    "id": 12
  },
  {
    "title": "Intricate Floral Mandala Arm Cuff",
    "description": "Precision symmetrical lotus mandala with delicate hanging bead accents wrapping around the arm.",
    "image_url": "static/uploads/demo/tattoo_bg_floral.jpg",
    "artist_name": "Kai Soren",
    "category": "Black & Grey",
    "tags": "Mandala, Floral, Cuff, Arm, Geometry",
    "is_featured": 0,
    "sort_order": 13,
    "id": 13
  },
  {
    "title": "One Love Georgetown Studio & Flash Wall",
    "description": "Our custom Georgetown shop station featuring framed flash art, sterile barriers, and welcoming atmosphere.",
    "image_url": "static/uploads/demo/studio_ink_workstation.jpg",
    "artist_name": "One Love Studio",
    "category": "Flash & Studio",
    "tags": "Studio, Georgetown, Shop, Station, Texas",
    "is_featured": 1,
    "sort_order": 14,
    "id": 14
  },
  {
    "title": "Custom Rotary Machine & Sterile Workstation",
    "description": "Hospital-grade sterile set-up with disposable grips, single-use needle cartridges, and premium organic inks.",
    "image_url": "static/uploads/demo/studio_rotary_machine.jpg",
    "artist_name": "One Love Studio",
    "category": "Flash & Studio",
    "tags": "Equipment, Sterile, Machine, Ink, Studio",
    "is_featured": 0,
    "sort_order": 15,
    "id": 15
  }
];

function resolveAssetUrl(url) {
  if (!url) return 'static/uploads/demo/tattoo_bg_lion.jpg';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  let clean = url.startsWith('/') ? url.slice(1) : url;
  if (window.location.pathname.includes('/admin/')) {
    return '../' + clean;
  }
  if (window.location.pathname.includes('/onelovetattoos/')) {
    return '/onelovetattoos/' + clean;
  }
  return clean;
}


const DEFAULT_ARTISTS = [
  {
    id: 1,
    name: "Marcus 'Vex' Cole",
    role: "Senior Resident Artist",
    specialties: "Black & Grey Realism • Dark Surrealism • Portraits",
    bio: "Over 12 years perfecting smooth gradients, high-contrast shadows, and cinematic skin realism.",
    avatar_url: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Elena 'Ink' Cruz",
    role: "Resident Tattooer",
    specialties: "American Traditional • Bold Color • Neo-Traditional",
    bio: "Specializes in saturated colors, crisp bold lines, and timeless flash with a modern edge.",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Kai Soren",
    role: "Resident Tattooer",
    specialties: "Fine Line • Micro-Realism • Botanical • Geometry",
    bio: "Known for single-needle precision, delicate floral cuffs, and minimalist illustrative work.",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Samira Dawn",
    role: "Master Piercer & Body Stylist",
    specialties: "Advanced Body Piercing • Ear Curation • Solid Gold & Titanium",
    bio: "Certified with Texas Dept of Health and APP standards. Exclusively uses sterile single-use blades.",
    avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
  }
];

const DEFAULT_INQUIRIES = [
  {
    id: 101,
    client_name: "Travis Hernandez",
    client_email: "travis.h@example.com",
    client_phone: "(512) 555-0192",
    preferred_artist: "Marcus 'Vex' Cole",
    tattoo_style: "Black & Grey",
    placement: "Right Forearm",
    estimated_size: "Medium (4x6 in)",
    budget: "$400 - $600",
    description: "Looking for a realism piece with an hourglass surrounded by smoke and broken Roman numerals.",
    reference_image_url: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?auto=format&fit=crop&w=600&q=80",
    status: "New",
    created_at: new Date().toISOString()
  },
  {
    id: 102,
    client_name: "Maya Reynolds",
    client_email: "maya.reynolds@example.com",
    client_phone: "(512) 555-8834",
    preferred_artist: "Kai Soren",
    tattoo_style: "Fine Line",
    placement: "Ribcage / Ribs",
    estimated_size: "Small (2x3 in)",
    budget: "$200 - $300",
    description: "Delicate fine line hummingbird feeding from a Texas bluebonnet stem.",
    reference_image_url: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=600&q=80",
    status: "Contacted",
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

let adminPhotos = [];
let adminInquiries = [];
let adminArtists = [];

document.addEventListener('DOMContentLoaded', async () => {
  checkAuth();
  await loadInitialData();
  initTabs();
  initPhotoManagement();
  initInquiryManagement();
  initArtistManagement();
  initSettingsManagement();
  refreshStats();
});

// ==========================================
// Authentication
// ==========================================
function checkAuth() {
  const isAuth = sessionStorage.getItem('onelove_admin_logged_in') === 'true';
  const loginView = document.getElementById('adminLoginView');
  const dashView = document.getElementById('adminDashboardView');

  if (isAuth) {
    if (loginView) loginView.style.display = 'none';
    if (dashView) dashView.style.display = 'flex';
  } else {
    if (loginView) loginView.style.display = 'flex';
    if (dashView) dashView.style.display = 'none';
  }

  const loginForm = document.getElementById('adminLoginForm');
  if (loginForm) {
    loginForm.onsubmit = (e) => {
      e.preventDefault();
      const user = document.getElementById('loginUsername').value.trim();
      const pass = document.getElementById('loginPassword').value;
      const errBox = document.getElementById('loginError');

      if (user.toLowerCase() === 'admin' && pass === 'onelove2026') {
        sessionStorage.setItem('onelove_admin_logged_in', 'true');
        checkAuth();
      } else {
        if (errBox) {
          errBox.textContent = 'Invalid username or password. Default is admin / onelove2026';
          errBox.style.display = 'block';
        }
      }
    };
  }
}

window.adminLogout = function() {
  sessionStorage.removeItem('onelove_admin_logged_in');
  checkAuth();
};

// ==========================================
// Data Persistence (LocalStorage + Seed JSON)
// ==========================================
async function loadInitialData() {
  try {
    localStorage.removeItem('onelove_custom_photos');
  } catch (e) {}

  // Photos
  const cachedPhotos = localStorage.getItem('onelove_photos_v4');
  if (cachedPhotos) {
    try {
      adminPhotos = JSON.parse(cachedPhotos);
    } catch {
      adminPhotos = [...DEFAULT_DEMO_PHOTOS];
    }
  } else {
    adminPhotos = [...DEFAULT_DEMO_PHOTOS];
    savePhotos();
  }

  // Inquiries
  const cachedInquiries = localStorage.getItem('onelove_inquiries');
  if (cachedInquiries) {
    try {
      adminInquiries = JSON.parse(cachedInquiries);
    } catch {
      adminInquiries = DEFAULT_INQUIRIES;
    }
  } else {
    adminInquiries = DEFAULT_INQUIRIES;
    saveInquiries();
  }

  // Artists
  const cachedArtists = localStorage.getItem('onelove_artists');
  if (cachedArtists) {
    try {
      adminArtists = JSON.parse(cachedArtists);
    } catch {
      adminArtists = DEFAULT_ARTISTS;
    }
  } else {
    adminArtists = DEFAULT_ARTISTS;
    saveArtists();
  }
}

function savePhotos() {
  localStorage.setItem('onelove_photos_v4', JSON.stringify(adminPhotos));
  localStorage.setItem('onelove_photos_v3', JSON.stringify(adminPhotos));
}

function saveInquiries() {
  localStorage.setItem('onelove_inquiries', JSON.stringify(adminInquiries));
}

function saveArtists() {
  localStorage.setItem('onelove_artists', JSON.stringify(adminArtists));
}

// ==========================================
// Tab Switching
// ==========================================
function initTabs() {
  const tabButtons = document.querySelectorAll('.nav-item-btn[data-tab]');
  const tabContents = document.querySelectorAll('.admin-tab-content');
  const pageTitle = document.getElementById('adminPageTitle');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = btn.dataset.tab;

      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(content => {
        if (content.id === `tab-${targetTab}`) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });

      if (pageTitle) {
        const label = btn.querySelector('span:last-child');
        pageTitle.textContent = label ? label.textContent : 'Dashboard';
      }
    });
  });
}

function refreshStats() {
  const elPhotos = document.getElementById('statTotalPhotos');
  const elFeatured = document.getElementById('statFeaturedPhotos');
  const elNewInq = document.getElementById('statNewInquiries');
  const elArtists = document.getElementById('statTotalArtists');
  const badgeInq = document.getElementById('sidebarInquiriesBadge');

  const featuredCount = adminPhotos.filter(p => p.is_featured).length;
  const newInqCount = adminInquiries.filter(i => (i.status || '').toLowerCase() === 'new').length;

  if (elPhotos) elPhotos.textContent = adminPhotos.length;
  if (elFeatured) elFeatured.textContent = featuredCount;
  if (elNewInq) elNewInq.textContent = newInqCount;
  if (elArtists) elArtists.textContent = adminArtists.length;

  if (badgeInq) {
    if (newInqCount > 0) {
      badgeInq.textContent = newInqCount;
      badgeInq.style.display = 'inline-block';
    } else {
      badgeInq.style.display = 'none';
    }
  }
}

// ==========================================
// Photo Management
// ==========================================
function initPhotoManagement() {
  const addBtn = document.getElementById('openAddPhotoModal');
  const modal = document.getElementById('photoModal');
  const closeBtn = document.getElementById('closePhotoModal');
  const form = document.getElementById('addPhotoForm');
  const dropzone = document.getElementById('adminPhotoDropzone');
  const fileInput = document.getElementById('adminPhotoFileInput');
  const searchInput = document.getElementById('adminPhotoSearch');
  const categoryFilter = document.getElementById('adminPhotoCategory');

  if (addBtn && modal) {
    addBtn.onclick = () => {
      form.reset();
      document.getElementById('editPhotoId').value = '';
      document.getElementById('photoModalTitle').textContent = 'Add New Tattoo Photo';
      document.getElementById('photoPreviewThumb').style.display = 'none';
      modal.classList.add('active');
    };
  }

  if (closeBtn && modal) {
    closeBtn.onclick = () => modal.classList.remove('active');
  }

  if (dropzone && fileInput) {
    dropzone.onclick = () => fileInput.click();

    dropzone.ondragover = (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    };
    dropzone.ondragleave = () => dropzone.classList.remove('dragover');
    dropzone.ondrop = (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files.length) {
        handleImageUploadFile(e.dataTransfer.files[0]);
      }
    };

    fileInput.onchange = () => {
      if (fileInput.files.length) {
        handleImageUploadFile(fileInput.files[0]);
      }
    };
  }

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const photoId = document.getElementById('editPhotoId').value;
      const isEditing = Boolean(photoId);

      const title = document.getElementById('photoTitle').value.trim();
      const image_url = document.getElementById('photoImageUrl').value.trim();
      const artist_name = document.getElementById('photoArtist').value;
      const category = document.getElementById('photoCategory').value;
      const tags = document.getElementById('photoTags').value.trim();
      const description = document.getElementById('photoDesc').value.trim();
      const is_featured = document.getElementById('photoFeatured').checked ? 1 : 0;
      const sort_order = parseInt(document.getElementById('photoSortOrder').value) || 0;

      if (!image_url) {
        adminToast('Please upload an image or provide an image URL', 'error');
        return;
      }

      if (isEditing) {
        const idx = adminPhotos.findIndex(p => String(p.id) === String(photoId));
        if (idx !== -1) {
          adminPhotos[idx] = {
            ...adminPhotos[idx],
            title, image_url, artist_name, category, tags, description, is_featured, sort_order
          };
          adminToast('Photo updated successfully', 'success');
        }
      } else {
        const newPhoto = {
          id: Date.now(),
          title, image_url, artist_name, category, tags, description, is_featured, sort_order
        };
        adminPhotos.unshift(newPhoto);
        adminToast('New tattoo added to gallery!', 'success');
      }

      savePhotos();
      modal.classList.remove('active');
      filterAdminPhotos();
      refreshStats();
    };
  }

  if (searchInput) searchInput.oninput = () => filterAdminPhotos();
  if (categoryFilter) categoryFilter.onchange = () => filterAdminPhotos();

  renderArtistOptions();
  filterAdminPhotos();
}

function handleImageUploadFile(file) {
  const reader = new FileReader();
  adminToast('Reading image file...', 'info');

  reader.onload = (e) => {
    const dataUrl = e.target.result;
    document.getElementById('photoImageUrl').value = dataUrl;
    const preview = document.getElementById('photoPreviewThumb');
    const previewImg = document.getElementById('photoPreviewImg');
    if (preview && previewImg) {
      previewImg.src = dataUrl;
      preview.style.display = 'flex';
    }
    adminToast('Image loaded successfully!', 'success');
  };
  reader.readAsDataURL(file);
}

function filterAdminPhotos() {
  const container = document.getElementById('adminPhotosContainer');
  const searchInput = document.getElementById('adminPhotoSearch');
  const categoryFilter = document.getElementById('adminPhotoCategory');
  if (!container) return;

  const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const cat = categoryFilter ? categoryFilter.value.toLowerCase() : 'all';

  const filtered = adminPhotos.filter(p => {
    const matchCat = cat === 'all' || (p.category && p.category.toLowerCase() === cat);
    const matchSearch = !q || (
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.artist_name && p.artist_name.toLowerCase().includes(q)) ||
      (p.tags && p.tags.toLowerCase().includes(q))
    );
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px; color: var(--text-dim);">
        <p>No photos match your current filter.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="admin-photo-card" id="admin-photo-${p.id}">
      <img src="${resolveAssetUrl(p.image_url)}" alt="${escapeHtml(p.title)}" class="admin-photo-thumb" onerror="this.onerror=null; this.src=resolveAssetUrl('static/uploads/demo/tattoo_bg_lion.jpg');" />
      <div class="admin-photo-details">
        <div class="admin-photo-title" title="${escapeHtml(p.title)}">${escapeHtml(p.title)}</div>
        <div class="admin-photo-meta">
          <span>${escapeHtml(p.category)}</span>
          <span style="color: var(--admin-gold);">${escapeHtml(p.artist_name)}</span>
        </div>
        ${p.tags ? `<div style="font-size: 0.72rem; color: var(--text-muted);">#${escapeHtml(p.tags)}</div>` : ''}
        <div class="admin-photo-actions">
          <button class="featured-toggle-btn ${p.is_featured ? 'is-featured' : ''}" onclick="togglePhotoFeatured(${p.id})">
            ${p.is_featured ? '★ Featured' : '☆ Not Featured'}
          </button>
          <div style="margin-left: auto; display: flex; gap: 6px;">
            <button class="btn-admin btn-admin-ghost" style="padding: 4px 8px; font-size: 0.78rem;" onclick="editPhoto(${p.id})">Edit</button>
            <button class="btn-admin btn-admin-danger" style="padding: 4px 8px; font-size: 0.78rem;" onclick="deletePhoto(${p.id})">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

window.togglePhotoFeatured = function(id) {
  const photo = adminPhotos.find(p => String(p.id) === String(id));
  if (photo) {
    photo.is_featured = photo.is_featured ? 0 : 1;
    savePhotos();
    adminToast(photo.is_featured ? 'Marked as featured on homepage' : 'Removed from featured', 'success');
    filterAdminPhotos();
    refreshStats();
  }
};

window.editPhoto = function(id) {
  const photo = adminPhotos.find(p => String(p.id) === String(id));
  if (!photo) return;

  document.getElementById('editPhotoId').value = photo.id;
  document.getElementById('photoTitle').value = photo.title;
  document.getElementById('photoImageUrl').value = photo.image_url;
  document.getElementById('photoArtist').value = photo.artist_name;
  document.getElementById('photoCategory').value = photo.category;
  document.getElementById('photoTags').value = photo.tags || '';
  document.getElementById('photoDesc').value = photo.description || '';
  document.getElementById('photoFeatured').checked = Boolean(photo.is_featured);
  document.getElementById('photoSortOrder').value = photo.sort_order || 0;

  document.getElementById('photoModalTitle').textContent = `Edit Photo: ${photo.title}`;
  const preview = document.getElementById('photoPreviewThumb');
  const previewImg = document.getElementById('photoPreviewImg');
  if (preview && previewImg) {
    previewImg.src = photo.image_url;
    preview.style.display = 'flex';
  }

  document.getElementById('photoModal').classList.add('active');
};

window.deletePhoto = function(id) {
  if (!confirm('Are you sure you want to delete this photo from the gallery?')) return;
  adminPhotos = adminPhotos.filter(p => String(p.id) !== String(id));
  savePhotos();
  adminToast('Photo deleted successfully', 'success');
  filterAdminPhotos();
  refreshStats();
};

window.exportPhotosJson = function() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ photos: adminPhotos }, null, 2));
  const a = document.createElement('a');
  a.setAttribute("href", dataStr);
  a.setAttribute("download", "photos.json");
  document.body.appendChild(a);
  a.click();
  a.remove();
  adminToast('Exported photos.json!', 'success');
};

// ==========================================
// Inquiries Management
// ==========================================
function initInquiryManagement() {
  const filterSelect = document.getElementById('inquiryStatusFilter');
  if (filterSelect) filterSelect.onchange = () => filterInquiries();
  filterInquiries();
}

function filterInquiries() {
  const container = document.getElementById('inquiriesTableBody');
  const filterSelect = document.getElementById('inquiryStatusFilter');
  if (!container) return;

  const currentStatus = filterSelect ? filterSelect.value.toLowerCase() : 'all';

  const filtered = adminInquiries.filter(i => {
    if (currentStatus === 'all') return true;
    return i.status && i.status.toLowerCase() === currentStatus;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 36px; color: var(--text-dim);">
          No consultation inquiries found with status "${currentStatus}".
        </td>
      </tr>
    `;
    return;
  }

  container.innerHTML = filtered.map(i => `
    <tr id="inquiry-row-${i.id}">
      <td>
        <div style="font-weight: 600; color: #fff;">${escapeHtml(i.client_name)}</div>
        <div style="font-size: 0.78rem; color: var(--text-muted);">${formatDate(i.created_at)}</div>
      </td>
      <td>
        <div><a href="mailto:${escapeHtml(i.client_email)}" style="color: var(--admin-blue); text-decoration: underline;">${escapeHtml(i.client_email)}</a></div>
        ${i.client_phone ? `<div style="font-size: 0.8rem; color: var(--text-dim);"><a href="tel:${escapeHtml(i.client_phone)}">${escapeHtml(i.client_phone)}</a></div>` : ''}
      </td>
      <td>
        <div style="font-weight: 600; color: var(--admin-gold);">${escapeHtml(i.preferred_artist)}</div>
        <div style="font-size: 0.78rem; color: var(--text-dim);">${escapeHtml(i.tattoo_style)} • ${escapeHtml(i.placement)}</div>
      </td>
      <td>
        <div style="max-width: 250px; font-size: 0.82rem; color: var(--text-main); line-height: 1.4;">
          ${escapeHtml(i.description)}
        </div>
        <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 4px;">
          Size: <strong>${escapeHtml(i.estimated_size)}</strong> | Budget: <strong>${escapeHtml(i.budget)}</strong>
        </div>
      </td>
      <td>
        ${i.reference_image_url ? `
          <a href="${i.reference_image_url}" target="_blank">
            <img src="${i.reference_image_url}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 4px; border: 1px solid var(--admin-gold);" alt="Reference" />
          </a>
        ` : `<span style="color: var(--text-muted); font-size: 0.78rem;">None</span>`}
      </td>
      <td>
        <select class="admin-select" style="font-size: 0.78rem; padding: 4px 8px;" onchange="updateInquiryStatus(${i.id}, this.value)">
          <option value="New" ${i.status === 'New' ? 'selected' : ''}>New</option>
          <option value="Contacted" ${i.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
          <option value="Booked" ${i.status === 'Booked' ? 'selected' : ''}>Booked</option>
          <option value="Completed" ${i.status === 'Completed' ? 'selected' : ''}>Completed</option>
          <option value="Archived" ${i.status === 'Archived' ? 'selected' : ''}>Archived</option>
        </select>
      </td>
      <td>
        <button class="btn-admin btn-admin-danger" style="padding: 4px 8px; font-size: 0.75rem;" onclick="deleteInquiry(${i.id})">
          Delete
        </button>
      </td>
    </tr>
  `).join('');
}

window.updateInquiryStatus = function(id, newStatus) {
  const inq = adminInquiries.find(i => String(i.id) === String(id));
  if (inq) {
    inq.status = newStatus;
    saveInquiries();
    adminToast(`Inquiry #${id} marked as ${newStatus}`, 'success');
    filterInquiries();
    refreshStats();
  }
};

window.deleteInquiry = function(id) {
  if (!confirm(`Delete consultation inquiry #${id}?`)) return;
  adminInquiries = adminInquiries.filter(i => String(i.id) !== String(id));
  saveInquiries();
  adminToast('Inquiry deleted', 'success');
  filterInquiries();
  refreshStats();
};

// ==========================================
// Artists Management
// ==========================================
function initArtistManagement() {
  const form = document.getElementById('addArtistForm');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const newArtist = {
        id: Date.now(),
        name: document.getElementById('artistName').value.trim(),
        role: document.getElementById('artistRole').value.trim(),
        specialties: document.getElementById('artistSpecialties').value.trim(),
        bio: document.getElementById('artistBio').value.trim(),
        avatar_url: document.getElementById('artistAvatarUrl').value.trim() || 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=600&q=80'
      };

      adminArtists.push(newArtist);
      saveArtists();
      adminToast(`Artist "${newArtist.name}" added to studio roster`, 'success');
      form.reset();
      renderArtistsList();
      renderArtistOptions();
      refreshStats();
    };
  }

  renderArtistsList();
}

function renderArtistsList() {
  const container = document.getElementById('adminArtistsContainer');
  if (!container) return;

  container.innerHTML = adminArtists.map(a => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px; background: var(--admin-sidebar-bg); border-radius: var(--radius-sm); border: 1px solid var(--admin-border);">
      <div style="display: flex; align-items: center; gap: 14px;">
        <img src="${a.avatar_url}" alt="${escapeHtml(a.name)}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 1px solid var(--admin-gold);" />
        <div>
          <div style="font-weight: 700; color: #fff;">${escapeHtml(a.name)}</div>
          <div style="font-size: 0.8rem; color: var(--admin-gold);">${escapeHtml(a.role)}</div>
          <div style="font-size: 0.75rem; color: var(--text-dim);">${escapeHtml(a.specialties || '')}</div>
        </div>
      </div>
      <button class="btn-admin btn-admin-danger" onclick="deleteArtist(${a.id}, '${escapeHtml(a.name)}')">
        Delete
      </button>
    </div>
  `).join('');
}

function renderArtistOptions() {
  const select = document.getElementById('photoArtist');
  if (!select) return;
  select.innerHTML = adminArtists.map(a => `
    <option value="${escapeHtml(a.name)}">${escapeHtml(a.name)}</option>
  `).join('') + `
    <option value="Guest Artist">Guest Artist</option>
    <option value="One Love Studio">One Love Studio</option>
  `;
}

window.deleteArtist = function(id, name) {
  if (!confirm(`Remove artist "${name}" from studio roster?`)) return;
  adminArtists = adminArtists.filter(a => String(a.id) !== String(id));
  saveArtists();
  adminToast('Artist removed', 'success');
  renderArtistsList();
  renderArtistOptions();
  refreshStats();
};

// ==========================================
// Settings Management
// ==========================================
function initSettingsManagement() {
  const form = document.getElementById('studioSettingsForm');
  if (form) {
    const cached = localStorage.getItem('onelove_settings');
    if (cached) {
      try {
        const s = JSON.parse(cached);
        for (let k in s) {
          const input = form.querySelector(`[name="${k}"]`);
          if (input) input.value = s[k];
        }
      } catch {}
    }

    form.onsubmit = (e) => {
      e.preventDefault();
      const settings = {};
      form.querySelectorAll('[name]').forEach(i => {
        settings[i.name] = i.value;
      });
      localStorage.setItem('onelove_settings', JSON.stringify(settings));
      adminToast('Studio settings saved!', 'success');
    };
  }
}

// ==========================================
// Utilities
// ==========================================
function adminToast(msg, type = 'info') {
  let container = document.querySelector('.admin-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'admin-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `admin-toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
    <span>${escapeHtml(msg)}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function formatDate(isoStr) {
  if (!isoStr) return '';
  try {
    const d = new Date(isoStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return isoStr;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m];
  });
}
