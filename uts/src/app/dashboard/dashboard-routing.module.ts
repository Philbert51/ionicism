import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

// rute milik halaman dashboard
const routes: Routes = [
  {
    // alamat kosong menampilkan halaman dashboard itu sendiri
    path: '',
    component: DashboardPage
  }
];

// modul routing halaman dashboard
@NgModule({
  // forchild dipakai karena rute ini ditempel ke rute induk, bukan rute utama aplikasi
  imports: [RouterModule.forChild(routes)],

  // agar direktif router bisa dipakai oleh modul yang mengimpor modul ini
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
