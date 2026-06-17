/* ==============================================
   data-renderer.js — Dynamic Content Renderer
   
   Mengisi konten HTML dynamically dari INVITATION_DATA
   Dipanggil setelah sections di-load oleh loader.js
   ============================================== */

document.addEventListener('sectionsLoaded', function() {
  renderCover();
  renderSection1();
  renderSection2();
  renderSection3();
  renderSection5();
  renderSection6();
});

/* ────────────────────────────────────────────
   RENDER SECTION 3 — ACARA / JADWAL
   ──────────────────────────────────────────── */
function renderSection3() {
  const event = INVITATION_DATA.event;
  const dt = getEventDatetime();
  
  // Update waktu card
  const timeMainLine = document.getElementById('event-date');
  if (timeMainLine) {
    timeMainLine.textContent = formatDateIndonesian(event.date);
  }
  
  // Update waktu jam
  const timeJamLine = document.querySelector('#app .main-line');
  if (timeJamLine) {
    timeJamLine.textContent = dt.time_display;
  }
  
  // Update tempat card
  const locNameLine = document.getElementById('location-name');
  if (locNameLine) {
    locNameLine.textContent = event.location.name;
  }
  
  const locAddrLine = document.querySelector('#app .addr-line');
  if (locAddrLine) {
    locAddrLine.textContent = event.location.address;
  }
  
  // Update maps embed
  const mapIframe = document.querySelector('#app .map-embed iframe');
  if (mapIframe) {
    const query = encodeURIComponent(event.location.maps_query);
    mapIframe.src = `https://www.google.com/maps?q=${query}&output=embed`;
  }
  
  // Update catatan
  const noteLine = document.querySelector('#app .note-line');
  if (noteLine) {
    noteLine.innerHTML = event.location.note;
  }
  
  // Update maps button
  const mapsBtn = document.querySelector('#app .maps-btn');
  if (mapsBtn) {
    mapsBtn.onclick = () => window.open(`https://maps.google.com/?q=${encodeURIComponent(event.location.maps_query)}`, '_blank');
  }
}

/* ────────────────────────────────────────────
   RENDER SECTION 5 — UCAPAN & DOA (FIREBASE ONLY)
   ──────────────────────────────────────────── */
function renderSection5() {
  const text = INVITATION_DATA.text;
  
  // Update placeholder inputs
  const namaInput = document.getElementById('nama-input');
  const pesanInput = document.getElementById('pesan-input');
  
  if (namaInput) namaInput.placeholder = text.ucapan_placeholder_name;
  if (pesanInput) pesanInput.placeholder = text.ucapan_placeholder_msg;
  
  // Render initial wishes from data.js
  const ucapanList = document.getElementById('ucapan-list');
  if (ucapanList) {
    ucapanList.innerHTML = '';
    
    const wishes = INVITATION_DATA.wishes;
    const displayWishes = wishes.slice(0, 5);
    
    displayWishes.forEach((wish, index) => {
      const item = document.createElement('div');
      item.className = 'wish-item anim-left anim-in';
      item.style.animationDelay = `${index * 100}ms`;
      
      item.innerHTML = `
        <p class="wish-name">
          <span class="wish-name-icon">✓</span>
          ${esc(wish.name)}
          <span class="wish-status hadir">Hadir</span>
        </p>
        <p class="wish-message">${esc(wish.message)}</p>
      `;
      ucapanList.appendChild(item);
    });
    
    // Jika ada lebih dari 5 ucapan, tambahkan tombol "Lihat Semua"
    if (wishes.length > 5) {
      const seeMoreBtn = document.createElement('button');
      seeMoreBtn.className = 'see-more-btn';
      seeMoreBtn.textContent = `Lihat Semua (${wishes.length})`;
      seeMoreBtn.onclick = () => openInitialModal(wishes);
      ucapanList.appendChild(seeMoreBtn);
    }
  }
}

