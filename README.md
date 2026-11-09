# 🏠 Landing Page Kost Modern (React + Vite + Tailwind CSS)

Landing page profesional dan modern untuk bisnis kos-kosan yang siap di-deploy langsung ke **Vercel**. Dibuat dengan stack **React (Vite)** dan **Tailwind CSS**, dioptimalkan untuk kecepatan, SEO, dan konversi calon penghuni via WhatsApp.

---

## 💡 Jawaban: Apakah Butuh Database atau Cukup JSON?

> **Kesimpulan:** Untuk landing page kos-kosan, **CUKUP MENGGUNAKAN FILE JSON (Tidak butuh database)**.

### Mengapa Cukup Pakai JSON?
1. **0 Biaya & Bebas Maintenance:** Anda tidak perlu menyewa/setup database server (Supabase, MySQL, MongoDB, Firebase).
2. **Kecepatan Maksimal (Instant Loading):** Di Vercel, website disajikan sebagai file statis CDN global tanpa delay koneksi database (*zero cold starts*).
3. **Sangat Mudah Dikelola:** Seluruh data kos (nama, no. WhatsApp, harga, tipe kamar, fasilitas, foto, peta, FAQ, testimoni) berada di satu file terpusat: `src/data/kosData.json`.
4. **Alur Bisnis Sesuai Kebiasaan Indonesia:** Calon penyewa kos di Indonesia 95% lebih memilih bertanya dan survey langsung melalui **WhatsApp**. Tombol WhatsApp di website ini sudah otomatis menyertakan template teks sesuai kamar yang dipilih.

*Kapan baru butuh database?*
Hanya jika Anda membutuhkan fitur transaksi rumit seperti payment gateway otomatis (midtrans), booking kamar dengan sistem kalender ketersediaan real-time otomatis, atau panel admin CMS untuk staf non-teknis. Untuk kebutuhan promosi dan akuisisi penyewa, JSON adalah solusi paling efisien dan profesional.

---

## ✨ Fitur-Fitur Utama Landing Page

- **Hero Section Interaktif:** Menampilkan status ketersediaan kamar ("Sisa 3 Kamar"), rating, harga mulai dari, dan CTA langsung.
- **Katalog Tipe Kamar:** Filter ketersediaan, badge popularitas, info dimensi, harga promo, daftar fasilitas, modal detail foto, dan tombol **"Pesan Kamar Ini via WhatsApp"** dengan pesan otomatis.
- **Modal Detail Kamar:** Popup interaktif dengan galeri foto, rincian fasilitas lengkap, dan biaya tambahan (listrik, air, sampah).
- **Fasilitas Terkategori:** Tab Fasilitas Kamar, Fasilitas Bersama (Dapur, Mesin Cuci, Kulkas), dan Keamanan (CCTV 24 Jam, Smart Lock).
- **Galeri Foto + Lightbox:** Dokumentasi foto kamar dan area bersama dengan filter kategori dan preview pembesar layar penuh (*lightbox*).
- **Lokasi & Google Maps:** Integrasi peta interaktif Google Maps dan estimasi waktu tempuh ke kampus, stasiun KRL/MRT, minimarket, dan kuliner.
- **Tata Tertib & Aturan Kos:** Transparansi aturan demi kenyamanan bersama.
- **Cerita Penghuni:** Ulasan nyata pengalaman anak kos yang pernah tinggal.
- **FAQ (Tanya Jawab Accordion):** Pertanyaan umum seputar deposit, listrik, booking, tamu menginap, dll.
- **Floating WhatsApp Quick Chat:** Tombol mengambang di pojok kanan bawah dengan notifikasi live untuk memudahkan calon penghuni langsung menghubungi Anda.
- **Panel Admin Visual Khusus (`/admin`):** Dilengkapi dashboard pengelola untuk mengedit teks, harga kamar, toggle status kamar kosong/penuh, dan download file JSON baru dengan PIN keamanan (`admin123`).

---

## 🔐 Cara Masuk ke Halaman Admin Pengelola Kos

Halaman admin dapat diakses dengan cara:
1. Akses URL: [http://localhost:5173/#admin](http://localhost:5173/#admin) (atau `/admin`).
2. Atau scroll ke bagian paling bawah landing page (Footer), lalu klik tautan **"🔒 Kelola Kos (Admin)"**.
3. Masukkan PIN keamanan: **`admin123`**.
4. Di panel ini Anda bisa:
   - Mengubah nama kos, nomor WhatsApp, alamat, dan promo.
   - Mengubah status kamar (Tersedia / Penuh) dan harga sewa secara visual.
   - Mengedit tata tertib aturan kos dan pertanyaan FAQ.
   - Klik **"Terapkan Perubahan"** untuk melihat perubahan langsung di browser.
   - Klik **"Download JSON"** jika ingin menyimpan file konfigurasi baru tersebut secara permanen ke project (`src/data/kosData.json`).

---

## 🚀 Cara Menjalankan Secara Lokal

1. **Jalankan server development:**
   ```bash
   npm run dev
   ```
2. Buka browser di [http://localhost:5173](http://localhost:5173).

3. **Build untuk produksi:**
   ```bash
   npm run build
   ```

---

## 🛠️ Cara Mengubah Data Kos (Teks & Gambar)

Cukup buka file:
`src/data/kosData.json`

Di file tersebut Anda dapat mengubah:
- **`kosInfo`**: Nama kos, no WhatsApp, alamat, link Google Maps embed, harga mulai, dsb.
  - *Format nomor WhatsApp:* Gunakan format internasional tanpa tanda `+` (contoh: `6281234567890`).
- **`roomTypes`**: Tambah/kurang kamar, ubah harga, foto kamar, ukuran, dan fasilitas kamar.
- **`facilities`**: Fasilitas kamar, fasilitas bersama, dan keamanan.
- **`gallery`**: URL foto-foto suasana kos.
- **`nearbyPlaces`**: Daftar kampus, stasiun, atau tempat terdekat dan estimasi waktu tempuh.
- **`rules`**: Tata tertib dan aturan kos.
- **`testimonials`**: Ulasan dan feedback penghuni.
- **`faqs`**: Pertanyaan dan jawaban umum.

### Menggunakan Foto Sendiri:
- Anda dapat menaruh file gambar di folder `public/images/` (contoh: `public/images/kamar-1.jpg`).
- Lalu di `kosData.json`, ubah nilai URL gambarnya menjadi `"/images/kamar-1.jpg"`.
- Atau bisa menggunakan link URL foto online (Cloudinary, Imgur, Google Drive public direct link, dll).

---

## 🌐 Cara Deploy ke Vercel

### Opsi A: Lewat GitHub (Sangat Disarankan)
1. Buat repository baru di GitHub (misal: `landing-page-kos`).
2. Hubungkan dan push project ini ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: landing page kos siap deploy"
   git branch -M main
   git remote add origin https://github.com/USERNAME_ANDA/landing-page-kos.git
   git push -u origin main
   ```
3. Buka [vercel.com](https://vercel.com) dan login.
4. Klik **"Add New"** > **"Project"**, lalu pilih repository `landing-page-kos`.
5. Framework preset akan otomatis terdeteksi sebagai **Vite**.
6. Klik **"Deploy"**! Dalam 30 detik website kos Anda sudah live di internet.

### Opsi B: Menggunakan Vercel CLI
1. Jalankan di terminal:
   ```bash
   npx vercel
   ```
2. Ikuti petunjuk di terminal untuk login dan langsung deploy.
