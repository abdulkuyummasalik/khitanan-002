// RSVP & Ucapan Firebase Integration
// Wait untuk Firebase CDN ter-load

console.log("📝 RSVP Module Loading...");

let db = null;
let firebaseReady = false;
let globalSnapshot = null;

// Tunggu Firebase CDN siap
function initFirebase() {
    if (typeof firebase === 'undefined') {
        setTimeout(initFirebase, 100);
        return;
    }

    if (firebaseReady) return;

    try {
        firebase.initializeApp(window.FIREBASE_CONFIG);
        db = firebase.firestore();
        firebaseReady = true;
        console.log("✅ Firebase Connected!");
        
        // Mulai listen data
        db.collection("rsvp-002")
            .orderBy("timestamp", "desc")
            .limit(50)
            .onSnapshot((snapshot) => {
                globalSnapshot = snapshot;
                renderUcapan();
            }, (error) => {
                console.error("❌ Listener error:", error);
            });
            
    } catch (error) {
        console.error("Firebase init error:", error);
    }
}

function renderUcapan() {
    if (!globalSnapshot) return;
    
    const ucapanList = document.getElementById('ucapan-list');
    if (!ucapanList) return; // Belum ada di DOM, tunggu sectionsLoaded

    ucapanList.innerHTML = '';

    globalSnapshot.forEach((doc) => {
        const data = doc.data();
        const item = document.createElement('div');
        // Tambahkan anim-in agar elemen tidak invisible (opacity 0)
        item.className = 'wish-item anim-left anim-in';
        
        let statusClass = 'hadir';
        if (data.status === 'Ragu Ragu') statusClass = 'belum-pasti';
        if (data.status === 'Tidak Hadir') statusClass = 'tidak-hadir';
        
        item.innerHTML = `
            <p class="wish-name">
                <span class="wish-name-icon">✓</span>
                ${escapeHtml(data.nama || 'Anonymous')}
                <span class="wish-status ${statusClass}">${data.status}</span>
            </p>
            <p class="wish-message">${escapeHtml(data.ucapan || '')}</p>
        `;
        ucapanList.appendChild(item);
    });
}

/* Submit Ucapan + RSVP ke Firebase */
async function submitRSVP(status, nama, ucapan) {
    if (!db) return false;
    if (!status || !nama || !ucapan) return false;

    try {
        await db.collection("rsvp-002").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            nama: nama,
            status: status,
            ucapan: ucapan
        });
        return true;
    } catch (error) {
        console.error("❌ Submit error:", error);
        return false;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

window.submitRSVP = submitRSVP;

// Init
initFirebase();

// Render ulang saat sections loaded
document.addEventListener('sectionsLoaded', function () {
    renderUcapan();
});

