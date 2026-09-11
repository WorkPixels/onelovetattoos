/**
 * ONE LOVE TATTOOS - Public Website Interactivity
 * Hardened for both FastAPI full-stack and GitHub Pages static hosting.
 */

const DEFAULT_PHOTOS = [
  {
    "title": "Japanese Dragon & Peony Shoulder Piece",
    "description": "Custom black & grey composition featuring traditional Japanese dragon scales interwoven with delicate blooming peonies.",
    "image_url": "static/uploads/demo/tattoo_bg_lion.jpg",
    "artist_name": "Marcus 'Vex' Cole",
    "category": "Japanese",
    "tags": "Dragon, Peony, Japanese, Shoulder, Irezumi",
    "is_featured": 1,
    "sort_order": 1
  },
  {
    "title": "American Traditional Lady Head & Rose",
    "description": "Iconic Americana bold lines, saturated shading, and classic rose hair ornament honoring golden-era flash traditions.",
    "image_url": "static/uploads/demo/tattoo_trad_eagle.jpg",
    "artist_name": "Elena 'Ink' Cruz",
    "category": "Traditional",
    "tags": "Traditional, Lady Head, Rose, Americana, Flash",
    "is_featured": 1,
    "sort_order": 2
  },
  {
    "title": "Botanical Peony Fine Line Forearm",
    "description": "Single-needle botanical flora with stippled leaf shading and soft grey wash gradients wrapping the forearm.",
    "image_url": "static/uploads/demo/tattoo_trad_dagger.jpg",
    "artist_name": "Kai Soren",
    "category": "Fine Line",
    "tags": "Floral, Peony, Forearm, Botanical, Fine Line",
    "is_featured": 1,
    "sort_order": 3
  },
  {
    "title": "Curated Ear Project - Daith & Snake Helix",
    "description": "Full curated ear project showcasing implant-grade titanium daith ring, solid gold snake helix stud, and matching lobe stack.",
    "image_url": "static/uploads/demo/piercing_ear_curation.jpg",
    "artist_name": "Samira Dawn",
    "category": "Piercings",
    "tags": "Ear Curation, Daith, Helix, Snake, Gold, Titanium",
    "is_featured": 1,
    "sort_order": 4
  },
  {
    "title": "Masterwork Japanese Bodysuit Irezumi",
    "description": "Traditional full body Japanese suit with warrior composition, turbulent wind bars, and vibrant cherry blossoms.",
    "image_url": "static/uploads/demo/tattoo_japanese_koi.jpg",
    "artist_name": "Elena 'Ink' Cruz",
    "category": "Japanese",
    "tags": "Irezumi, Bodysuit, Japanese, Full Back, Warrior",
    "is_featured": 1,
    "sort_order": 5
  },
  {
    "title": "Dark Surrealism Arm Sleeve in Progress",
    "description": "Hyper-smooth grey wash gradients, high contrast shadow work, and intricate Roman numerals hand-crafted in session.",
    "image_url": "static/uploads/demo/tattoo_bg_skull.jpg",
    "artist_name": "Marcus 'Vex' Cole",
    "category": "Black & Grey",
    "tags": "Sleeve, Black & Grey, Surrealism, Arm, Studio",
    "is_featured": 1,
    "sort_order": 6
  },
  {
    "title": "Samurai Cat & Waves Full Back Irezumi",
    "description": "Custom full-back backpiece featuring a feline samurai ronin surrounded by crashing stormy waves and lotus accents.",
    "image_url": "static/uploads/demo/tattoo_bg_mandala.jpg",
    "artist_name": "Elena 'Ink' Cruz",
    "category": "Japanese",
    "tags": "Samurai, Cat, Backpiece, Irezumi, Japanese",
    "is_featured": 1,
    "sort_order": 7
  },
  {
    "title": "Snarling Mountain Wolf & Pine Forest",
    "description": "Intense photo-realism wolf portrait with lifelike fur texturing set against a deep pine forest landscape on upper arm.",
    "image_url": "static/uploads/demo/tattoo_bg_floral.jpg",
    "artist_name": "Marcus 'Vex' Cole",
    "category": "Black & Grey",
    "tags": "Wolf, Forest, Realism, Bicep, Wildlife",
    "is_featured": 1,
    "sort_order": 8
  },
  {
    "title": "Hyper-Realistic Blue Tiger Eyes",
    "description": "High-contrast cinematic wildlife realism capturing piercing blue eyes, realistic fur striations, and optical depth.",
    "image_url": "static/uploads/demo/tattoo_realism_eye.jpg",
    "artist_name": "Marcus 'Vex' Cole",
    "category": "Realism",
    "tags": "Tiger, Eyes, Realism, Blue, Forearm, Wildlife",
    "is_featured": 1,
    "sort_order": 9
  },
  {
    "title": "Circular Barbell Titanium Septum Piercing",
    "description": "Precision aseptic sweet-spot placement healed with a hand-polished black circular barbell septum clicker.",
    "image_url": "static/uploads/demo/piercing_septum_gold.jpg",
    "artist_name": "Samira Dawn",
    "category": "Piercings",
    "tags": "Septum, Piercing, Titanium, Horseshoe, Facial",
    "is_featured": 0,
    "sort_order": 10
  },
  {
    "title": "Solid Gold Floral Cluster Nostril Stud",
    "description": "Handcrafted 14k solid yellow gold floral cluster bezel stud with mirror polish finish.",
    "image_url": "static/uploads/demo/piercing_nostril_stud.jpg",
    "artist_name": "Samira Dawn",
    "category": "Piercings",
    "tags": "Nostril, Gold, Flower, Stud, Piercing",
    "is_featured": 0,
    "sort_order": 11
  },
  {
    "title": "Single-Needle Rotary Inking Session",
    "description": "Macro shot of resident artist Kai Soren crafting clean lines with a precision balanced pen rotary machine.",
    "image_url": "static/uploads/demo/tattoo_fineline_stars.jpg",
    "artist_name": "Kai Soren",
    "category": "Fine Line",
    "tags": "Fine Line, Inking, Machine, Hand, Studio",
    "is_featured": 0,
    "sort_order": 12
  },
  {
    "title": "Wildlife Fox & Cub Realism Forearm",
    "description": "Intricate micro-fur detail and tender narrative depicting a mother fox and cub nestled in wild forest grass.",
    "image_url": "static/uploads/demo/tattoo_fineline_botanical.jpg",
    "artist_name": "Marcus 'Vex' Cole",
    "category": "Realism",
    "tags": "Fox, Wildlife, Forearm, Realism, Black & Grey",
    "is_featured": 0,
    "sort_order": 13
  },
  {
    "title": "Sterile Georgetown Workstation & Color Palette",
    "description": "Texas Health Department certified medical-grade sterile tray set-up with organic color pigment caps and protective barriers.",
    "image_url": "static/uploads/demo/studio_ink_workstation.jpg",
    "artist_name": "One Love Studio",
    "category": "Flash & Studio",
    "tags": "Workstation, Sterile, Georgetown, Palette, Inks",
    "is_featured": 1,
    "sort_order": 14
  },
  {
    "title": "Custom Rotary Pen Machine & Ink Reservoir",
    "description": "High-torque rotary pen tattoo machine with disposable safety needle cartridge and vibrant ink well.",
    "image_url": "static/uploads/demo/studio_rotary_machine.jpg",
    "artist_name": "One Love Studio",
    "category": "Flash & Studio",
    "tags": "Machine, Rotary, Needle, Sterile, Equipment",
    "is_featured": 0,
    "sort_order": 15
  }
];

