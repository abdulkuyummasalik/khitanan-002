/* ==============================================
   animations.js — Intersection Observer
   Trigger animasi saat elemen masuk viewport
   ============================================== */

(function initAnimations() {

    /* Semua selector yang perlu diobserve */
    const ANIM_SELECTORS = [
        '.anim-card',
        '.anim-title',
        '.anim-photo',
        '.anim-fade',
        '.anim-left',
        '.anim-right',
        '.anim-pop',
        '.anim-scale',
        '.anim',
    ].join(',');

    /* ── Observer untuk card (threshold lebih rendah = muncul lebih awal) ── */
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-in');
                cardObserver.unobserve(entry.target); /* animasi hanya sekali */
            }
        });
    }, {
        threshold: 0.08,       /* card mulai animasi saat 8% terlihat */
        rootMargin: '0px 0px -40px 0px'
    });

    /* ── Observer untuk elemen dalam card (threshold lebih tinggi) ── */
    const elemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-in');
                elemObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    });

    /* ── Assign observer ke tiap elemen ── */
    function observeAll() {
        document.querySelectorAll(ANIM_SELECTORS).forEach(el => {
            if (el.classList.contains('anim-card')) {
                cardObserver.observe(el);
            } else {
                elemObserver.observe(el);
            }
        });
    }

    /* ── Jalankan setelah semua section di-inject loader.js ── */
    document.addEventListener('sectionsLoaded', () => {
        /* Sedikit delay agar DOM painting selesai */
        requestAnimationFrame(() => {
            requestAnimationFrame(observeAll);
        });
    });

    /* Fallback: jika sectionsLoaded tidak terpanggil */
    if (document.readyState === 'complete') {
        requestAnimationFrame(() => requestAnimationFrame(observeAll));
    } else {
        window.addEventListener('load', () => {
            requestAnimationFrame(() => requestAnimationFrame(observeAll));
        });
    }

    /* ── Animasi khusus: ucapan baru yang dikirim juga dapat animasi ── */
    window.animateNewUcapan = function(el) {
        el.classList.add('anim-left');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => el.classList.add('anim-in'));
        });
    };

})();
