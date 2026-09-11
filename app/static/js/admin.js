/**
 * ONE LOVE TATTOOS - Admin Dashboard Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initPhotoManagement();
  initInquiryManagement();
  initArtistManagement();
  initSettingsManagement();
  refreshStats();
});

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
        pageTitle.textContent = btn.querySelector('span') ? btn.querySelector('span').textContent : 'Dashboard';
      }
    });
  });

  if (window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    const matchingBtn = document.querySelector(`.nav-item-btn[data-tab="${hash}"]`);
    if (matchingBtn) matchingBtn.click();
  }
}

// ==========================================
// Stats Overview
// ==========================================
async function refreshStats() {
  try {
    const res = await fetch('/api/admin/stats');
    if (!res.ok) return;
    const stats = await res.json();

    const elPhotos = document.getElementById('statTotalPhotos');
    const elFeatured = document.getElementById('statFeaturedPhotos');
    const elNewInq = document.getElementById('statNewInquiries');
    const elArtists = document.getElementById('statTotalArtists');
    const badgeInq = document.getElementById('sidebarInquiriesBadge');

    if (elPhotos) elPhotos.textContent = stats.total_photos;
    if (elFeatured) elFeatured.textContent = stats.featured_photos;
    if (elNewInq) elNewInq.textContent = stats.new_inquiries;
    if (elArtists) elArtists.textContent = stats.total_artists;

    if (badgeInq) {
      if (stats.new_inquiries > 0) {
        badgeInq.textContent = stats.new_inquiries;
        badgeInq.style.display = 'inline-block';
      } else {
        badgeInq.style.display = 'none';
      }
    }
  } catch (err) {
    console.error('Error fetching stats:', err);
  }
}

// ==========================================
// Photos Management
// ==========================================
let allAdminPhotos = [];

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
    addBtn.addEventListener('click', () => {
      form.reset();
      document.getElementById('editPhotoId').value = '';
      document.getElementById('photoModalTitle').textContent = 'Add New Tattoo Photo';
      document.getElementById('photoPreviewThumb').style.display = 'none';
      modal.classList.add('active');
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  // File upload dropzone in modal
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
        uploadAdminPhotoFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length) {
        uploadAdminPhotoFile(fileInput.files[0]);
      }
    });
  }

  // Photo form submit (Create or Update)
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const photoId = document.getElementById('editPhotoId').value;
      const isEditing = Boolean(photoId);

      const payload = {
        title: document.getElementById('photoTitle').value.trim(),
        image_url: document.getElementById('photoImageUrl').value.trim(),
        artist_name: document.getElementById('photoArtist').value,
        category: document.getElementById('photoCategory').value,
        tags: document.getElementById('photoTags').value.trim(),
        description: document.getElementById('photoDesc').value.trim(),
        is_featured: document.getElementById('photoFeatured').checked ? 1 : 0,
        sort_order: parseInt(document.getElementById('photoSortOrder').value) || 0
      };

      if (!payload.image_url) {
        adminToast('Please provide an image URL or upload a file.', 'error');
        return;
      }

      try {
        let res;
        if (isEditing) {
          res = await fetch(`/api/admin/photos/${photoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        } else {
          res = await fetch('/api/admin/photos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        }

        const data = await res.json();
        if (res.ok && data.success) {
          adminToast(isEditing ? 'Photo updated successfully' : 'Photo added to gallery', 'success');
          modal.classList.remove('active');
          loadAdminPhotos();
          refreshStats();
        } else {
          adminToast(data.detail || 'Failed to save photo', 'error');
        }
      } catch (err) {
        console.error('Error saving photo:', err);
        adminToast('Network error while saving photo', 'error');
      }
    });
  }

  // Search & Filter
  if (searchInput) {
    searchInput.addEventListener('input', () => filterAdminPhotos());
  }
  if (categoryFilter) {
    categoryFilter.addEventListener('change', () => filterAdminPhotos());
  }

  // Initial load
  loadAdminPhotos();
}

async function uploadAdminPhotoFile(file) {
  const urlInput = document.getElementById('photoImageUrl');
  const preview = document.getElementById('photoPreviewThumb');
  const previewImg = document.getElementById('photoPreviewImg');

  const formData = new FormData();
  formData.append('file', file);

  adminToast('Uploading image...', 'info');

  try {
    const res = await fetch('/api/admin/photos/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (res.ok && data.url) {
      urlInput.value = data.url;
      if (preview && previewImg) {
        previewImg.src = data.url;
        preview.style.display = 'flex';
      }
      adminToast('Image uploaded successfully', 'success');
    } else {
      adminToast(data.detail || 'Upload failed', 'error');
    }
  } catch (err) {
    console.error('Upload error:', err);
    adminToast('Failed to upload image file', 'error');
  }
}

async function loadAdminPhotos() {
  const container = document.getElementById('adminPhotosContainer');
  if (!container) return;

  try {
    const res = await fetch('/api/photos?limit=200');
    const data = await res.json();
    allAdminPhotos = data.photos || [];
    filterAdminPhotos();
  } catch (err) {
    console.error('Failed to load photos:', err);
  }
}

function filterAdminPhotos() {
  const container = document.getElementById('adminPhotosContainer');
  const searchInput = document.getElementById('adminPhotoSearch');
  const categoryFilter = document.getElementById('adminPhotoCategory');

  const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const cat = categoryFilter ? categoryFilter.value.toLowerCase() : 'all';

  const filtered = allAdminPhotos.filter(p => {
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
      <img src="${p.image_url}" alt="${escapeHtml(p.title)}" class="admin-photo-thumb" />
      <div class="admin-photo-details">
        <div class="admin-photo-title" title="${escapeHtml(p.title)}">${escapeHtml(p.title)}</div>
        <div class="admin-photo-meta">
          <span>${escapeHtml(p.category)}</span>
          <span style="color: var(--admin-gold);">${escapeHtml(p.artist_name)}</span>
        </div>
        ${p.tags ? `<div style="font-size: 0.72rem; color: var(--text-muted);">#${escapeHtml(p.tags)}</div>` : ''}
        <div class="admin-photo-actions">
          <button class="featured-toggle-btn ${p.is_featured ? 'is-featured' : ''}" onclick="togglePhotoFeatured(${p.id}, ${p.is_featured})">
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

window.togglePhotoFeatured = async function(id, currentStatus) {
  try {
    const res = await fetch(`/api/admin/photos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_featured: currentStatus ? 0 : 1 })
    });
    if (res.ok) {
      adminToast(currentStatus ? 'Removed from featured' : 'Marked as featured on homepage', 'success');
      loadAdminPhotos();
      refreshStats();
    }
  } catch (err) {
    adminToast('Failed to toggle featured', 'error');
  }
};

window.editPhoto = function(id) {
  const photo = allAdminPhotos.find(p => p.id === id);
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

window.deletePhoto = async function(id) {
  if (!confirm('Are you sure you want to delete this photo from the gallery? This action cannot be undone.')) {
    return;
  }

  try {
    const res = await fetch(`/api/admin/photos/${id}`, { method: 'DELETE' });
    if (res.ok) {
      adminToast('Photo deleted successfully', 'success');
      loadAdminPhotos();
      refreshStats();
    } else {
      adminToast('Failed to delete photo', 'error');
    }
  } catch (err) {
    adminToast('Error deleting photo', 'error');
  }
};

// ==========================================
// Inquiries Management
// ==========================================
let allInquiries = [];

function initInquiryManagement() {
  const filterSelect = document.getElementById('inquiryStatusFilter');
  if (filterSelect) {
    filterSelect.addEventListener('change', () => filterInquiries());
  }
  loadInquiries();
}

async function loadInquiries() {
  try {
    const res = await fetch('/api/admin/inquiries');
    const data = await res.json();
    allInquiries = data.inquiries || [];
    filterInquiries();
  } catch (err) {
    console.error('Failed to load inquiries:', err);
  }
}

function filterInquiries() {
  const container = document.getElementById('inquiriesTableBody');
  const filterSelect = document.getElementById('inquiryStatusFilter');
  if (!container) return;

  const currentStatus = filterSelect ? filterSelect.value.toLowerCase() : 'all';

  const filtered = allInquiries.filter(i => {
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

  container.innerHTML = filtered.map(i => {
    const statusClass = `status-${(i.status || 'new').toLowerCase()}`;
    return `
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
          <div style="max-width: 230px; font-size: 0.82rem; color: var(--text-main); white-space: normal; line-height: 1.4;">
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
    `;
  }).join('');
}

let currentModalInquiryId = null;

window.openInquiryNotesModal = function(id) {
  const inq = allInquiries.find(i => String(i.id) === String(id));
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

window.saveModalInquiryNotes = async function() {
  if (!currentModalInquiryId) return;
  const textarea = document.getElementById('modalInquiryNotesText');
  const statusSpan = document.getElementById('modalNotesStatus');
  if (!textarea) return;

  const notes = textarea.value.trim();
  if (statusSpan) statusSpan.textContent = 'Saving...';

  try {
    const res = await fetch(`/api/admin/inquiries/${currentModalInquiryId}/notes`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes })
    });
    if (res.ok) {
      const inq = allInquiries.find(item => String(item.id) === String(currentModalInquiryId));
      if (inq) inq.artist_notes = notes;
      if (statusSpan) {
        statusSpan.textContent = '✓ Saved successfully!';
        setTimeout(() => { if (statusSpan) statusSpan.textContent = ''; }, 2500);
      }
      const rowTextarea = document.getElementById(`inquiry-notes-${currentModalInquiryId}`);
      if (rowTextarea) rowTextarea.value = notes;
      adminToast('Artist consultation notes saved!', 'success');
      filterInquiries();
    } else {
      if (statusSpan) statusSpan.textContent = 'Failed to save';
      adminToast('Failed to save notes', 'error');
    }
  } catch (err) {
    if (statusSpan) statusSpan.textContent = 'Error';
    adminToast('Error saving notes', 'error');
  }
};

window.saveInquiryNotes = async function(id) {
  const textarea = document.getElementById(`inquiry-notes-${id}`);
  const statusSpan = document.getElementById(`notes-status-${id}`);
  if (!textarea) return;

  const notes = textarea.value.trim();
  if (statusSpan) statusSpan.textContent = 'Saving...';

  try {
    const res = await fetch(`/api/admin/inquiries/${id}/notes`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes })
    });
    if (res.ok) {
      const inq = allInquiries.find(item => String(item.id) === String(id));
      if (inq) inq.artist_notes = notes;
      if (statusSpan) {
        statusSpan.textContent = '✓ Saved';
        setTimeout(() => { if (statusSpan) statusSpan.textContent = ''; }, 2500);
      }
      adminToast('Artist notes saved successfully!', 'success');
    } else {
      if (statusSpan) statusSpan.textContent = 'Failed';
      adminToast('Failed to save notes', 'error');
    }
  } catch (err) {
    if (statusSpan) statusSpan.textContent = 'Error';
    adminToast('Error saving notes', 'error');
  }
};

window.updateInquiryStatus = async function(id, newStatus) {
  try {
    const res = await fetch(`/api/admin/inquiries/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) {
      adminToast(`Inquiry #${id} marked as ${newStatus}`, 'success');
      loadInquiries();
      refreshStats();
    }
  } catch (err) {
    adminToast('Failed to update status', 'error');
  }
};

window.deleteInquiry = async function(id) {
  if (!confirm(`Delete consultation inquiry #${id}?`)) return;

  try {
    const res = await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' });
    if (res.ok) {
      adminToast('Inquiry deleted', 'success');
      loadInquiries();
      refreshStats();
    }
  } catch (err) {
    adminToast('Failed to delete inquiry', 'error');
  }
};

// ==========================================
// Artists Management
// ==========================================
function initArtistManagement() {
  const form = document.getElementById('addArtistForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        name: document.getElementById('artistName').value.trim(),
        role: document.getElementById('artistRole').value.trim(),
        specialties: document.getElementById('artistSpecialties').value.trim(),
        bio: document.getElementById('artistBio').value.trim(),
        instagram: document.getElementById('artistInstagram').value.trim(),
        avatar_url: document.getElementById('artistAvatarUrl').value.trim(),
        sort_order: parseInt(document.getElementById('artistSortOrder').value) || 0
      };

      try {
        const res = await fetch('/api/admin/artists', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (res.ok && data.success) {
          adminToast(`Artist "${payload.name}" added`, 'success');
          form.reset();
          setTimeout(() => window.location.reload(), 1000);
        } else {
          adminToast(data.detail || 'Failed to add artist', 'error');
        }
      } catch (err) {
        adminToast('Error adding artist', 'error');
      }
    });
  }
}

window.deleteArtist = async function(id, name) {
  if (!confirm(`Remove artist "${name}" from studio roster?`)) return;

  try {
    const res = await fetch(`/api/admin/artists/${id}`, { method: 'DELETE' });
    if (res.ok) {
      adminToast(`Artist removed`, 'success');
      setTimeout(() => window.location.reload(), 800);
    }
  } catch (err) {
    adminToast('Failed to delete artist', 'error');
  }
};

// ==========================================
// Settings Management
// ==========================================
function initSettingsManagement() {
  const settingsForm = document.getElementById('studioSettingsForm');
  const passwordForm = document.getElementById('changePasswordForm');

  if (settingsForm) {
    settingsForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const inputs = settingsForm.querySelectorAll('[name]');
      const settings = {};
      inputs.forEach(input => {
        settings[input.name] = input.value;
      });

      try {
        const res = await fetch('/api/admin/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ settings })
        });
        if (res.ok) {
          adminToast('Studio settings saved successfully', 'success');
        } else {
          adminToast('Failed to save settings', 'error');
        }
      } catch (err) {
        adminToast('Error saving settings', 'error');
      }
    });
  }

  if (passwordForm) {
    passwordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const oldPassword = document.getElementById('oldPassword').value;
      const newPassword = document.getElementById('newPassword').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      if (newPassword !== confirmPassword) {
        adminToast('New passwords do not match', 'error');
        return;
      }

      const body = new URLSearchParams();
      body.append('old_password', oldPassword);
      body.append('new_password', newPassword);

      try {
        const res = await fetch('/api/admin/change-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body
        });
        const data = await res.json();
        if (res.ok && data.success) {
          adminToast('Password changed successfully!', 'success');
          passwordForm.reset();
        } else {
          adminToast(data.detail || 'Failed to change password', 'error');
        }
      } catch (err) {
        adminToast('Error updating password', 'error');
      }
    });
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
