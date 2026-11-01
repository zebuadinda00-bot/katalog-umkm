# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase. Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Koneksi Supabase server dibuat di `lib/supabase/server.js` dan diekspor melalui `lib/supabase/index.js`. Halaman `app/page.jsx` diperbarui untuk mengambil data produk dari tabel `produk` di Supabase secara server-side. Produk ditampilkan dengan komponen `KartuProduk`. Pesan error yang jelas ditampilkan bila data gagal diambil, dan teks "Belum ada produk" ditampilkan jika tabel kosong. Komponen `CatatanBelumAktif` telah dihapus.

**Perbaikan:**
Menambahkan pembersihan/normalisasi pada `SUPABASE_URL` agar otomatis memangkas trailing slash atau akhiran `/rest/v1` jika ada pada environment variable.

## US-02 Detail produk

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-03 Pesan via WhatsApp

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-04 Login admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-05 Ganti password

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
