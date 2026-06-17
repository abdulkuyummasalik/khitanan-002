/* ==============================================
   main.js — Countdown, Guest Name, Calendar,
             Ucapan, Copy, Toast
   ============================================== */

/* ──────────────────────────────────────────────
   GUEST NAME — baca ?guest=NamaTamu dari URL
   Dipanggil segera (sebelum sectionsLoaded) agar
   cover sudah menampilkan nama yang benar.
   ────────────────────────────────────────────── */
(function initGuestName() {
    const raw   = new URLSearchParams(window.location.search).get('guest') || '';
    // decode URI component, batasi 60 karakter, fallback ke default
    const guest = raw.trim().slice(0, 60) || 'Tamu Undangan';

    /* simpan di window agar bisa dipakai saat sectionsLoaded */
    window.GUEST_NAME = guest;

    /* cover sudah ada di DOM (langsung di index.html via sections/cover.html
       yang di-inject loader.js — tapi cover.html di-inject async.
       Kita set via MutationObserver agar aman apapun timing-nya. */
    function setGuestInCover() {
        const el = document.getElementById('cv-tamu');
        if (el) el.textContent = guest;
    }

    // Coba langsung dulu
    setGuestInCover();

    // Fallback: tunggu cover di-inject loader
    if (!document.getElementById('cv-tamu')) {
        const obs = new MutationObserver(() => {
            if (document.getElementById('cv-tamu')) {
                setGuestInCover();
                obs.disconnect();
            }
        });
        obs.observe(document.body, { childList: true, subtree: true });
    }
})();

/* ──────────────────────────────────────────────
   INIT — setelah semua section di-inject loader
   ────────────────────────────────────────────── */
document.addEventListener('sectionsLoaded', function () {

    /* ── Tampilkan nama tamu di section 1 ── */
    const subtitleEl = document.querySelector('#app .subtitle');
    if (subtitleEl && window.GUEST_NAME !== 'Tamu Undangan') {
        subtitleEl.textContent = window.GUEST_NAME;
    }

    /* ── Countdown ── */
    const targetDate = getCountdownTarget();

    function updateCountdown() {
        const diff = Math.max(targetDate - Date.now(), 0);
        const pad  = n => String(n).padStart(2, '0');
        const d = document.getElementById('d');
        const h = document.getElementById('h');
        const m = document.getElementById('m');
        const s = document.getElementById('s');
        if (d) d.textContent = pad(Math.floor(diff / 86400000));
        if (h) h.textContent = pad(Math.floor((diff % 86400000) / 3600000));
        if (m) m.textContent = pad(Math.floor((diff % 3600000) / 60000));
        if (s) s.textContent = pad(Math.floor((diff % 60000) / 1000));
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});

/* ──────────────────────────────────────────────
   BUKA UNDANGAN — tutup cover, aktifkan UI,
   lalu mulai auto-scroll otomatis
   ────────────────────────────────────────────── */
function bukaUndangan() {
    const cover = document.getElementById('cover-overlay');
    if (!cover) return;

    /* aktifkan bottom nav + floating sidebar */
    document.body.classList.remove('cover-active');

    cover.classList.add('closing');
    cover.addEventListener('animationend', () => {
        cover.remove();

        /* beritahu ui-controls: musik auto-play */
        document.dispatchEvent(new Event('invitationOpened'));

        /* mulai auto-scroll setelah animasi cover selesai
           delay sesuai config */
        setTimeout(() => {
            if (typeof startAutoScroll === 'function') startAutoScroll();
        }, INVITATION_DATA.ui.autoscroll_delay_after_open);

    }, { once: true });
}

/* ──────────────────────────────────────────────
   GOOGLE CALENDAR
   ────────────────────────────────────────────── */
function addToCalendar() {
    const dt = getEventDatetime();
    const url = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
        + '&text=' + encodeURIComponent(INVITATION_DATA.event.title)
        + '&dates=' + dt.google_calendar_start + '/' + dt.google_calendar_end
        + '&details=Acara+' + encodeURIComponent(INVITATION_DATA.event.title)
        + '&location=' + encodeURIComponent(INVITATION_DATA.event.location.name);
    window.open(url, '_blank');
}

/* ──────────────────────────────────────────────
   KIRIM UCAPAN
   ────────────────────────────────────────────── */
function kirimUcapan() {
    const nama  = document.getElementById('nama-input').value.trim();
    const pesan = document.getElementById('pesan-input').value.trim();

    if (!nama || !pesan) {
        showToast(INVITATION_DATA.text.ucapan_error);
        return;
    }

    const item = document.createElement('div');
    item.className = 'ucapan-item';
    item.innerHTML = `<p class="u-name">${esc(nama)}</p><p class="u-msg">${esc(pesan)}</p>`;
    document.getElementById('ucapan-list').prepend(item);
    if (window.animateNewUcapan) window.animateNewUcapan(item);

    document.getElementById('nama-input').value  = '';
    document.getElementById('pesan-input').value = '';
    showToast(INVITATION_DATA.text.ucapan_success);
}

/* ──────────────────────────────────────────────
   COPY REKENING
   ────────────────────────────────────────────── */
function copyRek(num, btn) {
    const orig = btn.innerHTML;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(num).then(() => {
            showToast('Nomor berhasil disalin!');
            btn.textContent = '✓ Tersalin';
            setTimeout(() => { btn.innerHTML = orig; }, 2000);
        });
    } else {
        showToast('Nomor: ' + num);
    }
}

/* ──────────────────────────────────────────────
   TOAST
   ────────────────────────────────────────────── */
function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), INVITATION_DATA.ui.toast_duration);
}

/* ──────────────────────────────────────────────
   ESCAPE HTML (XSS guard)
   ────────────────────────────────────────────── */
function esc(s) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
