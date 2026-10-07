import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailProductPage } from './detail-product.page';

// rute milik halaman detail produk
const routes: Routes = [
  {
    // alamat kosong menampilkan halaman detail produk itu sendiri
    path: '',
    component: DetailProductPage
  }
];

// modul routing halaman detail produk
@NgModule({
  // forchild dipakai karena rute ini ditempel ke rute induk, bukan rute utama aplikasi
  imports: [RouterModule.forChild(routes)],

  // agar direktif router bisa dipakai oleh modul yang mengimpor modul ini
  exports: [RouterModule],
})
export class DetailProductPageRoutingModule {}
