-- ==============================================================================
-- SKRIP SETUP SUPABASE DATABASE UNTUK LANDING PAGE KOS
-- ==============================================================================
-- Jalankan skrip ini di menu SQL Editor pada Supabase Dashboard Anda.
-- ==============================================================================

-- 1. Buat tabel kos_settings jika belum ada
create table if not exists public.kos_settings (
  id text primary key default 'main',
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Aktifkan Row Level Security (RLS)
alter table public.kos_settings enable row level security;

-- 3. Buat Policy agar pengunjung website bisa membaca data (Read / Select)
drop policy if exists "Allow public read access" on public.kos_settings;
create policy "Allow public read access"
  on public.kos_settings
  for select
  to anon, authenticated
  using (true);

-- 4. Buat Policy agar data bisa diubah dari admin dashboard (Insert / Update)
drop policy if exists "Allow update from admin" on public.kos_settings;
create policy "Allow update from admin"
  on public.kos_settings
  for all
  to anon, authenticated
  using (true)
  with check (true);

-- 5. Masukkan data awal kos (Seed Data)
insert into public.kos_settings (id, data)
values (
  'main',
  '{
    "kosInfo": {
      "name": "Kost Graha Asri",
      "badge": "Eksklusif & Nyaman",
      "tagline": "Hunian Kost Modern, Nyaman, Bersih & Berlokasi Sangat Strategis",
      "subTagline": "Nikmati kenyamanan beristirahat seperti di rumah sendiri dengan fasilitas kamar lengkap, internet berkecepatan tinggi, keamanan 24 jam, dan lingkungan yang kondusif.",
      "address": "Jl. Melati No. 45, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12150",
      "locationNote": "Hanya 5 menit ke Kampus UI Salemba / Stasiun MRT & Busway",
      "whatsappNumber": "6281234567890",
      "whatsappDisplay": "+62 812-3456-7890",
      "instagram": "@grahaasri.kost",
      "email": "halo@grahaasrikost.id",
      "operatingHours": "Setiap Hari (08:00 - 20:00 WIB)",
      "startingPrice": "Rp 1.500.000",
      "googleMapsEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2974797034177!2d106.80026337586828!3d-6.224446460959149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14d30079f01%3A0x2e74f4f3460662d2!2sSenayan%20City!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid",
      "googleMapsDirectionUrl": "https://maps.google.com"
    },
    "stats": [
      { "label": "Lingkungan", "value": "Aman & Nyaman", "sub": "Kondusif untuk Istirahat & Belajar" },
      { "label": "Keamanan", "value": "24 Jam", "sub": "CCTV & Smart Digital Lock" },
      { "label": "Kecepatan WiFi", "value": "100 Mbps", "sub": "Fiber Optic Dedicated" }
    ],
    "roomTypes": [
      {
        "id": "standard-ac",
        "name": "Tipe Standard AC",
        "tag": "Paling Hemat",
        "size": "3 x 3.5 Meter",
        "price": 1600000,
        "originalPrice": 1800000,
        "period": "bulan",
        "available": 2,
        "isAvailable": true,
        "image": "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
        "gallery": [
          "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?auto=format&fit=crop&w=1000&q=80"
        ],
        "description": "Pilihan ideal untuk mahasiswa atau karyawan yang mencari kamar ber-AC yang nyaman, rapi, dan terjangkau dengan pencahayaan alami yang baik.",
        "facilities": [
          "AC 0.5 PK Hemat Energi",
          "Kasur Single Springbed (100x200)",
          "Kamar Mandi Luar (Bersih & Terawat)",
          "Lemari Pakaian 2 Pintu",
          "Meja Belajar / Kerja + Kursi Ergonomis",
          "Jendela Menghadap Udara Luar",
          "Free WiFi High Speed"
        ],
        "inclusions": ["Termasuk Air Bersih", "Termasuk Iuran Sampah & Kebersihan", "Listrik Token Mandiri (900 VA)"]
      },
      {
        "id": "deluxe-km-dalam",
        "name": "Tipe Deluxe (KM Dalam)",
        "tag": "Paling Populer",
        "size": "3.5 x 4 Meter",
        "price": 2200000,
        "originalPrice": 2400000,
        "period": "bulan",
        "available": 1,
        "isAvailable": true,
        "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
        "gallery": [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1000&q=80"
        ],
        "description": "Kamar favorit penghuni dengan kamar mandi dalam pribadi berpemanas air (water heater), tempat tidur Queen size, dan ruang belajar lega.",
        "facilities": [
          "AC 1 PK Daikin/Panasonic",
          "Kamar Mandi Dalam + Water Heater",
          "Kloset Duduk Toto & Shower Mandi",
          "Kasur Queen Springbed (160x200)",
          "Smart TV 32 Inch",
          "Lemari Pakaian 3 Pintu + Cermin Full Body",
          "Meja Kerja Luas + Kursi Nyaman",
          "Jendela Besar & Gorden Blackout"
        ],
        "inclusions": ["Termasuk Air Bersih", "Free Air Minum Galon RO", "Termasuk Iuran Sampah", "Listrik Token Mandiri (1300 VA)"]
      },
      {
        "id": "vip-suite",
        "name": "Tipe VIP Suite (Balkon)",
        "tag": "Eksklusif",
        "size": "4 x 5 Meter",
        "price": 2800000,
        "originalPrice": 3100000,
        "period": "bulan",
        "available": 0,
        "isAvailable": false,
        "image": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
        "gallery": [
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
          "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80"
        ],
        "description": "Kamar termewah dengan balkon pribadi, kulkas mini kamar, sofa santai, dan interior modern aesthetic minimalis seperti apartemen.",
        "facilities": [
          "Balkon Pribadi dengan View Santai",
          "AC 1 PK Inverter Hemat Listrik",
          "Kulkas Mini Pribadi di Dalam Kamar",
          "Smart TV 43 Inch (Netflix & YouTube Ready)",
          "Kamar Mandi Dalam + Water Heater Premium",
          "Kasur King Size Springbed (180x200)",
          "Sofa Single & Coffee Table",
          "Meja Kerja Ergonomis & Rak Buku",
          "Lemari Pakaian Modern Built-in"
        ],
        "inclusions": ["Free Parkir Mobil 1 Slot", "Termasuk Air & Iuran Sampah", "Free Refill Air Minum", "Listrik Token Mandiri (1300 VA)"]
      }
    ],
    "facilities": {
      "kamar": [
        { "title": "Air Conditioner (AC)", "desc": "Semua kamar ber-AC dingin dan diservis berkala tiap 3 bulan.", "icon": "Wind" },
        { "title": "Kamar Mandi Dalam", "desc": "Kloset duduk, shower mandi, dan water heater air hangat.", "icon": "Bath" },
        { "title": "Kasur Springbed Nyaman", "desc": "Kasur berkualitas empuk lengkap dengan sprei, bantal & guling.", "icon": "Bed" },
        { "title": "Workstation / Meja Kerja", "desc": "Meja belajar/kerja luas dilengkapi stopkontak dan kursi nyaman.", "icon": "Briefcase" },
        { "title": "Lemari Pakaian & Cermin", "desc": "Kapasitas simpan besar dan cermin untuk menata pakaian rapi.", "icon": "Layers" },
        { "title": "Jendela & Sirkulasi Bagus", "desc": "Pencahayaan alami melimpah membuat kamar tidak lembap dan segar.", "icon": "Sun" }
      ],
      "bersama": [
        { "title": "WiFi Cepat 100 Mbps", "desc": "Koneksi internet fiber optic dengan access point di tiap lantai.", "icon": "Wifi" },
        { "title": "Dapur Bersama Lengkap", "desc": "Kompor gas gratis, peralatan masak, microwave, dan wastafel cuci.", "icon": "Utensils" },
        { "title": "Kulkas & Dispenser Bersama", "desc": "Kulkas 2 pintu bersama & dispenser air galon RO gratis isi ulang.", "icon": "Coffee" },
        { "title": "Mesin Cuci & Area Jemur", "desc": "Tersedia mesin cuci otomatis dan area jemur terlindung hujan.", "icon": "Shirt" },
        { "title": "Ruang Tamu & Bersantai", "desc": "Area santai nyaman ber-AC untuk menerima tamu atau kerja kelompok.", "icon": "Users" },
        { "title": "Rooftop Garden", "desc": "Area terbuka di lantai atas untuk bersantai sore hari sambil ngopi.", "icon": "TreePine" }
      ],
      "keamanan": [
        { "title": "Keamanan CCTV 24 Jam", "desc": "Kamera CCTV tersebar di setiap sudut koridor, tangga, dan parkiran.", "icon": "ShieldCheck" },
        { "title": "Smart Door Access Card", "desc": "Akses pintu utama menggunakan kartu digital RFID / PIN keypad.", "icon": "Key" },
        { "title": "Parkiran Berkanopi", "desc": "Parkir motor aman berkanopi dan slot mobil dengan gerbang tertutup.", "icon": "Car" },
        { "title": "Bebas Jam Malam", "desc": "Penghuni leluasa beraktivitas dengan tetap menjaga ketertiban bersama.", "icon": "Clock" }
      ]
    },
    "nearbyPlaces": [
      { "category": "Pendidikan", "name": "Universitas / Kampus Utama", "time": "5 Menit", "distance": "800 m" },
      { "category": "Transportasi", "name": "Stasiun KRL / MRT Terdekat", "time": "7 Menit", "distance": "1.2 km" },
      { "category": "Belanja", "name": "Indomaret & Alfamart 24 Jam", "time": "2 Menit", "distance": "150 m" },
      { "category": "Kuliner", "name": "Pusat Jajanan & Kafe Hits", "time": "3 Menit", "distance": "300 m" },
      { "category": "Kesehatan", "name": "Rumah Sakit Umum / Apotek", "time": "8 Menit", "distance": "1.5 km" },
      { "category": "Mall", "name": "Pusat Perbelanjaan / Mall", "time": "10 Menit", "distance": "2.5 km" }
    ],
    "faqs": [
      {
        "q": "Bagaimana prosedur memesan atau booking kamar di Kost Graha Asri?",
        "a": "Sangat mudah! Anda cukup klik tombol ''Tanya Ketersediaan / Hubungi via WhatsApp'' pada tipe kamar yang Anda minati. Anda bisa menjadwalkan survey langsung ke lokasi atau langsung melakukan DP booking untuk mengamankan kamar."
      },
      {
        "q": "Apakah ada uang jaminan (deposit)?",
        "a": "Ya, terdapat deposit sebesar Rp 500.000 saat awal masuk. Uang deposit ini akan dikembalikan 100% secara utuh saat masa sewa Anda selesai, selama tidak ada kerusakan fasilitas atau tunggakan."
      },
      {
        "q": "Apakah harga sewa sudah termasuk listrik?",
        "a": "Untuk transparansi dan kenyamanan pemakaian elektronik masing-masing penghuni, listrik menggunakan sistem token mandiri per kamar (PLN Prabayar). Namun untuk air PDAM, WiFi 100 Mbps, dan iuran sampah sudah GRATIS termasuk dalam sewa!"
      },
      {
        "q": "Bolehkah teman atau keluarga menginap?",
        "a": "Boleh untuk keluarga inti (orang tua / saudara kandung sejenis) dengan batas wajar maksimal 2-3 hari dan menginformasikan kepada pengelola/penjaga kos terlebih dahulu."
      },
      {
        "q": "Apakah ada biaya parkir tambahan?",
        "a": "Parkir motor GRATIS untuk seluruh penghuni dengan slot berkanopi. Untuk parkir mobil tersedia slot terbatas dengan biaya tambahan Rp 250.000 / bulan (khusus tipe VIP Free 1 slot mobil)."
      },
      {
        "q": "Bagaimana sistem pembayaran sewa kamar?",
        "a": "Pembayaran dilakukan setiap bulan melalui transfer bank (BCA / Mandiri) maksimal tanggal yang disepakati tiap bulannya. Tersedia potongan diskon khusus untuk pembayaran sekaligus 6 bulan atau 1 tahun."
      }
    ]
  }'::jsonb
)
on conflict (id) do nothing;

