import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [ // daftar rute utama aplikasi, dicocokkan dari atas ke bawah
  {
    // alamat kosong langsung dialihkan ke halaman login
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    // halaman login dimuat secara lazy dari modulnya sendiri
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    // semua halaman lain berada di dalam tab dan dimuat secara lazy dari modul tab
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }
];

// modul routing utama aplikasi
@NgModule({
  imports: [
    // preloadallmodules membuat semua modul lazy dimuat di latar belakang setelah aplikasi berjalan
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],

  // agar direktif router bisa dipakai oleh modul yang mengimpor modul ini
  exports: [RouterModule]
})
export class AppRoutingModule { }
