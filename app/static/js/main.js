/**
 * ONE LOVE TATTOOS - Public Website Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initGallery();
  initBookingForm();
  initFaqAccordion();
});

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

    // Close mobile nav when clicking a link
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
let currentPhotos = [];
let currentPhotoIndex = -1;
let currentCategory = 'all';
let currentArtist = 'all';
let searchQuery = '';

function initGallery() {
  const tabs = document.querySelectorAll('.filter-tab');
  const artistSelect = document.getElementById('galleryArtistFilter');
  const searchInput = document.getElementById('gallerySearchInput');

  // Category filter tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category || 'all';
      fetchGalleryPhotos();
    });
  });

  // Artist filter dropdown
  if (artistSelect) {
    artistSelect.addEventListener('change', (e) => {
      currentArtist = e.target.value;
      fetchGalleryPhotos();
    });
  }

  // Search input debounced
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = e.target.value.trim();
        fetchGalleryPhotos();
      }, 300);
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

  // Initial fetch
  fetchGalleryPhotos();
}

async function fetchGalleryPhotos() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  grid.innerHTML = `
    <div class="gallery-empty">
      <div class="ticker-pulse" style="margin: 0 auto 16px; width: 12px; height: 12px;"></div>
      <p>Loading curated ink portfolio...</p>
    </div>
  `;

  try {
    let url = `/api/photos?limit=60`;
    if (currentCategory && currentCategory !== 'all') {
      url += `&category=${encodeURIComponent(currentCategory)}`;
    }
    if (currentArtist && currentArtist !== 'all') {
      url += `&artist=${encodeURIComponent(currentArtist)}`;
    }
    if (searchQuery) {
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error('API unavailable, attempting static fallback');
    const data = await res.json();
    currentPhotos = data.photos || [];

    renderGallery(currentPhotos);
  } catch (err) {
    console.log('API fetch not available, loading static photos:', err);
    try {
      const staticRes = await fetch('photos.json');
      if (staticRes.ok) {
        const data = await staticRes.json();
        let list = data.photos || [];
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
            (p.artist_name && p.artist_name.toLowerCase().includes(q))
          );
        }
        currentPhotos = list;
        renderGallery(currentPhotos);
        return;
      }
    } catch (fallbackErr) {
      console.error('Fallback failed:', fallbackErr);
    }

    grid.innerHTML = `
      <div class="gallery-empty">
        <p style="color: #ef4444;">Failed to load tattoos. Please refresh.</p>
      </div>
    `;
  }
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

  grid.innerHTML = photos.map((p, idx) => `
    <div class="tattoo-card" onclick="openLightbox(${idx})">
      <div class="tattoo-img-wrapper">
        ${p.is_featured ? `<span class="featured-badge">★ Featured</span>` : ''}
        <img src="${p.image_url}" alt="${escapeHtml(p.title)}" class="tattoo-img" loading="lazy" />
        <div class="card-overlay-btn">
          <div class="zoom-circle">⤢</div>
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
        ${p.description ? `<p class="tattoo-card-desc">${escapeHtml(p.description)}</p>` : ''}
        <div class="tattoo-card-footer">
          <div class="tattoo-tags">
            ${(p.tags || '').split(',').filter(t => t.trim()).slice(0, 3).map(tag => `
              <span class="tattoo-tag">#${escapeHtml(tag.trim())}</span>
            `).join('')}
          </div>
          <span style="font-size: 0.78rem; color: var(--accent-gold); font-weight: 600;">View ➔</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Lightbox Open/Close/Navigation
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

  if (img) img.src = photo.image_url;
  if (title) title.textContent = photo.title;
  if (artist) artist.textContent = photo.artist_name;
  if (category) category.textContent = photo.category;
  if (desc) desc.textContent = photo.description || 'Custom hand-crafted design crafted at One Love Tattoos in Georgetown, Texas.';
  if (counter) counter.textContent = `${index + 1} of ${currentPhotos.length}`;

  if (tagsWrap) {
    tagsWrap.innerHTML = (photo.tags || '').split(',').filter(t => t.trim()).map(t => `
      <span class="tattoo-tag" style="padding: 4px 10px; background: rgba(255,255,255,0.06); border-radius: 4px; color: #fff;">#${escapeHtml(t.trim())}</span>
    `).join('');
  }

  // Pre-fill booking button in lightbox
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
    openLightbox(0); // loop
  }
};

window.prevLightboxPhoto = function() {
  if (currentPhotoIndex > 0) {
    openLightbox(currentPhotoIndex - 1);
  } else {
    openLightbox(currentPhotos.length - 1); // loop
  }
};

function prefillConsultation(photo) {
  const styleSelect = document.getElementById('inquiryStyle');
  const artistSelect = document.getElementById('inquiryArtist');
  const descInput = document.getElementById('inquiryDesc');

  if (styleSelect && photo.category) {
    // Try matching category
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

// Filter from artist cards directly
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
  fetchGalleryPhotos();
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

          // Show confirmation modal or banner
          alert(`Thank you, ${payload.client_name}!\n\nYour consultation request (#${data.inquiry_id}) has been sent directly to One Love Tattoos. Our team will review your concept and reach out via email or phone to confirm your consultation/deposit.`);
        } else {
          alert(data.detail || 'Failed to submit consultation. Please give us a call at (512) 868-1588.');
        }
      } catch (err) {
        console.error('Submission error:', err);
        alert('Network error. Please call us at (512) 868-1588 to book!');
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

  const formData = new FormData();
  formData.append('file', file);

  try {
    if (preview) {
      preview.style.display = 'flex';
      previewName.textContent = 'Uploading reference...';
    }

    const res = await fetch('/api/upload/public-reference', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (res.ok && data.url) {
      uploadedReferenceUrl = data.url;
      if (previewImg) previewImg.src = data.url;
      if (previewName) previewName.textContent = file.name;
    }
  } catch (err) {
    console.error('Upload failed:', err);
    if (previewName) previewName.textContent = 'Upload failed. File too large or invalid format.';
  }
}

// ==========================================
// FAQ Accordion
// ==========================================
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        items.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

// ==========================================
// Utilities & Toasts
// ==========================================
function showToast(msg) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: var(--accent-gold); font-size: 1.2rem;">✓</span>
    <span>${escapeHtml(msg)}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
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
