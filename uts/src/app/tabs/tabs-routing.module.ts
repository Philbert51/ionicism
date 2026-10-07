import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

// rute tab: komponen tabs menjadi kerangka dan setiap halaman menjadi anak yang tampil di dalamnya
const routes: Routes = [
  {
    // alamat kosong menampilkan kerangka tab, rute di dalam children tampil di dalam kerangka ini
    path: '',
    component: TabsPage,

    // halaman yang tampil di dalam bilah tab, masing masing dimuat secara lazy dari modulnya sendiri
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'order',
        loadChildren: () => import('../order/order.module').then(m => m.OrderPageModule)
      },
      {
        path: 'transactionhistory',
        loadChildren: () => import('../transactionhistory/transactionhistory.module').then(m => m.TransactionhistoryPageModule)
      },
      {
        path: 'product',
        loadChildren: () => import('../product/product.module').then(m => m.ProductPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../about/about.module').then(m => m.AboutPageModule)
      },
      {
        // peringatan: alamat order sudah didaftarkan di atas, jadi rute ini tidak pernah dicapai karena rute dicocokkan dari atas ke bawah
        path : "order",
        loadChildren: () => {return import("../order/order.module").then(m => m.OrderPageModule);}
      },
      {
        // alamat kosong dialihkan ke dashboard, pathmatch full berarti hanya berlaku kalau alamatnya benar benar kosong
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

// modul routing halaman tab
@NgModule({
  // forchild dipakai karena rute ini ditempel ke rute induk, bukan rute utama aplikasi
  imports: [RouterModule.forChild(routes)],

  // agar direktif router bisa dipakai oleh modul yang mengimpor modul ini
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
