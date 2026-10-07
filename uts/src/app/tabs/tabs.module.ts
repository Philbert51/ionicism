import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';

// modul halaman tab, mengumpulkan semua yang dibutuhkan halaman ini
@NgModule({
  // commonmodule untuk ngif dan ngfor, formsmodule untuk ngmodel, ionicmodule untuk komponen ionic, lalu modul routing milik halaman ini
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule
  ],

  // komponen halaman yang dimiliki modul ini, harus dideklarasikan supaya bisa dipakai di template
  declarations: [TabsPage]
})
export class TabsPageModule {}
