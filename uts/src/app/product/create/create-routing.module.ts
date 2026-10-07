import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePage } from './create.page';

// rute milik halaman tambah produk
const routes: Routes = [
  {
    // alamat kosong menampilkan halaman tambah produk itu sendiri
    path: '',
    component: CreatePage
  }
];

// modul routing halaman tambah produk
@NgModule({
  // forchild dipakai karena rute ini ditempel ke rute induk, bukan rute utama aplikasi
  imports: [RouterModule.forChild(routes)],

  // agar direktif router bisa dipakai oleh modul yang mengimpor modul ini
  exports: [RouterModule],
})
export class CreatePageRoutingModule {}
