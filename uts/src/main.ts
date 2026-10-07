import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// menjalankan aplikasi dengan appmodule sebagai modul utama
// kalau gagal dimulai, error ditampilkan di konsol
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
