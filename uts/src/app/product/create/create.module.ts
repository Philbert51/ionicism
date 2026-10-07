import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { CreatePageRoutingModule } from './create-routing.module';

import { CreatePage } from './create.page';

// modul halaman tambah produk, mengumpulkan semua yang dibutuhkan halaman ini
@NgModule({
  // commonmodule untuk ngif dan ngfor, formsmodule untuk ngmodel, ionicmodule untuk komponen ionic, lalu modul routing milik halaman ini
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePageRoutingModule
  ],

  // komponen halaman yang dimiliki modul ini, harus dideklarasikan supaya bisa dipakai di template
  declarations: [CreatePage]
})
export class CreatePageModule {}
