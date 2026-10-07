import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular/lazy';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// modul utama aplikasi, mendaftarkan komponen akar dan modul yang dibutuhkan
@NgModule({
  // komponen yang dimiliki modul ini
  declarations: [AppComponent],

  // modul yang dibutuhkan: browser, ionic, dan routing aplikasi
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],

  // strategi route ionic membuat halaman bisa disimpan di cache dan transisinya seperti aplikasi mobile
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],

  // komponen yang pertama dimuat saat aplikasi dijalankan
  bootstrap: [AppComponent],
})
export class AppModule {}
