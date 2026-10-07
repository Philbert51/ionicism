import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';

// rute milik halaman login
const routes: Routes = [
  {
    // alamat kosong menampilkan halaman login itu sendiri
    path: '',
    component: LoginPage
  }
];

// modul routing halaman login
@NgModule({
  // forchild dipakai karena rute ini ditempel ke rute induk, bukan rute utama aplikasi
  imports: [RouterModule.forChild(routes)],

  // agar direktif router bisa dipakai oleh modul yang mengimpor modul ini
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