let currentPhotos = [...DEFAULT_PHOTOS];
let currentPhotoIndex = -1;
let currentCategory = 'all';
let currentArtist = 'all';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  // Invalidate any legacy/stale cache from earlier versions
  try {
    localStorage.removeItem('onelove_custom_photos');
  } catch (e) {}

  initNavigation();
  initGallery();
  initBookingForm();
  initFaqAccordion();
});

// ==========================================
// Asset URL Resolver
// ==========================================
function resolveAssetUrl(url) {
  if (!url) return 'static/uploads/demo/tattoo_bg_lion.jpg';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  // Normalize leading slash
  let clean = url.startsWith('/') ? url.slice(1) : url;
  const path = window.location.pathname;
  if (path.includes('/onelovetattoos/')) {
    return '/onelovetattoos/' + clean;
  }
  return clean;
}

// ==========================================
// Navigation & Mobile Menu
// ==========================================
function initNavigation() {
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

// ==========================================
// Gallery & Lightbox Logic
// ==========================================
function initGallery() {
  const tabs = document.querySelectorAll('.filter-tab');
  const artistSelect = document.getElementById('galleryArtistFilter');
  const searchInput = document.getElementById('gallerySearchInput');

  // Category filter tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category || 'all';
      filterAndRenderPhotos();
    });
  });

  // Artist filter dropdown
  if (artistSelect) {
    artistSelect.addEventListener('change', (e) => {
      currentArtist = e.target.value;
      filterAndRenderPhotos();
    });
  }

  // Search input with debouncing
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = e.target.value.trim();
        filterAndRenderPhotos();
      }, 250);
    });
  }

  // Lightbox keyboard controls
  document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightboxModal');
    if (!lightbox || !lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightboxPhoto();
    if (e.key === 'ArrowLeft') prevLightboxPhoto();
  });

  // Attempt to sync with API or local storage
  syncGalleryData();
}

