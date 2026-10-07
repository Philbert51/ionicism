import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductPage } from './product.page';

// rute milik halaman produk, dicocokkan dari atas ke bawah
const routes: Routes = [
  {
    // alamat kosong menampilkan halaman daftar produk itu sendiri
    path: '',
    component: ProductPage
  },
  {
    // halaman tambah produk, dimuat secara lazy lewat loadchildren
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    // halaman ubah produk, dimuat secara lazy, parameter id ada di rute milik modul edit
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },  {
    // halaman detail produk, dimuat secara lazy, parameter id ada di rute milik modul detail
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }


];

// modul routing halaman produk
@NgModule({
  // forchild dipakai karena rute ini ditempel ke rute induk, bukan rute utama aplikasi
  imports: [RouterModule.forChild(routes)],

  // agar direktif router bisa dipakai oleh modul yang mengimpor modul ini
  exports: [RouterModule],
})
export class ProductPageRoutingModule {}
