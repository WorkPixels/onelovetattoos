/**
 * ONE LOVE TATTOOS - Static / Client-Side Admin Dashboard Engine
 * Enables 100% full dashboard functionality directly on GitHub Pages!
 */

const DEFAULT_DEMO_PHOTOS = [
  {
    "title": "Japanese Dragon & Peony Shoulder Piece",
    "description": "Custom black & grey composition featuring traditional Japanese dragon scales interwoven with delicate blooming peonies.",
    "image_url": "static/uploads/demo/tattoo_bg_lion.jpg",
    "artist_name": "Marcus 'Vex' Cole",
    "category": "Japanese",
    "tags": "Dragon, Peony, Japanese, Shoulder, Irezumi",
    "is_featured": 1,
    "sort_order": 1,
    "id": 1
  },
  {
    "title": "American Traditional Lady Head & Rose",
    "description": "Iconic Americana bold lines, saturated shading, and classic rose hair ornament honoring golden-era flash traditions.",
    "image_url": "static/uploads/demo/tattoo_trad_eagle.jpg",
    "artist_name": "Elena 'Ink' Cruz",
    "category": "Traditional",
    "tags": "Traditional, Lady Head, Rose, Americana, Flash",
    "is_featured": 1,
    "sort_order": 2,
    "id": 2
  },
  {
    "title": "Botanical Peony Fine Line Forearm",
    "description": "Single-needle botanical flora with stippled leaf shading and soft grey wash gradients wrapping the forearm.",
    "image_url": "static/uploads/demo/tattoo_trad_dagger.jpg",
    "artist_name": "Kai Soren",
    "category": "Fine Line",
    "tags": "Floral, Peony, Forearm, Botanical, Fine Line",
    "is_featured": 1,
    "sort_order": 3,
    "id": 3
  },
  {
    "title": "Curated Ear Project - Daith & Snake Helix",
    "description": "Full curated ear project showcasing implant-grade titanium daith ring, solid gold snake helix stud, and matching lobe stack.",
    "image_url": "static/uploads/demo/piercing_ear_curation.jpg",
    "artist_name": "Samira Dawn",
    "category": "Piercings",
    "tags": "Ear Curation, Daith, Helix, Snake, Gold, Titanium",
    "is_featured": 1,
    "sort_order": 4,
    "id": 4
  },
  {
    "title": "Masterwork Japanese Bodysuit Irezumi",
    "description": "Traditional full body Japanese suit with warrior composition, turbulent wind bars, and vibrant cherry blossoms.",
    "image_url": "static/uploads/demo/tattoo_japanese_koi.jpg",
    "artist_name": "Elena 'Ink' Cruz",
    "category": "Japanese",
    "tags": "Irezumi, Bodysuit, Japanese, Full Back, Warrior",
    "is_featured": 1,
    "sort_order": 5,
    "id": 5
  },
  {
    "title": "Dark Surrealism Arm Sleeve in Progress",
    "description": "Hyper-smooth grey wash gradients, high contrast shadow work, and intricate Roman numerals hand-crafted in session.",
    "image_url": "static/uploads/demo/tattoo_bg_skull.jpg",
    "artist_name": "Marcus 'Vex' Cole",
    "category": "Black & Grey",
    "tags": "Sleeve, Black & Grey, Surrealism, Arm, Studio",
    "is_featured": 1,
    "sort_order": 6,
    "id": 6
  },
  {
    "title": "Samurai Cat & Waves Full Back Irezumi",
    "description": "Custom full-back backpiece featuring a feline samurai ronin surrounded by crashing stormy waves and lotus accents.",
    "image_url": "static/uploads/demo/tattoo_bg_mandala.jpg",
    "artist_name": "Elena 'Ink' Cruz",
    "category": "Japanese",
    "tags": "Samurai, Cat, Backpiece, Irezumi, Japanese",
    "is_featured": 1,
    "sort_order": 7,
    "id": 7
  },
  {
    "title": "Snarling Mountain Wolf & Pine Forest",
    "description": "Intense photo-realism wolf portrait with lifelike fur texturing set against a deep pine forest landscape on upper arm.",
    "image_url": "static/uploads/demo/tattoo_bg_floral.jpg",
    "artist_name": "Marcus 'Vex' Cole",
    "category": "Black & Grey",
    "tags": "Wolf, Forest, Realism, Bicep, Wildlife",
    "is_featured": 1,
    "sort_order": 8,
    "id": 8
  },
  {
    "title": "Hyper-Realistic Blue Tiger Eyes",
    "description": "High-contrast cinematic wildlife realism capturing piercing blue eyes, realistic fur striations, and optical depth.",
    "image_url": "static/uploads/demo/tattoo_realism_eye.jpg",
    "artist_name": "Marcus 'Vex' Cole",
    "category": "Realism",
    "tags": "Tiger, Eyes, Realism, Blue, Forearm, Wildlife",
    "is_featured": 1,
    "sort_order": 9,
    "id": 9
  },
  {
    "title": "Circular Barbell Titanium Septum Piercing",
    "description": "Precision aseptic sweet-spot placement healed with a hand-polished black circular barbell septum clicker.",
    "image_url": "static/uploads/demo/piercing_septum_gold.jpg",
    "artist_name": "Samira Dawn",
    "category": "Piercings",
    "tags": "Septum, Piercing, Titanium, Horseshoe, Facial",
    "is_featured": 0,
    "sort_order": 10,
    "id": 10
  },
  {
    "title": "Solid Gold Floral Cluster Nostril Stud",
    "description": "Handcrafted 14k solid yellow gold floral cluster bezel stud with mirror polish finish.",
    "image_url": "static/uploads/demo/piercing_nostril_stud.jpg",
    "artist_name": "Samira Dawn",
    "category": "Piercings",
    "tags": "Nostril, Gold, Flower, Stud, Piercing",
    "is_featured": 0,
    "sort_order": 11,
    "id": 11
  },
  {
    "title": "Single-Needle Rotary Inking Session",
    "description": "Macro shot of resident artist Kai Soren crafting clean lines with a precision balanced pen rotary machine.",
    "image_url": "static/uploads/demo/tattoo_fineline_stars.jpg",
    "artist_name": "Kai Soren",
    "category": "Fine Line",
    "tags": "Fine Line, Inking, Machine, Hand, Studio",
    "is_featured": 0,
    "sort_order": 12,
    "id": 12
  },
  {
    "title": "Wildlife Fox & Cub Realism Forearm",
    "description": "Intricate micro-fur detail and tender narrative depicting a mother fox and cub nestled in wild forest grass.",
    "image_url": "static/uploads/demo/tattoo_fineline_botanical.jpg",
    "artist_name": "Marcus 'Vex' Cole",
    "category": "Realism",
    "tags": "Fox, Wildlife, Forearm, Realism, Black & Grey",
    "is_featured": 0,
    "sort_order": 13,
    "id": 13
  },
  {
    "title": "Sterile Georgetown Workstation & Color Palette",
    "description": "Texas Health Department certified medical-grade sterile tray set-up with organic color pigment caps and protective barriers.",
    "image_url": "static/uploads/demo/studio_ink_workstation.jpg",
    "artist_name": "One Love Studio",
    "category": "Flash & Studio",
    "tags": "Workstation, Sterile, Georgetown, Palette, Inks",
    "is_featured": 1,
    "sort_order": 14,
    "id": 14
  },
  {
    "title": "Custom Rotary Pen Machine & Ink Reservoir",
    "description": "High-torque rotary pen tattoo machine with disposable safety needle cartridge and vibrant ink well.",
    "image_url": "static/uploads/demo/studio_rotary_machine.jpg",
    "artist_name": "One Love Studio",
    "category": "Flash & Studio",
    "tags": "Machine, Rotary, Needle, Sterile, Equipment",
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
    artist_notes: "Spoke on phone 9/10. Client wants smoke wrapping around forearm into outer wrist. $100 deposit paid. Consultation scheduled for Oct 12th at 2PM.",
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
    artist_notes: "Emailed 3 custom stencil drafts on 9/11. Maya loves draft #2 with single-needle petal shading. Tentatively booking Oct 18th.",
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
      let updated = false;
      adminInquiries.forEach(inq => {
        if (!inq.artist_notes) {
          const match = DEFAULT_INQUIRIES.find(d => String(d.id) === String(inq.id));
          if (match && match.artist_notes) {
            inq.artist_notes = match.artist_notes;
            updated = true;
          } else if (inq.artist_notes === undefined) {
            inq.artist_notes = '';
            updated = true;
          }
        }
      });
      if (updated) saveInquiries();
    } catch {
      adminInquiries = [...DEFAULT_INQUIRIES];
      saveInquiries();
    }
  } else {
    adminInquiries = [...DEFAULT_INQUIRIES];
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

  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    const matchingBtn = document.querySelector(`.nav-item-btn[data-tab="${hash}"]`);
    if (matchingBtn) matchingBtn.click();
  }
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
        <td colspan="8" style="text-align: center; padding: 36px; color: var(--text-dim);">
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
        <button class="btn-admin btn-admin-gold" style="margin-top: 8px; padding: 4px 10px; font-size: 0.74rem; font-weight: 700; display: inline-flex; align-items: center; gap: 5px; box-shadow: 0 2px 8px rgba(212,175,55,0.25);" onclick="openInquiryNotesModal(${i.id})">
          📝 ${i.artist_notes ? 'View / Edit Notes' : '+ Add Artist Notes'}
        </button>
        ${i.artist_notes ? `<div style="font-size: 0.72rem; color: var(--admin-gold); margin-top: 4px; font-style: italic; max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHtml(i.artist_notes)}">💬 "${escapeHtml(i.artist_notes)}"</div>` : ''}
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
        <div style="max-width: 230px; font-size: 0.82rem; color: var(--text-main); line-height: 1.4;">
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
      <td style="background: rgba(212,175,55,0.04); border-left: 1px solid rgba(212,175,55,0.2); border-right: 1px solid rgba(212,175,55,0.2);">
        <div style="min-width: 240px; display: flex; flex-direction: column; gap: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.72rem; font-weight: 800; color: var(--admin-gold); text-transform: uppercase; letter-spacing: 0.06em;">
              📝 Client Discussion Notes:
            </span>
            <button class="btn-admin btn-admin-ghost" style="padding: 2px 6px; font-size: 0.68rem; border-color: rgba(212,175,55,0.4);" onclick="openInquiryNotesModal(${i.id})" title="Open full-screen notes modal">
              ⛶ Modal
            </button>
          </div>
          <textarea 
            id="inquiry-notes-${i.id}" 
            class="form-textarea" 
            placeholder="Enter notes from chatting with client (deposit, sizing, custom placement, dates)..." 
            style="font-size: 0.82rem; min-height: 70px; padding: 6px 8px; line-height: 1.35; resize: vertical; background: rgba(0,0,0,0.5); border: 1px solid rgba(212,175,55,0.45); color: #fff; border-radius: 4px; width: 100%;"
          >${escapeHtml(i.artist_notes || '')}</textarea>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span id="notes-status-${i.id}" style="font-size: 0.72rem; color: #34d399; font-weight: 600;"></span>
            <button class="btn-admin btn-admin-gold" style="padding: 4px 12px; font-size: 0.74rem; font-weight: 700;" onclick="saveInquiryNotes(${i.id})">
              💾 Save Note
            </button>
          </div>
        </div>
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
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <button class="btn-admin btn-admin-gold" style="padding: 4px 8px; font-size: 0.74rem; font-weight: 600;" onclick="openInquiryNotesModal(${i.id})">
            📝 Notes
          </button>
          <button class="btn-admin btn-admin-danger" style="padding: 4px 8px; font-size: 0.74rem;" onclick="deleteInquiry(${i.id})">
            Delete
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

