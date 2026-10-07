import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartPage } from './cart.page';

// rute milik halaman keranjang
const routes: Routes = [
  {
    // alamat kosong menampilkan halaman keranjang itu sendiri
    path: '',
    component: CartPage
  }
];

// modul routing halaman keranjang
@NgModule({
  // forchild dipakai karena rute ini ditempel ke rute induk, bukan rute utama aplikasi
  imports: [RouterModule.forChild(routes)],

  // agar direktif router bisa dipakai oleh modul yang mengimpor modul ini
  exports: [RouterModule],
})
export class CartPageRoutingModule {}
