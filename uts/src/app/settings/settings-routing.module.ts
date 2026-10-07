import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';

// rute milik halaman pengaturan
const routes: Routes = [
  {
    // alamat kosong menampilkan halaman pengaturan itu sendiri
    path: '',
    component: SettingsPage
  }
];

// modul routing halaman pengaturan
@NgModule({
  // forchild dipakai karena rute ini ditempel ke rute induk, bukan rute utama aplikasi
  imports: [RouterModule.forChild(routes)],

  // agar direktif router bisa dipakai oleh modul yang mengimpor modul ini
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
