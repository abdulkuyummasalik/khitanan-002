# 📋 Panduan Konfigurasi Data Undangan v2 (Modern Design)

## Deskripsi

File **`js/data.js`** adalah **single source of truth** untuk semua data undangan. Cukup edit file ini saja dan semua konten di undangan akan terupdate otomatis.

---

## 🎯 Cara Menggunakan

### 1. **Buka file: `js/data.js`**

### 2. **Edit sesuai kebutuhan**

Setiap bagian di dalam `INVITATION_DATA` bisa diubah sesuai data sebenarnya:

```javascript
const INVITATION_DATA = {
  event: { ... },      // Tanggal, waktu, tempat acara
  payment: [ ... ],    // Rekening & Dana/GoPay
  wishes: [ ... ],     // Ucapan & doa awal
  text: { ... },       // Teks-teks statis
  audio: { ... },      // File musik
  ui: { ... }          // Pengaturan UI/UX
};
```

### 3. **Simpan file → Undangan terupdate otomatis!**

---

## 📝 Detail Setiap Section

### **1. EVENT — Informasi Acara Utama**

```javascript
event: {
  title: 'Walimatul Khitan',           // Nama acara
  child_name: 'Anak Kesayangan',       // Nama anak (opsional)
  date: '2026-06-24',                  // Format: YYYY-MM-DD
  time_start: '07:00',                 // Jam mulai (HH:MM)
  time_end: '13:00',                   // Jam selesai (HH:MM)
  timezone: 'WIB',                     // Zona waktu
  
  location: {
    name: 'Jakarta',                   // Nama lokasi (untuk Google Calendar)
    address: 'Alamat Belum Diatur',   // Alamat lengkap
    maps_query: 'Jakarta',             // Query untuk Google Maps
    note: 'Mohon untuk tetap mematuhi...'  // Catatan/protokol
  }
}
```

**Contoh perubahan:**
```javascript
event: {
  title: 'Walimatul Khitan',
  child_name: 'Muhammad Rizki Hakim',
  date: '2026-07-15',
  time_start: '08:00',
  time_end: '14:00',
  timezone: 'WIB',
  
  location: {
    name: 'Gedung Serbaguna Masjid Al-Ikhlas',
    address: 'Jl. Merdeka No. 42, Jakarta Pusat 12190',
    maps_query: 'Gedung Serbaguna Masjid Al-Ikhlas Jakarta',
    note: 'Mohon datang tepat waktu.<br>Tersedia parkir di area masjid.'
  }
}
```

---

### **2. PAYMENT — Data Hadiah & Rekening**

Array berisi daftar metode pembayaran:

```javascript
payment: [
  {
    name: 'Bank BCA',              // Nama bank/metode
    type: 'bank',                  // Tipe: 'bank' atau 'phone'
    label: 'No. Rekening',         // Label yang ditampilkan
    number: '1234567890',          // Nomor (untuk copy)
    display: '1234 5678 90',       // Format display (dengan spasi)
    owner: 'a.n. Bapak / Ibu ...'  // Atas nama
  },
  {
    name: 'Dana / GoPay',
    type: 'phone',
    label: 'No. Handphone',
    number: '081234567890',
    display: '0812 3456 7890',
    owner: 'a.n. Bapak / Ibu ...'
  }
]
```

**Menambah metode pembayaran baru:**
```javascript
payment: [
  { /* BCA */ },
  { /* Dana / GoPay */ },
  {
    name: 'OVO',
    type: 'phone',
    label: 'No. OVO',
    number: '081234567890',
    display: '0812 3456 7890',
    owner: 'a.n. Ahmad Fauzi'
  }
]
```

---

### **3. WISHES — Ucapan & Doa Awal**

Daftar ucapan yang muncul saat halaman dibuka:

```javascript
wishes: [
  {
    name: 'H. Ahmad Fauzi',
    message: 'Selamat ya, semoga ananda menjadi anak yang sholeh...'
  },
  {
    name: 'Ibu Sari Dewi',
    message: 'Barokallah... semoga tumbuh jadi anak yang sehat...'
  }
]
```

