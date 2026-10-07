import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { EditPageRoutingModule } from './edit-routing.module';

import { EditPage } from './edit.page';

// modul halaman ubah produk, mengumpulkan semua yang dibutuhkan halaman ini
@NgModule({
  // commonmodule untuk ngif dan ngfor, formsmodule untuk ngmodel, ionicmodule untuk komponen ionic, lalu modul routing milik halaman ini
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPageRoutingModule
  ],

  // komponen halaman yang dimiliki modul ini, harus dideklarasikan supaya bisa dipakai di template
  declarations: [EditPage]
})
export class EditPageModule {}
