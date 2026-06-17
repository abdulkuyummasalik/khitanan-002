/* ==============================================
   ui-controls.js
   Bottom Nav  |  Floating Sidebar
   Auto Scroll |  Music Player  |  Progress Bar
   ============================================== */

/* ──────────────────────────────────────────────
   STATE
   ────────────────────────────────────────────── */
let autoScrollTimer    = null;
let autoScrollActive   = false;
const AUTO_SCROLL_SPEED = 1.2;   // px per frame (tuning: lebih kecil = lebih lambat)

let musicPlaying = false;
const music = () => document.getElementById('bg-music');

/* ID section cards — cocokkan dengan id pada tiap .card */
const SECTION_IDS = [
    'section-1', 'section-2', 'section-3',
    'section-4', 'section-5', 'section-6',
];

/* ──────────────────────────────────────────────
   INIT — jalankan setelah sectionsLoaded
   ────────────────────────────────────────────── */
document.addEventListener('sectionsLoaded', () => {
    assignCardIds();
    initScrollProgress();
    initBottomNavHighlight();
});

/* Berikan id ke tiap .card sesuai urutan */
function assignCardIds() {
    document.querySelectorAll('#app .card').forEach((card, i) => {
        card.id = `section-${i + 1}`;
    });
}

/* ──────────────────────────────────────────────
   BOTTOM NAV — highlight saat section aktif
   ────────────────────────────────────────────── */
function initBottomNavHighlight() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                document.querySelectorAll('.bnav-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.section === id);
                });
            }
        });
    }, { threshold: 0.45 });

    SECTION_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
}

/* Navigasi ke section tertentu */
function navTo(sectionId, btn) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    /* stop auto-scroll saat user navigasi manual */
    if (autoScrollActive) stopAutoScroll();

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    /* update active state langsung */
    document.querySelectorAll('.bnav-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

/* ──────────────────────────────────────────────
   SCROLL PROGRESS BAR
   ────────────────────────────────────────────── */
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress-bar');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const scrollTop  = window.scrollY;
        const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
        const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width  = pct.toFixed(1) + '%';
    }, { passive: true });
}

/* ──────────────────────────────────────────────
   SCROLL BUTTONS
   ────────────────────────────────────────────── */
function smoothScrollTop() {
    if (autoScrollActive) stopAutoScroll();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function smoothScrollBot() {
    if (autoScrollActive) stopAutoScroll();
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
}

/* ──────────────────────────────────────────────
   AUTO SCROLL
   ────────────────────────────────────────────── */
function toggleAutoScroll() {
    autoScrollActive ? stopAutoScroll() : startAutoScroll();
}

function startAutoScroll() {
    autoScrollActive = true;
    const btn = document.getElementById('btn-autoscroll');
    if (btn) btn.classList.add('scrolling');
    btn && (btn.setAttribute('data-tip', 'Stop scroll'));

    let lastTime = null;

    function step(timestamp) {
        if (!autoScrollActive) return;

        if (lastTime !== null) {
            const delta = timestamp - lastTime;
            window.scrollBy(0, AUTO_SCROLL_SPEED * (delta / 16.67));
        }
        lastTime = timestamp;

        /* stop otomatis di ujung bawah */
        const atBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 2;
        if (atBottom) {
            stopAutoScroll();
            return;
        }

        autoScrollTimer = requestAnimationFrame(step);
    }

    autoScrollTimer = requestAnimationFrame(step);

    /* pause saat user scroll manual */
    window.addEventListener('wheel',     pauseAutoScroll, { passive: true, once: false });
    window.addEventListener('touchmove', pauseAutoScroll, { passive: true, once: false });
}

function pauseAutoScroll() {
    if (!autoScrollActive) return;
    stopAutoScroll();
}

function stopAutoScroll() {
    autoScrollActive = false;
    if (autoScrollTimer) cancelAnimationFrame(autoScrollTimer);
    autoScrollTimer = null;

    const btn = document.getElementById('btn-autoscroll');
    if (btn) {
        btn.classList.remove('scrolling');
        btn.setAttribute('data-tip', 'Auto scroll');
    }

    window.removeEventListener('wheel',     pauseAutoScroll);
    window.removeEventListener('touchmove', pauseAutoScroll);
}

/* ──────────────────────────────────────────────
   MUSIC PLAYER
   ────────────────────────────────────────────── */
function toggleMusic() {
    const audio = music();
    const btn   = document.getElementById('btn-music');
    if (!audio || !btn) return;

    if (musicPlaying) {
        audio.pause();
        musicPlaying = false;
        btn.classList.remove('playing');
        btn.setAttribute('data-tip', 'Putar musik');
    } else {
        /* volume fade in */
        audio.volume = 0;
        audio.play().then(() => {
            musicPlaying = true;
            btn.classList.add('playing');
            btn.setAttribute('data-tip', 'Pause musik');
            fadeInAudio(audio, 0.55, 1200); /* target vol 0.55, durasi 1200ms */
        }).catch(() => {
            /* autoplay blocked — tunjukkan feedback */
            btn.setAttribute('data-tip', 'Klik lagi');
        });
    }
}

function fadeInAudio(audio, targetVol, duration) {
    const steps    = 40;
    const interval = duration / steps;
    const step     = targetVol / steps;
    let current    = 0;
    const timer    = setInterval(() => {
        current += step;
        if (current >= targetVol) {
            audio.volume = targetVol;
            clearInterval(timer);
        } else {
            audio.volume = current;
        }
    }, interval);
}

/* Auto-play saat cover dibuka (user gesture sudah ada) */
document.addEventListener('invitationOpened', () => {
    const audio = music();
    if (audio && !musicPlaying) {
        audio.volume = 0;
        audio.play().then(() => {
            musicPlaying = true;
            const btn = document.getElementById('btn-music');
            if (btn) {
                btn.classList.add('playing');
                btn.setAttribute('data-tip', 'Pause musik');
            }
            fadeInAudio(audio, 0.55, 1500);
        }).catch(() => {});
    }
});
