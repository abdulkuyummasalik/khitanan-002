/* ==============================================
   data.js — Centralized Data Configuration
   
   Edit data di file ini saja untuk mengubah
   seluruh konten undangan. Semua referensi
   data diambil dari objek ini.
   ============================================== */

const INVITATION_DATA = {
  /* ────────────────────────────────────────────
     EVENT DETAILS — Informasi Acara Utama
     ──────────────────────────────────────────── */
  event: {
    title: 'Walimatul Khitan',
    child_name: 'Muhammad Abidzar',
    date: '2026-06-24',           // Format: YYYY-MM-DD
    time_start: '08:00',           // Format: HH:MM (WIB)
    time_end: '14:00',             // Format: HH:MM (WIB)
    timezone: 'WIB',
    
    location: {
      name: 'Gedung Serba Guna At-Taqwa',
      address: 'Jl. Menteng Raya No. 45, Kelurahan Menteng, Kecamatan Menteng, Jakarta Pusat 10310',
      maps_query: 'Jl. Menteng Raya No. 45 Jakarta Pusat',
      note: 'Kami sangat berbahagia mengundang Anda untuk turut serta<br>dalam perayaan Walimatul Khitan putra kami.<br>Mohon hadir tepat waktu dan tetap menjaga protokol kesehatan.'
    }
  },

  /* ────────────────────────────────────────────
     PAYMENT METHODS — Data Hadiah & Amplop Digital
     ──────────────────────────────────────────── */
  payment: [
    {
      name: 'Bank BCA',
      type: 'bank',
      label: 'No. Rekening',
      number: '1234567890',
      display: '1234 5678 90',
      owner: 'Bapak Ahmad Ridho'
    },
    {
      name: 'Bank Mandiri',
      type: 'bank',
      label: 'No. Rekening',
      number: '9876543210',
      display: '9876 5432 10',
      owner: 'Bapak Ahmad Ridho'
    },
    {
      name: 'GoPay / OVO',
      type: 'phone',
      label: 'No. Handphone',
      number: '081234567890',
      display: '0812 3456 7890',
      owner: 'Ahmad Ridho'
    },
    {
      name: 'Dana',
      type: 'phone',
      label: 'No. Handphone',
      number: '085678901234',
      display: '0856 7890 1234',
      owner: 'Ahmad Ridho'
    }
  ],

  /* ────────────────────────────────────────────
     GREETINGS & WISHES — Data Ucapan Awal
     ──────────────────────────────────────────── */
  wishes: [
    {
      name: 'H. Ahmad Fauzi',
      message: 'Selamat ya, semoga ananda menjadi anak yang sholeh, berbakti kepada orang tua, dan sukses dunia akhirat. Aamiin.'
    },
    {
      name: 'Ibu Sari Dewi',
      message: 'Barokallah... semoga tumbuh jadi anak yang sehat, cerdas, dan berakhlak mulia.'
    },
    {
      name: 'Keluarga Besar Kampung Nusa Indah',
      message: 'Tabik pun ke Abah dan Emak, semoga Abidzar menjadi generasi qur\'an yang berkontribusi untuk umat. Aamiin.'
    },
    {
      name: 'Ustadzah Nurul Hidayah',
      message: 'Semoga dengan khitan ini menjadi awal dari perjalanan spiritual yang lebih dalam. Berkah untuk keluarga besar.'
    },
    {
      name: 'Bapak Hendra Gunawan',
      message: 'Alhamdulillah, semoga ini menjadi awal yang baik. Doa terbaik untuk pertumbuhan akhlak yang mulia.'
    },
    {
      name: 'Ibu Ratna Sari',
      message: 'Sehat selalu untuk Abidzar dan keluarga. Semoga menjadi pribadi yang bermanfaat bagi agama dan negeri. 💚'
    }
  ],

  /* ────────────────────────────────────────────
     TEXT CONTENT — Teks Statis di Berbagai Bagian
     ──────────────────────────────────────────── */
  text: {
    greeting: 'Sebagai wujud syukur atas berkah yang telah diberikan Allah SWT,<br>kami dengan sepenuh hati mengundang Bapak/Ibu/Saudara/i untuk<br>hadir dalam perayaan Walimatul Khitan putra kami.',
    closing_title: 'Terima Kasih',
    closing_note: 'Kehadiran dan doa Bapak/Ibu/Saudara/i adalah suatu kehormatan<br>dan berkah yang sangat berharga bagi kami.<br><br>Semoga acara ini menjadi kenangan indah dan berkah bagi semua pihak.',
    calendar_reminder: 'Atur Pengingat',
    ucapan_placeholder_name: 'Nama Anda',
    ucapan_placeholder_msg: 'Tuliskan ucapan dan doa terbaik Anda...',
    ucapan_button: 'Kirim Ucapan',
    ucapan_success: 'Ucapan Anda telah kami catat dengan sepenuh kasih sayang. Terima kasih! 💚',
    ucapan_error: 'Mohon isi nama dan ucapan terlebih dahulu.'
  },

  /* ────────────────────────────────────────────
     AUDIO — Background Music
     ──────────────────────────────────────────── */
  audio: {
    src: 'assets/music.mp3',
    loop: true,
    autoplay_on_open: true
  },

  /* ────────────────────────────────────────────
     UI/UX SETTINGS
     ──────────────────────────────────────────── */
  ui: {
    autoscroll_delay_after_open: 600,  // ms
    toast_duration: 2500,               // ms
    countdown_target: '2026-06-24'     // sama dengan event.date
  }
};

/* ────────────────────────────────────────────
   Helper Functions — Akses & Format Data
   ──────────────────────────────────────────── */

/**
 * Get countdown target date sebagai timestamp
 */
function getCountdownTarget() {
  return new Date(INVITATION_DATA.event.date + 'T00:00:00').getTime();
}

/**
 * Get full event datetime string untuk Google Calendar
 */
function getEventDatetime() {
  const date = INVITATION_DATA.event.date;  // YYYY-MM-DD
  const start = INVITATION_DATA.event.time_start; // HH:MM
  const end = INVITATION_DATA.event.time_end;     // HH:MM
  
  return {
    date_display: `${date}`,
    time_display: `${start} - ${end} ${INVITATION_DATA.event.timezone}`,
    google_calendar_start: `${date.replace(/-/g, '')}T${start.replace(':', '')}00Z`,
    google_calendar_end: `${date.replace(/-/g, '')}T${end.replace(':', '')}00Z`
  };
}

/**
 * Get payment method by index
 */
function getPaymentMethod(index) {
  return INVITATION_DATA.payment[index] || null;
}

/**
 * Get all wishes/ucapan
 */
function getAllWishes() {
  return INVITATION_DATA.wishes;
}

/**
 * Add new wish programmatically
 */
function addWish(name, message) {
  if (!name || !message) return false;
  INVITATION_DATA.wishes.unshift({ name, message });
  return true;
}
