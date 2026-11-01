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
Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.

**Hasil:**
Halaman `app/produk/[id]/page.jsx` diperbarui untuk mengambil detail produk dari tabel `produk` di Supabase berdasarkan `id` secara server-side menggunakan `createClient()`. Menampilkan foto, kategori, nama, harga, dan deskripsi produk tanpa mengubah tata letak tampilan. Jika produk tidak ditemukan atau id tidak valid, memanggil fungsi `notFound()`. Komponen `CatatanBelumAktif` telah dihapus dan `TombolWhatsApp` tetap dipertahankan.

**Perbaikan:**
Menangani potensi error query atau format id tidak valid dengan membungkus query dalam try-catch sebelum memanggil `notFound()`.

## US-03 Pesan via WhatsApp

**Prompt:**
Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.

**Hasil:**
Komponen `components/TombolWhatsApp.jsx` diubah menjadi tautan `<a>` yang mengarah ke `https://wa.me/<nomor>?text=<pesan>`. Nomor diambil dari `lib/toko.js`, pesan di-encode dengan `encodeURIComponent`, dan tautan dibuka di tab baru (`target="_blank"` dengan `rel="noopener noreferrer"`). Tampilan tombol dipertahankan sepenuhnya, dan `CatatanBelumAktif` pada halaman detail produk dipastikan telah terhapus.

**Perbaikan:**
Menambahkan sanitasi pembersihan non-digit pada nomor WhatsApp dari `lib/toko.js` untuk memastikan format nomor valid bagi wa.me.

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