**Menambah ucapan:**
```javascript
wishes: [
  { name: 'H. Ahmad Fauzi', message: '...' },
  { name: 'Ibu Sari Dewi', message: '...' },
  {
    name: 'Dr. Husein Mansyur',
    message: 'Semoga menjadi generasi yang berkontribusi untuk bangsa dan agama.'
  }
]
```

---

### **4. TEXT — Teks-Teks Statis**

Semua pesan & placeholder:

```javascript
text: {
  greeting: 'Bagi yang ingin memberikan hadiah,<br>dapat melalui transfer ke rekening berikut:',
  closing_title: 'Terima Kasih',
  closing_note: 'Kehadiran Bapak / Ibu / Saudara/i adalah...',
  
  calendar_reminder: 'Atur Pengingat',
  ucapan_placeholder_name: 'Nama Anda',
  ucapan_placeholder_msg: 'Tuliskan ucapan dan doa terbaik Anda...',
  ucapan_button: 'Kirim Ucapan',
  ucapan_success: 'Ucapan berhasil dikirim!',
  ucapan_error: 'Mohon isi nama dan ucapan terlebih dahulu.'
}
```

**Update closing message:**
```javascript
closing_note: 'Terima kasih atas kehadiran dan doa Anda.<br>Semoga Allah memberikan berkah untuk kami semua.'
```

---

### **5. AUDIO — Musik Latar**

```javascript
audio: {
  src: 'assets/music.mp3',          // File musik (relative path)
  loop: true,                        // Putar berulang
  autoplay_on_open: true             // Auto-play saat undangan dibuka
}
```

**Ganti musik:**
```javascript
audio: {
  src: 'assets/musik-islami.mp3',
  loop: true,
  autoplay_on_open: true
}
```

---

### **6. UI — Pengaturan UI/UX**

```javascript
ui: {
  autoscroll_delay_after_open: 600,  // Delay auto-scroll (ms) — 600ms default
  toast_duration: 2500,               // Durasi toast notification (ms)
  countdown_target: '2026-06-24'     // Target countdown (harus sama dengan event.date)
}
```

---

## 🔧 Helper Functions

Di dalam `data.js` sudah ada beberapa helper functions:

### **getCountdownTarget()**
Mengembalikan timestamp countdown target.
```javascript
const target = getCountdownTarget();  // untuk digunakan di main.js
```

### **getEventDatetime()**
Mengembalikan event datetime dalam berbagai format.
```javascript
const dt = getEventDatetime();
// Returns: { date_display, time_display, google_calendar_start, google_calendar_end }
```

### **getPaymentMethod(index)**
Mengambil metode pembayaran berdasarkan index.
```javascript
const bca = getPaymentMethod(0);
```

### **getAllWishes()**
Mengambil semua ucapan.
```javascript
const wishes = getAllWishes();
```

### **addWish(name, message)**
Menambah ucapan baru (programmatically).
```javascript
addWish('Nama Tamu', 'Pesan terbaik...');
```

---

## 📱 Cara Kerja Otomatis

1. **`data.js` di-load pertama kali** → Semua data tersimpan di `INVITATION_DATA`

2. **`loader.js`** → Inject semua section HTML ke dalam `#app`

3. **`main.js`** → Handle countdown, ucapan, calendar, dll menggunakan data dari `INVITATION_DATA`

4. **`data-renderer.js`** → Mendengarkan event `sectionsLoaded`, lalu otomatis:
   - Update section 3 (Acara) dengan tanggal, tempat, catatan
   - Update section 5 (Ucapan) dengan placeholder, ucapan awal
   - Update section 6 (Hadiah) dengan metode pembayaran

5. **Hasilnya:** Undangan terupdate otomatis sesuai data di `data.js` ✅

---

## 🚀 Quick Start Example

### **Skenario: Ubah tanggal & tempat acara**

