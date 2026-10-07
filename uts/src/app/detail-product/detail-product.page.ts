import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product-service';

// halaman detail produk, tautan dari kartu produk di halaman order menunjuk ke sini
// peringatan: tidak ada rute di aplikasi yang memuat modul halaman ini, jadi alamat tautan itu tidak terdaftar
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
  standalone: false,
})
export class DetailProductPage implements OnInit {

  // angular memberikan route dan service yang dipakai bersama
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  id = 0; // nomor posisi produk di array, bukan id produk, diisi dari parameter rute
  product:any[]=[]; // seluruh daftar produk dari service, layar memilih satu dengan product[id]

  // jalan saat halaman dibuat, mengambil id dari url dan seluruh daftar produk
  // peringatan: halaman order mengirim id produk dikurangi satu sebagai posisi di array, jadi hanya cocok kalau id produk berurutan dari satu tanpa lubang
  ngOnInit() {
    // params langsung memberi nilai saat disubscribe, jadi id sudah terisi di baris berikutnya
    this.route.params.subscribe(params =>{
      // nilai dari url berupa string walaupun id dideklarasikan sebagai number
      this.id = params['id'];
    });

    // isinya adalah referensi ke array milik service, bukan salinan
    this.product = this.productService.product;
  }

}