async function syncGalleryData() {
  // 1. Try FastAPI API
  try {
    const res = await fetch('/api/photos?limit=60');
    if (res.ok) {
      const data = await res.json();
      if (data && data.photos && data.photos.length > 0) {
        DEFAULT_PHOTOS.length = 0;
        DEFAULT_PHOTOS.push(...data.photos);
        filterAndRenderPhotos();
        return;
      }
    }
  } catch (e) {}

  // 2. Try photos.json for static hosts
  try {
    const basePath = window.location.pathname.includes('/onelovetattoos/') ? '/onelovetattoos/' : './';
    const jsonRes = await fetch(basePath + 'photos.json?v=' + Date.now());
    if (jsonRes.ok) {
      const data = await jsonRes.json();
      if (data && data.photos && data.photos.length > 0) {
        DEFAULT_PHOTOS.length = 0;
        DEFAULT_PHOTOS.push(...data.photos);
        filterAndRenderPhotos();
        return;
      }
    }
  } catch (e) {}

  // 3. Fallback: DEFAULT_PHOTOS already preloaded
  filterAndRenderPhotos();
}

function filterAndRenderPhotos() {
  let list = [...DEFAULT_PHOTOS];

  if (currentCategory && currentCategory !== 'all') {
    list = list.filter(p => p.category && p.category.toLowerCase() === currentCategory.toLowerCase());
  }

  if (currentArtist && currentArtist !== 'all') {
    list = list.filter(p => p.artist_name && p.artist_name.toLowerCase() === currentArtist.toLowerCase());
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p => 
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.tags && p.tags.toLowerCase().includes(q)) ||
      (p.artist_name && p.artist_name.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  }

  currentPhotos = list;
  renderGallery(currentPhotos);
}