1. Buka `js/data.js`
2. Cari section `event`
3. Ubah:
   ```javascript
   date: '2026-07-15',                          // dari 2026-06-24
   time_start: '08:00',                         // dari 07:00
   time_end: '14:00',                           // dari 13:00
   
   location: {
     name: 'Masjid Al-Ikhlas',                  // dari Jakarta
     address: 'Jl. Merdeka No. 42, Jakarta',    // dari "Alamat Belum Diatur"
     maps_query: 'Masjid Al-Ikhlas Jakarta',
     note: 'Tersedia parkir luas dan tempat wudhu.'
   }
   ```
4. **Simpan** → Selesai! Undangan terupdate otomatis ✓

---

## ✅ Checklist Sebelum Deploy

- [ ] Event title & tanggal sudah benar
- [ ] Waktu mulai & selesai sudah sesuai
- [ ] Lokasi & alamat sudah diisi
- [ ] Rekening & nomor Dana/GoPay sudah benar
- [ ] Nama atas nama (owner) sudah sesuai
- [ ] Ucapan awal sudah ditambahkan
- [ ] Musik sudah benar (atau dihapus `autoplay_on_open: false`)
- [ ] Teks closing & catatan sudah sesuai
- [ ] Desain modern v2 sudah terlihat dengan baik

---

## 💡 Tips & Tricks

### **Hapus metode pembayaran tertentu:**
```javascript
payment: [
  { /* hanya BCA */ }
]
// atau biarkan array kosong jika ingin custom HTML
```

### **Ubah format nomor rekening:**
```javascript
// Dari: 1234 5678 90
// Menjadi: 1234-5678-90
display: '1234-5678-90'

// Atau format lain sesuai kebutuhan
```

### **Tambah HTML di closing message:**
```javascript
closing_note: 'Terima kasih.<br><strong>Wassalamualaikum Wr Wb</strong>'
// HTML diperbolehkan (auto-escaped untuk XSS safety)
```

### **Disable auto-scroll:**
```javascript
ui: {
  autoscroll_delay_after_open: 0  // atau ubah ke angka besar
}
```

---

## 🐛 Troubleshooting

### **Data tidak terupdate?**
- [ ] Pastikan `data.js` sudah di-load pertama kali di `index.html`
- [ ] Buka browser DevTools → Console, cek error
- [ ] Reload halaman (Ctrl+F5 / Cmd+Shift+R) untuk clear cache

### **Countdown tidak jalan?**
- Pastikan `ui.countdown_target` sama dengan `event.date`

### **Musik tidak play?**
- Pastikan file `assets/music.mp3` exists
- Check browser console untuk error

### **Toast notification hilang terlalu cepat?**
- Ubah `ui.toast_duration` ke nilai lebih besar (ms)

---

## 🎨 Modern Design v2 Features

Versi 002 punya fitur desain modern:

✨ **Gradient Color Palette**
- Primary: `#667eea` (Purple Blue)
- Secondary: `#764ba2` (Purple)
- Accent: `#f5576c` (Red Pink)

✨ **Glassmorphism Effect**
- Cards punya backdrop blur effect
- Semi-transparent backgrounds
- Modern transparent borders

✨ **Modern Typography**
- Playfair Display untuk headings (elegant)
- DM Sans untuk body text (modern clean)
- Caveat untuk cursive text (handwritten feel)

✨ **Smooth Animations**
- Card entrance dengan staggered delays
- Hover effects smooth dengan transforms
- Progress bar animated
- Floating buttons dengan glow effects

✨ **Modern Micro-interactions**
- Button shine effect on hover
- Staggered list animations
- Smooth transitions everywhere
- Glassmorphic UI elements

---

## 📞 Support

Jika ada pertanyaan atau butuh custom logic:
1. Cek file `js/main.js` untuk melihat implementasi
2. Cek file `js/data-renderer.js` untuk rendering logic
3. Modifikasi sesuai kebutuhan (kedua file ini sudah well-commented)
4. Lihat `TEST_DATA.md` untuk testing & validation

Selamat menggunakan undangan modern v2! 🎉✨
