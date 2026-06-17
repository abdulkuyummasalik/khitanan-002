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
    
    const docs = [];
    globalSnapshot.forEach((doc) => docs.push(doc));
    
    // Render hanya 5 ucapan pertama
    const displayDocs = docs.slice(0, 5);
    
    displayDocs.forEach((doc, index) => {
        const data = doc.data();
        const item = document.createElement('div');
        // Tambahkan anim-in agar elemen tidak invisible (opacity 0)
        item.className = 'wish-item anim-left anim-in';
        item.style.animationDelay = `${index * 100}ms`;
        
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
    
    // Jika ada lebih dari 5 ucapan, tambahkan tombol "Lihat Semua"
    if (docs.length > 5) {
        const seeMoreBtn = document.createElement('button');
        seeMoreBtn.className = 'see-more-btn';
        seeMoreBtn.textContent = `Lihat Semua (${docs.length})`;
        seeMoreBtn.onclick = () => openModal(docs);
        ucapanList.appendChild(seeMoreBtn);
    }
}

function openModal(docs) {
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
    
    docs.forEach((doc, index) => {
        const data = doc.data();
        const item = document.createElement('div');
        item.className = 'wish-item';
        item.style.animationDelay = `${index * 50}ms`;
        
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

window.closeModal = function() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
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

