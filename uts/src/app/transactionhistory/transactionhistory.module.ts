import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { TransactionhistoryPageRoutingModule } from './transactionhistory-routing.module';

import { TransactionhistoryPage } from './transactionhistory.page';

// modul halaman riwayat transaksi, mengumpulkan semua yang dibutuhkan halaman ini
@NgModule({
  // commonmodule untuk ngif dan ngfor, formsmodule untuk ngmodel, ionicmodule untuk komponen ionic, lalu modul routing milik halaman ini
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionhistoryPageRoutingModule
  ],

  // komponen halaman yang dimiliki modul ini, harus dideklarasikan supaya bisa dipakai di template
  declarations: [TransactionhistoryPage]
})
export class TransactionhistoryPageModule {}
