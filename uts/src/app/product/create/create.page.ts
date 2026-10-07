import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../account-service';

// halaman untuk menambah produk baru
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: false,
})
export class CreatePage implements OnInit {
  namaProduk: string = ''; // nama produk, terhubung dua arah ke input
  hargaBeli: number = 1; // harga beli produk
  hargaJual: number = 1; // harga jual produk
  stock: number = 1; // stok awal produk
  imageUrl: string = ''; // alamat gambar produk, boleh dikosongkan
  deskripsi: string = ''; // deskripsi produk
  selectedKategori: number = -1; // id kategori yang dipilih, minus satu berarti belum dipilih

  kategoriList: any[] = []; // daftar kategori dari service, setiap entri berisi id dan nama kategori

  isFirstNamaProduk: boolean = true; // true selama kolom nama belum pernah ditinggalkan, supaya pesan error tidak muncul sebelum pengguna mengisi
  isFirstDeskripsi: boolean = true; // true selama kolom deskripsi belum pernah ditinggalkan
  isFirstKategori: boolean = true; // true sampai pilihan kategori pernah ditutup
  isFirstHargaBeli: boolean = true; // true sampai kolom harga beli pernah ditinggalkan
  isFirstHargaJual: boolean = true; // true sampai kolom harga jual pernah ditinggalkan
  isFirstStock: boolean = true; // true sampai kolom stok pernah ditinggalkan

  // dipanggil saat kolom nama kehilangan fokus, sejak itu pesan error boleh tampil
  setIsFirstNamaProduk() {
    this.isFirstNamaProduk = false;
  }

  // dipanggil saat kolom deskripsi kehilangan fokus, sejak itu pesan error boleh tampil
  setIsFirstDeskripsi() {
    this.isFirstDeskripsi = false;
  }

  // dipanggil saat pilihan kategori ditutup, sejak itu pesan error boleh tampil
  setIsFirstKategori() {
    this.isFirstKategori = false;
  }

  // dipanggil saat kolom harga beli kehilangan fokus, sejak itu pesan error boleh tampil
  setIsFirstHargaBeli() {
    this.isFirstHargaBeli = false;
  }

  // dipanggil saat kolom harga jual kehilangan fokus, sejak itu pesan error boleh tampil
  setIsFirstHargaJual() {
    this.isFirstHargaJual = false;
  }

  // dipanggil saat kolom stok kehilangan fokus, sejak itu pesan error boleh tampil
  setIsFirstStock() {
    this.isFirstStock = false;
  }

  // angular memberikan service, router, route, dan account service yang dipakai bersama
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  // jalan saat halaman dibuat, memeriksa login dan mengambil daftar kategori untuk pilihan di layar
  ngOnInit() {
    // kalau belum login, arahkan ke halaman login
    // peringatan: fungsi tetap berjalan sampai akhir karena tidak ada return setelah navigate
    if (!this.accountService.isLogin) {
      this.router.navigate(['/login']);
    }

    // ambil referensi daftar kategori dari service
    this.kategoriList = this.productService.kategori;
  }

  // memeriksa isian satu per satu, kalau semuanya benar produk ditambahkan lalu kembali ke halaman produk
  createProduct() {
    // pemeriksaan berurutan, hanya pesan dari pemeriksaan pertama yang gagal yang tampil
    if (this.namaProduk == '') {
      alert('Nama Produk Tidak Boleh Kosong');
    } else if (this.deskripsi == '') {
      alert('Deskripsi Tidak Boleh Kosong!');
    } else if (this.hargaBeli <= 0) {
      alert('Harga Beli Harus Lebih Besar Dari 0');
    } else if (this.hargaJual <= 0) {
      alert('Harga Jual Harus Lebih Besar Dari 0');
    } else if (this.stock <= 0) {
      alert('Stok Harus Lebih Besar Dari 0');
    } else if (this.selectedKategori == -1 || this.selectedKategori == null) {
      alert('Kategori Harus Dipilih');
    } else {
      // semua isian lolos, jadi simpan produk baru ke service
      // urutan argumen mengikuti parameter addproduct, harga jual lebih dulu dari harga beli
      // peringatan: format url gambar tidak diperiksa di sini, jadi url yang tidak valid tetap tersimpan
      this.productService.addProduct(
        this.namaProduk,
        this.deskripsi,
        this.stock,
        this.hargaJual,
        this.hargaBeli,
        this.imageUrl,
        this.selectedKategori
      );

      // kembali ke halaman daftar produk
      this.router.navigate(['/product']);
    }
  }

  // true kalau url kosong atau formatnya benar, kosong dianggap valid karena gambar boleh dikosongkan
  checkProductLink(imageUrlQuery: string): boolean {
    // pola regex: diawali http atau https, lalu nama domain, titik, dan akhiran domain
    // peringatan: hanya memeriksa format, bukan memastikan gambarnya benar benar ada
    const url =
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/;

    // url kosong langsung dianggap valid
    if (imageUrlQuery == '') {
      return true;
    } else {
      // test mengembalikan true kalau teks cocok dengan pola
      return url.test(imageUrlQuery);
    }
  }
}
