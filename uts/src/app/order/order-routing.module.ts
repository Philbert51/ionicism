import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderPage } from './order.page';

// rute milik halaman order, dicocokkan dari atas ke bawah
const routes: Routes = [
  {
    // alamat kosong menampilkan halaman order itu sendiri
    path: '',
    component: OrderPage
  },
  {
    // alamat cart diikuti id transaksi, halaman keranjang dimuat secara lazy lewat loadchildren, bagian :id adalah parameter alamat
    path: 'cart/:id',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  }

];

// modul routing halaman order
@NgModule({
  // forchild dipakai karena rute ini ditempel ke rute induk, bukan rute utama aplikasi
  imports: [RouterModule.forChild(routes)],

  // agar direktif router bisa dipakai oleh modul yang mengimpor modul ini
  exports: [RouterModule],
})
export class OrderPageRoutingModule {}