-- ==============================================================================
-- 6. SETUP SUPABASE STORAGE BUCKET UNTUK MENYIMPAN GAMBAR KOS ('kos-images')
-- ==============================================================================

-- Buat bucket 'kos-images' dengan akses publik
insert into storage.buckets (id, name, public)
values ('kos-images', 'kos-images', true)
on conflict (id) do update set public = true;

-- Policy agar publik bisa melihat gambar yang di-upload
drop policy if exists "Public Access for kos-images" on storage.objects;
create policy "Public Access for kos-images"
  on storage.objects for select
  using (bucket_id = 'kos-images');

-- Policy agar admin bisa meng-upload gambar baru
drop policy if exists "Allow upload to kos-images" on storage.objects;
create policy "Allow upload to kos-images"
  on storage.objects for insert
  with check (bucket_id = 'kos-images');

-- Policy agar admin bisa memperbarui gambar
drop policy if exists "Allow update kos-images" on storage.objects;
create policy "Allow update kos-images"
  on storage.objects for update
  using (bucket_id = 'kos-images');

-- Policy agar admin bisa menghapus gambar
drop policy if exists "Allow delete kos-images" on storage.objects;
create policy "Allow delete kos-images"
  on storage.objects for delete
  using (bucket_id = 'kos-images');

