import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

// rute milik halaman profil
const routes: Routes = [
  {
    // alamat kosong menampilkan halaman profil itu sendiri
    path: '',
    component: ProfilePage
  }
];

// modul routing halaman profil
@NgModule({
  // forchild dipakai karena rute ini ditempel ke rute induk, bukan rute utama aplikasi
  imports: [RouterModule.forChild(routes)],

  // agar direktif router bisa dipakai oleh modul yang mengimpor modul ini
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
