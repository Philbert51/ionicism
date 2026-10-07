import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product-service';
import { Router } from '@angular/router';
import { AccountService } from '../../account-service';

// halaman detail satu produk, id produk diambil dari parameter rute
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: false,
})
export class DetailPage implements OnInit {

  // angular memberikan route, service, router, dan account service yang dipakai bersama
  constructor(private route: ActivatedRoute, private productService:ProductService, private router: Router, private accountService: AccountService) { }

  productId: number = 0; // id produk yang dibuka, diisi dari parameter rute
  product:any; // objek produk yang dibuka, diisi di ngoninit dan null kalau tidak ditemukan

  // jalan saat halaman dibuat, memeriksa login lalu memuat produk berdasarkan id
  ngOnInit() {
    // kalau belum login, arahkan ke halaman login
    // peringatan: fungsi tetap berjalan sampai akhir karena tidak ada return setelah navigate
    if (!this.accountService.isLogin) {
      this.router.navigate(['/login']);
    }

    // params langsung memberi nilai saat disubscribe, jadi productid sudah terisi di baris berikutnya
    this.route.params.subscribe(params => {
      // nilai dari url berupa string walaupun productid dideklarasikan sebagai number
      this.productId = params['id'];
    });

    // ambil produk berdasarkan id, hasilnya null kalau tidak ada
    this.product = this.productService.getProductById(this.productId);
  }

  // mengubah id kategori menjadi nama kategori untuk ditampilkan
  getProductCategoryName(kategoriId: number): string {
    return this.productService.getCategoryNameById(kategoriId);
  }
}
