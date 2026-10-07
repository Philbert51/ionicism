# Ionicism

Aplikasi manajemen toko berbasis **Ionic** dan **Angular**. Aplikasi ini menyediakan dashboard penjualan, pengelolaan produk, riwayat transaksi, serta pengaturan profil pengguna.

## Teknologi yang Digunakan

- [Ionic](https://ionicframework.com/)
- [Angular](https://angular.dev/)
- [Capacitor](https://capacitorjs.com/)
- TypeScript
- Ionicons

## Persyaratan Sistem

Pastikan perangkat telah memiliki:

- Node.js dan npm
- Git (opsional, jika proyek diambil dari repository)
- Browser modern seperti Google Chrome, Microsoft Edge, atau Mozilla Firefox

## Instalasi

1. Clone atau buka repository proyek.
2. Masuk ke direktori aplikasi Ionic:

   ```bash
   cd uts
   ```

3. Install seluruh dependency:

   ```bash
   npm install
   ```

## Menjalankan Aplikasi

Jalankan server development dengan perintah berikut:

```bash
npm start
```

Setelah proses selesai, buka alamat yang ditampilkan oleh Angular CLI, biasanya:

```text
http://localhost:4200
```

Untuk membuat build production, gunakan:

```bash
npm run build
```

## Akun Demo

Login demo yang tersedia pada aplikasi:

- **Username:** `admin`
- **Password:** `admin123`

> Status login saat ini diatur aktif secara default untuk mempermudah pengujian. Data produk, akun, dan transaksi masih berupa data dummy yang disimpan di memory aplikasi, sehingga dapat kembali ke kondisi awal ketika aplikasi dimuat ulang.

## Fitur yang Telah Diimplementasikan

### Autentikasi dan Navigasi

- Halaman login dengan username dan password.
- Navigasi tab untuk Dashboard, Produk, Riwayat, dan Profile.
- Menu samping untuk mengakses halaman pengaturan.
- Logout pengguna.

### Dashboard

- Menampilkan sapaan berdasarkan username.
- Menampilkan pendapatan hari ini.
- Menampilkan keuntungan hari ini.
- Menampilkan jumlah item terjual dan jumlah transaksi.
- Menampilkan produk terlaris hari ini.
- Menampilkan jumlah produk yang tersedia di toko.
- Menampilkan produk terlaris sepanjang waktu.

### Manajemen Produk

- Menampilkan daftar produk beserta stok, harga jual, kategori, dan gambar.
- Mencari produk berdasarkan nama.
- Menambahkan produk baru.
- Melihat detail produk.
- Mengubah data produk.
- Menghapus produk.
- Memilih kategori produk.
- Validasi nama, deskripsi, kategori, stok, harga, dan URL gambar.
- Menampilkan gambar default jika produk tidak memiliki gambar.

### Riwayat Transaksi

- Menampilkan daftar transaksi.
- Filter transaksi berdasarkan hari ini.
- Filter transaksi berdasarkan bulan ini.
- Filter transaksi berdasarkan bulan dan tahun tertentu.
- Menampilkan jumlah transaksi, total pendapatan, dan total keuntungan.
- Melihat detail transaksi.
- Menampilkan total jenis produk dan total kuantitas setiap transaksi.

### Profil dan Pengaturan

- Mengubah username.
- Mengubah URL foto profil dengan preview gambar.
- Mengubah password dengan validasi password lama dan konfirmasi password baru.
- Validasi username kosong dan password yang tidak cocok.
- Mengaktifkan atau menonaktifkan Dark Mode.

## Struktur Direktori Utama

```text
uts/
├── src/
│   ├── app/
│   │   ├── dashboard/          # Ringkasan penjualan
│   │   ├── login/              # Autentikasi
│   │   ├── product/            # Daftar, tambah, ubah, detail produk
│   │   ├── profile/            # Profil dan password
│   │   ├── settings/           # Pengaturan tema
│   │   └── transactionhistory/ # Riwayat dan detail transaksi
│   ├── assets/                 # Asset aplikasi
│   └── theme/                  # Konfigurasi tema Ionic
├── capacitor.config.ts
├── angular.json
└── package.json
```

## Perintah yang Tersedia

| Perintah        | Keterangan                                |
| --------------- | ----------------------------------------- |
| `npm start`     | Menjalankan server development            |
| `npm run build` | Membuat build aplikasi                    |
| `npm run watch` | Membuat build dan memantau perubahan file |
| `npm test`      | Menjalankan unit test                     |
| `npm run lint`  | Menjalankan pemeriksaan linting           |

## Catatan Pengembangan

- Data aplikasi saat ini belum menggunakan backend atau database eksternal.
- Data awal produk dan transaksi didefinisikan pada service di `src/app`.
- Untuk deployment ke platform native, lakukan build web terlebih dahulu lalu gunakan konfigurasi Capacitor sesuai platform tujuan.
