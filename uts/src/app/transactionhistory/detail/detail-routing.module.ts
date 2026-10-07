import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPage } from './detail.page';

// rute milik halaman detail transaksi
const routes: Routes = [
  {
    // alamat kosong menampilkan halaman detail transaksi itu sendiri
    path: '',
    component: DetailPage
  }
];

// modul routing halaman detail transaksi
@NgModule({
  // forchild dipakai karena rute ini ditempel ke rute induk, bukan rute utama aplikasi
  imports: [RouterModule.forChild(routes)],

  // agar direktif router bisa dipakai oleh modul yang mengimpor modul ini
  exports: [RouterModule],
})
export class DetailPageRoutingModule {}
