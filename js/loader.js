/* ==============================================
   loader.js — fetch & inject section HTML files
   UI Controls (nav, floating, audio) sudah ada
   langsung di index.html — tidak perlu di-inject.
   ============================================== */

(async function loadSections() {
    const sections = [
        'sections/cover.html',
        'sections/section1.html',
        'sections/section2.html',
        'sections/section3.html',
        'sections/section4.html',
        'sections/section5.html',
        'sections/section6.html',
        'sections/section7.html',
        'sections/section8.html',
    ];

    // Buat wrapper #app tepat sebelum tag <script> ini
    const app = document.createElement('div');
    app.id = 'app';
    document.currentScript.before(app);

    for (const path of sections) {
        try {
            const res  = await fetch(path);
            const html = await res.text();
            app.insertAdjacentHTML('beforeend', html);
        } catch (e) {
            console.error(`Gagal memuat ${path}:`, e);
        }
    }

    // Beritahu script lain bahwa semua section sudah siap
    document.dispatchEvent(new Event('sectionsLoaded'));
})();