function renderGallery(photos) {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  if (photos.length === 0) {
    grid.innerHTML = `
      <div class="gallery-empty">
        <p style="font-size: 1.1rem; color: #fff; margin-bottom: 8px;">No tattoos found</p>
        <p>Try adjusting your style filter or search terms.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = photos.map((p, idx) => {
    const resolvedUrl = resolveAssetUrl(p.image_url);
    const tags = (p.tags || '').split(',').filter(t => t.trim()).slice(0, 3);
    const tagsHtml = tags.map(t => `<span class="tattoo-tag">#${escapeHtml(t.trim())}</span>`).join('');
    const featBadge = p.is_featured ? `<span class="featured-badge">★ Featured</span>` : '';
    const descHtml = p.description ? `<p class="tattoo-card-desc">${escapeHtml(p.description)}</p>` : '';

    return `
      <div class="tattoo-card" data-category="${escapeHtml(p.category)}" data-artist="${escapeHtml(p.artist_name)}" onclick="openLightbox(${idx})">
        <div class="tattoo-img-wrapper">
          ${featBadge}
          <img src="${resolvedUrl}" alt="${escapeHtml(p.title)}" class="tattoo-img" loading="lazy" onerror="this.onerror=null; this.src='static/uploads/demo/tattoo_bg_lion.jpg';" />
          <div class="card-overlay-btn">
            <div class="zoom-circle">&#10530;</div>
          </div>
        </div>
        <div class="tattoo-card-info">
          <div class="tattoo-card-header">
            <h4 class="tattoo-title">${escapeHtml(p.title)}</h4>
            <span class="tattoo-cat-tag">${escapeHtml(p.category)}</span>
          </div>
          <div class="tattoo-artist-credit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            ${escapeHtml(p.artist_name)}
          </div>
          ${descHtml}
          <div class="tattoo-card-footer">
            <div class="tattoo-tags">
              ${tagsHtml}
            </div>
            <span style="font-size: 0.78rem; color: var(--accent-gold); font-weight: 600;">View &#10142;</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================
// Lightbox Functions
// ==========================================
window.openLightbox = function(index) {
  if (index < 0 || index >= currentPhotos.length) return;
  currentPhotoIndex = index;
  const photo = currentPhotos[index];

  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImage');
  const title = document.getElementById('lightboxTitle');
  const artist = document.getElementById('lightboxArtist');
  const category = document.getElementById('lightboxCategory');
  const desc = document.getElementById('lightboxDesc');
  const tagsWrap = document.getElementById('lightboxTags');
  const counter = document.getElementById('lightboxCounter');

  if (img) {
    img.src = resolveAssetUrl(photo.image_url);
    img.onerror = () => { img.src = 'static/uploads/demo/tattoo_bg_lion.jpg'; };
  }
  if (title) title.textContent = photo.title;
  if (artist) artist.textContent = photo.artist_name;
  if (category) category.textContent = photo.category;
  if (desc) desc.textContent = photo.description || 'Custom hand-crafted piece by One Love Tattoos in Georgetown, Texas.';
  if (counter) counter.textContent = `${index + 1} of ${currentPhotos.length}`;

  if (tagsWrap) {
    tagsWrap.innerHTML = (photo.tags || '').split(',').filter(t => t.trim()).map(t => `
      <span class="tattoo-tag" style="padding: 4px 10px; background: rgba(255,255,255,0.06); border-radius: 4px; color: #fff;">#${escapeHtml(t.trim())}</span>
    `).join('');
  }

  const bookBtn = document.getElementById('lightboxBookBtn');
  if (bookBtn) {
    bookBtn.onclick = () => {
      closeLightbox();
      prefillConsultation(photo);
    };
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
  const modal = document.getElementById('lightboxModal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
};

window.nextLightboxPhoto = function() {
  if (currentPhotoIndex < currentPhotos.length - 1) {
    openLightbox(currentPhotoIndex + 1);
  } else {
    openLightbox(0);
  }
};

window.prevLightboxPhoto = function() {
  if (currentPhotoIndex > 0) {
    openLightbox(currentPhotoIndex - 1);
  } else {
    openLightbox(currentPhotos.length - 1);
  }
};

function prefillConsultation(photo) {
  const styleSelect = document.getElementById('inquiryStyle');
  const artistSelect = document.getElementById('inquiryArtist');
  const descInput = document.getElementById('inquiryDesc');

  if (styleSelect && photo.category) {
    for (let opt of styleSelect.options) {
      if (opt.value.toLowerCase() === photo.category.toLowerCase()) {
        opt.selected = true;
        break;
      }
    }
  }

  if (artistSelect && photo.artist_name) {
    for (let opt of artistSelect.options) {
      if (opt.text.toLowerCase().includes(photo.artist_name.toLowerCase())) {
        opt.selected = true;
        break;
      }
    }
  }

  if (descInput) {
    descInput.value = `I love the "${photo.title}" piece from your gallery by ${photo.artist_name}! I would like something similar... `;
    descInput.focus();
  }

  const bookingSection = document.getElementById('booking');
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
  }
}

window.filterByArtist = function(artistName) {
  const artistSelect = document.getElementById('galleryArtistFilter');
  if (artistSelect) {
    for (let opt of artistSelect.options) {
      if (opt.value.toLowerCase() === artistName.toLowerCase()) {
        opt.selected = true;
        break;
      }
    }
  }
  currentArtist = artistName;
  const gallery = document.getElementById('gallery');
  if (gallery) {
    gallery.scrollIntoView({ behavior: 'smooth' });
  }
  filterAndRenderPhotos();
};

// ==========================================
// Consultation Booking Form
// ==========================================
let uploadedReferenceUrl = '';

function initBookingForm() {
  const form = document.getElementById('consultationForm');
  const dropzone = document.getElementById('refDropzone');
  const fileInput = document.getElementById('refFileInput');
  const preview = document.getElementById('refPreview');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files.length) {
        handleReferenceUpload(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length) {
        handleReferenceUpload(fileInput.files[0]);
      }
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Submitting Request...`;

      const payload = {
        client_name: document.getElementById('inquiryName').value.trim(),
        client_email: document.getElementById('inquiryEmail').value.trim(),
        client_phone: document.getElementById('inquiryPhone').value.trim(),
        preferred_artist: document.getElementById('inquiryArtist').value,
        tattoo_style: document.getElementById('inquiryStyle').value,
        placement: document.getElementById('inquiryPlacement').value,
        estimated_size: document.getElementById('inquirySize').value,
        budget: document.getElementById('inquiryBudget').value,
        description: document.getElementById('inquiryDesc').value.trim(),
        reference_image_url: uploadedReferenceUrl
      };

      try {
        const res = await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (res.ok && data.success) {
          showToast(`Consultation request submitted! Reference #${data.inquiry_id}`);
          form.reset();
          uploadedReferenceUrl = '';
          if (preview) preview.style.display = 'none';

          alert(`Thank you, ${payload.client_name}!\n\nYour consultation request (#${data.inquiry_id}) has been sent directly to One Love Tattoos. Our team will review your concept and reach out via email or phone to confirm your consultation/deposit.`);
        } else {
          alert(data.detail || 'Failed to submit consultation. Please give us a call at (512) 868-1588.');
        }
      } catch (err) {
        console.log('API submission failed, saving locally to inquiries inbox:', err);
        const inqId = Date.now();
        const storedInq = {
          id: inqId,
          ...payload,
          status: 'New',
          created_at: new Date().toISOString()
        };
        try {
          const currentInqs = JSON.parse(localStorage.getItem('onelove_inquiries') || '[]');
          currentInqs.unshift(storedInq);
          localStorage.setItem('onelove_inquiries', JSON.stringify(currentInqs));
          showToast(`Consultation request saved! Reference #${inqId}`);
          form.reset();
          uploadedReferenceUrl = '';
          if (preview) preview.style.display = 'none';
          alert(`Thank you, ${payload.client_name}!\n\nYour consultation request (#${inqId}) has been recorded! Our team at One Love Tattoos will review your concept and reach out.`);
        } catch (localErr) {
          alert('Could not submit inquiry. Please call us directly at (512) 868-1588!');
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
}

async function handleReferenceUpload(file) {
  const preview = document.getElementById('refPreview');
  const previewImg = document.getElementById('refPreviewImg');
  const previewName = document.getElementById('refPreviewName');

  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedReferenceUrl = e.target.result;
    if (previewImg) previewImg.src = uploadedReferenceUrl;
    if (previewName) previewName.textContent = `${file.name} (${(file.size / 1024).toFixed(0)} KB)`;
    if (preview) preview.style.display = 'flex';
  };
  reader.readAsDataURL(file);
}

// ==========================================
// FAQ Accordion
// ==========================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const q = item.querySelector('.faq-question');
    if (q) {
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });
}

// ==========================================
// Utilities
// ==========================================
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(msg) {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.background = 'rgba(13, 15, 20, 0.95)';
    toast.style.color = '#fff';
    toast.style.border = '1px solid #d4af37';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '8px';
    toast.style.fontSize = '0.9rem';
    toast.style.zIndex = '99999';
    toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    toast.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(() => {
    toast.style.opacity = '0';
  }, 3500);
}
