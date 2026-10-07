import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPage } from './edit.page';

// rute milik halaman ubah produk
const routes: Routes = [
  {
    // bagian :id adalah parameter alamat, nilainya dibaca halaman lewat route.params
    path: ':id',
    component: EditPage
  }
];

// modul routing halaman ubah produk
@NgModule({
  // forchild dipakai karena rute ini ditempel ke rute induk, bukan rute utama aplikasi
  imports: [RouterModule.forChild(routes)],

  // agar direktif router bisa dipakai oleh modul yang mengimpor modul ini
  exports: [RouterModule],
})
export class EditPageRoutingModule {}
