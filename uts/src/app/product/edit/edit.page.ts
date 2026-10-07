import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../account-service';

// halaman untuk mengubah data produk yang sudah ada
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: false,
})
export class EditPage implements OnInit {
  // angular memberikan service, route, router, dan account service yang dipakai bersama
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) { }

  editId: number = 0; // id produk yang sedang diedit, diisi dari parameter rute

  namaProduk: string = ''; // nama produk, terhubung dua arah ke input dan diisi dari produk yang diedit
  hargaBeli: number = 0; // harga beli produk
  hargaJual: number = 0; // harga jual produk
  stock: number = 0; // stok produk
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

  // jalan saat halaman dibuat, memeriksa login, mengambil daftar kategori, lalu mengisi form dari produk yang diedit
  ngOnInit() {
    // kalau belum login, arahkan ke halaman login
    // peringatan: fungsi tetap berjalan sampai akhir karena tidak ada return setelah navigate
    if (!this.accountService.isLogin) {
      this.router.navigate(['/login']);
    }

    // ambil referensi daftar kategori dari service
    this.kategoriList = this.productService.kategori;

    // params langsung memberi nilai saat disubscribe, jadi isi di dalamnya langsung berjalan
    this.route.params.subscribe((params) => {
      // nilai dari url berupa string walaupun editid dideklarasikan sebagai number
      this.editId = params['id'];

      const product = this.productService.getProductById(this.editId); // produk yang diedit, null kalau id tidak ditemukan

      // form hanya diisi kalau produknya ditemukan
      if (product) {
        this.namaProduk = product.name;
        this.deskripsi = product.description;
        this.hargaBeli = product.purchasePrice;
        this.hargaJual = product.sellingPrice;
        this.stock = product.stock;

        // url gambar dan kategori memakai nilai cadangan kalau produk tidak punya, yaitu teks kosong dan minus satu
        this.imageUrl = product.imageUrl || '';
        this.selectedKategori = product.kategori || -1;
      }
    });
  }

  // memeriksa isian satu per satu, kalau semuanya benar produk diperbarui lalu kembali ke halaman produk
  saveProduct() {
    // pemeriksaan berurutan, hanya pesan dari pemeriksaan pertama yang gagal yang tampil
    if (this.namaProduk == '') {
      alert('Nama Produk Tidak Boleh Kosong');
    } else if (this.deskripsi == '') {
      alert('Deskripsi Tidak Boleh Kosong!');
    } else if (this.hargaBeli < 0) {
      alert('Harga Beli Tidak Boleh Negatif');
    } else if (this.hargaJual < 0) {
      alert('Harga Jual Tidak Boleh Negatif');
    } else if (this.stock < 0) {
      alert('Stok Tidak Boleh Negatif');
    } else {
      // semua isian lolos, jadi perbarui produk di service berdasarkan id
      // urutan argumen mengikuti parameter updateproduct, harga jual lebih dulu dari harga beli
      // peringatan: kategori dan format url gambar tidak diperiksa di sini
      this.productService.updateProduct(
        this.editId,
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
