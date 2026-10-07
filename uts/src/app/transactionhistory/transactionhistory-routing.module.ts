import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionhistoryPage } from './transactionhistory.page';

// rute milik halaman riwayat transaksi, dicocokkan dari atas ke bawah
const routes: Routes = [
  {
    // alamat kosong menampilkan halaman riwayat transaksi itu sendiri
    path: '',
    component: TransactionhistoryPage
  },
  {
    // alamat detail diikuti id transaksi, halaman detail dimuat secara lazy lewat loadchildren, bagian :id adalah parameter alamat
    path: 'detail/:id',
    loadChildren: () => import('./detail/detail.module').then( m => m.DetailPageModule)
  }

];

// modul routing halaman riwayat transaksi
@NgModule({
  // forchild dipakai karena rute ini ditempel ke rute induk, bukan rute utama aplikasi
  imports: [RouterModule.forChild(routes)],

  // agar direktif router bisa dipakai oleh modul yang mengimpor modul ini
  exports: [RouterModule],
})
export class TransactionhistoryPageRoutingModule {}