let currentModalInquiryId = null;

window.openInquiryNotesModal = function(id) {
  const inq = adminInquiries.find(i => String(i.id) === String(id));
  if (!inq) return;

  currentModalInquiryId = id;
  const modal = document.getElementById('inquiryNotesModal');
  const title = document.getElementById('inquiryNotesModalTitle');
  const info = document.getElementById('inquiryNotesModalClientInfo');
  const textarea = document.getElementById('modalInquiryNotesText');
  const statusSpan = document.getElementById('modalNotesStatus');

  if (title) title.textContent = `📝 Artist Consultation Notes: ${inq.client_name}`;
  if (info) {
    info.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
        <div><strong style="color: #fff;">Client:</strong> ${escapeHtml(inq.client_name)}</div>
        <div><strong style="color: #fff;">Preferred Artist:</strong> <span style="color: var(--admin-gold);">${escapeHtml(inq.preferred_artist)}</span></div>
        <div><strong style="color: #fff;">Email:</strong> <a href="mailto:${escapeHtml(inq.client_email)}" style="color: var(--admin-blue);">${escapeHtml(inq.client_email)}</a></div>
        <div><strong style="color: #fff;">Phone:</strong> ${inq.client_phone ? `<a href="tel:${escapeHtml(inq.client_phone)}" style="color: var(--text-main);">${escapeHtml(inq.client_phone)}</a>` : 'Not provided'}</div>
      </div>
      <div style="border-top: 1px solid var(--admin-border); padding-top: 8px; margin-top: 8px;">
        <div><strong style="color: #fff;">Style & Placement:</strong> ${escapeHtml(inq.tattoo_style)} • ${escapeHtml(inq.placement)} | Size: ${escapeHtml(inq.estimated_size)} | Budget: ${escapeHtml(inq.budget)}</div>
        <div style="color: var(--text-muted); font-size: 0.8rem; margin-top: 4px;">"${escapeHtml(inq.description)}"</div>
      </div>
    `;
  }
  if (textarea) textarea.value = inq.artist_notes || '';
  if (statusSpan) statusSpan.textContent = '';
  if (modal) modal.classList.add('active');
};

window.closeInquiryNotesModal = function() {
  const modal = document.getElementById('inquiryNotesModal');
  if (modal) modal.classList.remove('active');
  currentModalInquiryId = null;
};

window.saveModalInquiryNotes = function() {
  if (!currentModalInquiryId) return;
  const textarea = document.getElementById('modalInquiryNotesText');
  const statusSpan = document.getElementById('modalNotesStatus');
  if (!textarea) return;

  const notes = textarea.value.trim();
  const inq = adminInquiries.find(i => String(i.id) === String(currentModalInquiryId));
  if (inq) {
    inq.artist_notes = notes;
    saveInquiries();
    if (statusSpan) {
      statusSpan.textContent = '✓ Saved successfully!';
      setTimeout(() => { if (statusSpan) statusSpan.textContent = ''; }, 2500);
    }
    const rowTextarea = document.getElementById(`inquiry-notes-${currentModalInquiryId}`);
    if (rowTextarea) rowTextarea.value = notes;
    adminToast('Artist consultation notes saved!', 'success');
    filterInquiries();
  }
};

window.saveInquiryNotes = function(id) {
  const textarea = document.getElementById(`inquiry-notes-${id}`);
  const statusSpan = document.getElementById(`notes-status-${id}`);
  if (!textarea) return;

  const notes = textarea.value.trim();
  const inq = adminInquiries.find(i => String(i.id) === String(id));
  if (inq) {
    inq.artist_notes = notes;
    saveInquiries();
    if (statusSpan) {
      statusSpan.textContent = '✓ Saved';
      setTimeout(() => { if (statusSpan) statusSpan.textContent = ''; }, 2500);
    }
    adminToast('Artist notes saved successfully!', 'success');
  }
};

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
  const logoPreview = document.getElementById('adminLogoPreview');
  const logoInput = document.getElementById('settingLogoUrl');
  const btnUploadLogo = document.getElementById('btnUploadLogo');
  const btnResetLogo = document.getElementById('btnResetLogo');
  const logoFileInput = document.getElementById('logoFileInput');
  const themeInput = document.getElementById('studioThemeInput');
  const themeCards = document.querySelectorAll('.theme-card-option');

  function updateLogoUI(url) {
    if (logoPreview) {
      if (url && url.trim()) {
        logoPreview.innerHTML = `<img src="${url}" alt="Studio Logo" style="width:100%;height:100%;object-fit:cover;">`;
      } else {
        logoPreview.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
      }
    }
    const adminBrandIcon = document.querySelector('.admin-brand-icon');
    if (adminBrandIcon) {
      if (url && url.trim()) {
        adminBrandIcon.innerHTML = `<img src="${url}" alt="Logo" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`;
      } else {
        adminBrandIcon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
      }
    }
  }

  function selectTheme(themeName) {
    if (!themeName) themeName = 'dark-gold';
    if (themeInput) themeInput.value = themeName;
    themeCards.forEach(card => {
      if (card.dataset.themeVal === themeName) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
    document.documentElement.setAttribute('data-theme', themeName);
  }

  themeCards.forEach(card => {
    card.addEventListener('click', () => {
      const chosenTheme = card.dataset.themeVal;
      selectTheme(chosenTheme);
    });
  });

  if (btnUploadLogo && logoFileInput) {
    btnUploadLogo.addEventListener('click', () => logoFileInput.click());
    logoFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 3 * 1024 * 1024) {
        adminToast('Logo image should be under 3MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        if (logoInput) logoInput.value = dataUrl;
        updateLogoUI(dataUrl);
        adminToast('Logo image loaded! Click Save to apply.', 'info');
      };
      reader.readAsDataURL(file);
    });
  }

  if (logoInput) {
    logoInput.addEventListener('input', () => {
      updateLogoUI(logoInput.value);
    });
  }

  if (btnResetLogo) {
    btnResetLogo.addEventListener('click', () => {
      if (logoInput) logoInput.value = '';
      if (logoFileInput) logoFileInput.value = '';
      updateLogoUI('');
      adminToast('Logo reset to default icon', 'info');
    });
  }

  if (form) {
    const cached = localStorage.getItem('onelove_settings');
    if (cached) {
      try {
        const s = JSON.parse(cached);
        for (let k in s) {
          const input = form.querySelector(`[name="${k}"]`);
          if (input) input.value = s[k];
        }
        if (s.logo_url !== undefined) {
          updateLogoUI(s.logo_url);
        }
        if (s.theme) {
          selectTheme(s.theme);
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
      if (settings.theme) {
        localStorage.setItem('onelove_theme', settings.theme);
      }
      adminToast('Studio settings & branding saved successfully!', 'success');
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
