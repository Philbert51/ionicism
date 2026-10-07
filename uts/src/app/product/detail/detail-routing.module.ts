import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPage } from './detail.page';

// rute milik halaman detail produk
const routes: Routes = [
  {
    // bagian :id adalah parameter alamat, nilainya dibaca halaman lewat route.params
    path: ':id',
    component: DetailPage
  }
];

// modul routing halaman detail produk
@NgModule({
  // forchild dipakai karena rute ini ditempel ke rute induk, bukan rute utama aplikasi
  imports: [RouterModule.forChild(routes)],

  // agar direktif router bisa dipakai oleh modul yang mengimpor modul ini
  exports: [RouterModule],
})
export class DetailPageRoutingModule {}