function openInitialModal(wishes) {
    // Buat modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    modalHeader.innerHTML = `
        <h3>Semua Ucapan</h3>
        <button class="modal-close" onclick="closeModal()">&times;</button>
    `;
    
    const modalBody = document.createElement('div');
    modalBody.className = 'modal-body';
    
    wishes.forEach((wish, index) => {
        const item = document.createElement('div');
        item.className = 'wish-item';
        item.style.animationDelay = `${index * 50}ms`;
        
        item.innerHTML = `
            <p class="wish-name">
                <span class="wish-name-icon">✓</span>
                ${esc(wish.name)}
                <span class="wish-status hadir">Hadir</span>
            </p>
            <p class="wish-message">${esc(wish.message)}</p>
        `;
        modalBody.appendChild(item);
    });
    
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animasi masuk
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

/* ────────────────────────────────────────────
   RENDER SECTION 6 — HADIAH / AMPLOP DIGITAL
   ──────────────────────────────────────────── */
function renderSection6() {
  const text = INVITATION_DATA.text;
  const payments = INVITATION_DATA.payment;
  
  // Update greeting text
  const greetingPara = document.getElementById('s6-greeting');
  if (greetingPara) {
    greetingPara.innerHTML = text.greeting;
  }
  
  // Update closing title & note
  const closingTitle = document.querySelector('.closing-cursive');
  const closingNote = document.querySelector('.closing-note');
  
  if (closingTitle) {
    closingTitle.textContent = text.closing_title;
  }
  if (closingNote) {
    closingNote.innerHTML = text.closing_note;
  }
  
  // Render hadiah cards dari INVITATION_DATA.payment
  const section6Inner = document.querySelector('section:nth-child(6) .section-inner') || 
                       document.querySelector('[id*="section-6"] .section-inner') ||
                       document.querySelector('.card:has(+ .gold-dot-row) .section-inner');
  
  if (section6Inner) {
    // Hapus hadiah-card yang lama (yang hardcoded)
    const oldCards = section6Inner.querySelectorAll('.payment-item');
    oldCards.forEach(card => card.remove());
    
    // Cari posisi untuk insert (setelah greeting paragraph)
    const greetingEl = section6Inner.querySelector('#s6-greeting') || 
                      section6Inner.querySelector('.paragraph');
    
    if (greetingEl && payments.length > 0) {
      // Render hadiah card dari data
      payments.forEach((payment, idx) => {
        const card = document.createElement('div');
        card.className = 'payment-item anim-fade';
        card.style.animationDelay = `${300 + idx * 100}ms`;
        card.innerHTML = `
          <div class="payment-header">
            <div class="payment-icon">💳</div>
            <div class="payment-name">${esc(payment.name)}</div>
          </div>
          <div class="payment-content">
            <div class="payment-label">${esc(payment.label)}</div>
            <div class="payment-number-wrapper">
              <div class="payment-number">${esc(payment.display)}</div>
              <button class="copy-btn" onclick="copyRek('${payment.number}', this)" title="Salin nomor">📋</button>
            </div>
            <div class="payment-owner">a.n. ${esc(payment.owner)}</div>
          </div>
        `;
        greetingEl.parentNode.insertBefore(card, greetingEl.nextSibling || null);
      });
    }
  }
}

/* ────────────────────────────────────────────
   RENDER COVER — Halaman Pembuka
   ──────────────────────────────────────────── */
function renderCover() {
  const event = INVITATION_DATA.event;
  
  // Update event label
  const eventLabel = document.getElementById('cv-event-label');
  if (eventLabel) {
    eventLabel.textContent = event.title;
  }
  
  // Update child name
  const nameCursive = document.getElementById('cv-name-cursive');
  if (nameCursive) {
    nameCursive.textContent = event.child_name || 'Belum Diatur';
  }
}

/* ────────────────────────────────────────────
   RENDER SECTION 1 — SAMPUL
   ──────────────────────────────────────────── */
function renderSection1() {
  const event = INVITATION_DATA.event;
  const dt = getEventDatetime();
  
  // Header label
  const headerLabel = document.getElementById('s1-header-label');
  if (headerLabel) {
    headerLabel.textContent = 'Undangan ' + event.title;
  }
  
  // Title
  const title = document.getElementById('s1-title');
  if (title) {
    title.textContent = event.title;
  }
  
  // Subtitle (dari child_name atau fallback)
  const subtitle = document.getElementById('s1-subtitle');
  if (subtitle) {
    subtitle.textContent = event.child_name || 'Belum Diatur';
  }
  
  // Date display — convert YYYY-MM-DD ke format Hari, DD Bulan YYYY
  const dateDisplay = document.getElementById('s1-date');
  if (dateDisplay) {
    dateDisplay.textContent = formatDateIndonesian(event.date);
  }
}

/* ────────────────────────────────────────────
   RENDER SECTION 2 — PUTRA KAMI
   ──────────────────────────────────────────── */
function renderSection2() {
  const event = INVITATION_DATA.event;
  
  // Child name (nama cursive)
  const nameCursive = document.getElementById('s2-name');
  if (nameCursive) {
    nameCursive.textContent = event.child_name || 'Belum Diatur';
  }
  
  // Subtitle (tanggal lahir atau info tambahan)
  const subtitle = document.getElementById('s2-subtitle');
  if (subtitle) {
    // Bisa diisi dengan umur, tanggal lahir, atau teks lain
    subtitle.textContent = 'Anak Kesayangan Kami';
  }
}

/* ────────────────────────────────────────────
   HELPER: Escape HTML (copy dari main.js)
   ──────────────────────────────────────────── */
function esc(s) {
  if (typeof s !== 'string') return '';
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ────────────────────────────────────────────
   HELPER: Format tanggal YYYY-MM-DD ke Indonesian
   Contoh: 2026-06-24 → Rabu, 24 Juni 2026
   ──────────────────────────────────────────── */
function formatDateIndonesian(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  
  const dayName = days[date.getDay()];
  const dayNum = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${dayName}, ${dayNum} ${monthName} ${year}`;
}
