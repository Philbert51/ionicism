import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service';
import { Router } from '@angular/router';
import { AccountService } from '../account-service';
import { AnimationController } from "@ionic/angular";

// halaman daftar produk dengan pencarian dan tombol hapus
@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: false,
})
export class ProductPage implements OnInit {
  products: any[] = []; // daftar produk yang tampil, diganti hasil pencarian saat sedang mencari
  originalProductList: any[] = []; // daftar lengkap disimpan terpisah supaya semua produk bisa dikembalikan saat pencarian dikosongkan
  searchQuery: string = ''; // teks di kotak pencarian, terhubung dua arah ke input
  productsLength : number = 0; // jumlah produk yang belum terhapus untuk tulisan jumlah produk, dihitung di ngoninit dan dikurangi saat menghapus

  // angular memberikan service, router, dan animctrl yang dipakai bersama, animctrl belum dipakai karena kode animasinya masih dijadikan komentar
  constructor(
    private productService: ProductService,
    private router: Router,
    private accountService: AccountService,
    private animCtrl: AnimationController
  ) {}

  // ionic menyimpan halaman di cache, jadi fungsi ini hanya jalan sekali dan tidak di setiap kunjungan
  ngOnInit() {
    // kalau belum login, arahkan ke halaman login
    // peringatan: fungsi tetap berjalan sampai akhir karena tidak ada return setelah navigate
    if (this.accountService.isLogin == false) {
      this.router.navigate(['/login']);
    }

    // isinya adalah referensi ke array milik service, bukan salinan, produk yang sudah terhapus tetap ada di dalamnya dan disembunyikan oleh layar
    this.products = this.productService.product;

    // simpan daftar lengkap untuk mengembalikan tampilan saat pencarian dikosongkan
    this.originalProductList = this.productService.product;

    // hitung produk yang belum terhapus
    this.productsLength = this.productService.getNotDeletedProductCount();
  }

  // jalan setiap kali halaman ditampilkan lagi, dipakai untuk memeriksa login di setiap kunjungan
  // peringatan: jumlah produk tidak dihitung ulang di sini, hanya di ngoninit dan saat menghapus
  ionViewDidEnter() {
    // kalau belum login, arahkan ke halaman login
    if (this.accountService.isLogin == false) {
      this.router.navigate(['/login']);
    }
  }

  // dipanggil setiap tombol dilepas di kotak pencarian, daftar produk langsung disaring
  searchProduct() {
    // kotak pencarian kosong atau hanya spasi, jadi tampilkan semua produk lagi
    if (!this.searchQuery || this.searchQuery.trim() == '') {
      this.products = this.originalProductList;
    } else {
      // ada teks pencarian, jadi tampilkan hanya produk yang namanya cocok
      this.products = this.productService.searchProduct(this.searchQuery);
    }
  }

  // mengembalikan jumlah produk yang belum terhapus langsung dari service
  getProductCount(): number {
    return this.productService.getNotDeletedProductCount();
  }

  // menghapus produk setelah pengguna setuju
  deleteProduct(id: number) {
    // const deletedCard = document.querySelector("#product" + id) as HTMLElement;
    // const animation = this.animCtrl.create().addElement(deletedCard).duration(400).fromTo("transform", "translateX(0%)", "translateX(80%)").easing("ease-out").fromTo("opacity", 1, -1).easing("ease-in");

    // kotak konfirmasi, isi blok hanya jalan kalau pengguna memilih ok
    // isinya: jumlah dikurangi, produk ditandai terhapus di service, lalu daftar yang tampil diambil ulang dari service
    // tanda tanya sebelum name mencegah error kalau produk tidak ditemukan
    if (confirm('Apakah Anda Yakin Ingin Menghapus ' + this.productService.getProductById(id)?.name + "?")) {
      // kurangi jumlah yang tampil karena produk akan ditandai terhapus
      this.productsLength--;
      // animation.play().then(() => {
      //   this.productService.deleteProduct(id);
      //   this.products = this.productService.product;
      //   this.originalProductList = this.productService.product;
      //   deletedCard.remove();
      // });
      this.productService.deleteProduct(id);
      this.products = this.productService.product;
      this.originalProductList = this.productService.product;
    }
  }
}
