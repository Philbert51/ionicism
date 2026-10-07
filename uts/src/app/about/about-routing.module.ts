import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutPage } from './about.page';

// rute milik halaman tentang aplikasi
const routes: Routes = [
  {
    // alamat kosong menampilkan halaman tentang aplikasi itu sendiri
    path: '',
    component: AboutPage
  }
];

// modul routing halaman tentang aplikasi
@NgModule({
  // forchild dipakai karena rute ini ditempel ke rute induk, bukan rute utama aplikasi
  imports: [RouterModule.forChild(routes)],

  // agar direktif router bisa dipakai oleh modul yang mengimpor modul ini
  exports: [RouterModule],
})
export class AboutPageRoutingModule {}
