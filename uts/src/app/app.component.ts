import { Component } from '@angular/core';
import { Theme } from './theme';
import { AccountService } from './account-service';
import { Router } from '@angular/router';

// komponen akar aplikasi, berisi menu samping dan router outlet utama
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  // theme menyimpan pilihan mode gelap, account service dan router dipakai saat logout
  constructor(public theme: Theme, private accountService : AccountService, private router: Router) {}
  lightTheme = { // kumpulan variabel css ionic untuk mode terang, dipasang lewat ngstyle di app.component.html
    // --- Latar Belakang & Teks Netral (Bersih & Terang) ---
    '--ion-background-color': '#f9fafb', // Abu-abu sangat muda agar tidak terlalu silau
    '--ion-text-color': '#111827', // Abu-abu sangat gelap (lebih lembut dari hitam pekat)
    '--ion-text-color-rgb': '17,24,39',

    '--ion-card-background': '#ffffff', // Putih bersih untuk menonjolkan elemen
    '--ion-toolbar-background': '#ffffff',
    '--ion-tab-bar-background': '#ffffff',

    '--ion-list-background': '#ededed',
    '--ion-item-background': '#ededed',
    '--ion-header-background': '#ededed',

    '--ion-card-color': '--ion-color-medium',

    // --- Warna Utama: Oranye Modern ---
    '--ion-color-primary': '#f97316',
    '--ion-color-primary-rgb': '249,115,22',
    '--ion-color-primary-contrast': '#ffffff',
    '--ion-color-primary-contrast-rgb': '255,255,255',
    '--ion-color-primary-shade': '#db6513',
    '--ion-color-primary-tint': '#fa812d',

    // --- Warna Sekunder: Biru Profesional (Cocok dengan Oranye) ---
    '--ion-color-secondary': '#3b82f6',
    '--ion-color-secondary-rgb': '59,130,246',
    '--ion-color-secondary-contrast': '#ffffff',
    '--ion-color-secondary-contrast-rgb': '255,255,255',
    '--ion-color-secondary-shade': '#3472d8',
    '--ion-color-secondary-tint': '#4f8ff7',

    // --- Warna Tersier: Teal / Hijau Kebiruan ---
    '--ion-color-tertiary': '#14b8a6',
    '--ion-color-tertiary-rgb': '20,184,166',
    '--ion-color-tertiary-contrast': '#ffffff',
    '--ion-color-tertiary-contrast-rgb': '255,255,255',
    '--ion-color-tertiary-shade': '#12a292',
    '--ion-color-tertiary-tint': '#2cbfaf',

    // --- Warna Status: Terang & Ramah Mata ---
    '--ion-color-success': '#10b981',
    '--ion-color-success-rgb': '16,185,129',
    '--ion-color-success-contrast': '#ffffff',
    '--ion-color-success-contrast-rgb': '255,255,255',
    '--ion-color-success-shade': '#0ea371',
    '--ion-color-success-tint': '#28c08e',

    '--ion-color-warning': '#f59e0b',
    '--ion-color-warning-rgb': '245,158,11',
    '--ion-color-warning-contrast': '#000000',
    '--ion-color-warning-contrast-rgb': '0,0,0',
    '--ion-color-warning-shade': '#d88b0a',
    '--ion-color-warning-tint': '#f6a823',

    '--ion-color-danger': '#ef4444',
    '--ion-color-danger-rgb': '239,68,68',
    '--ion-color-danger-contrast': '#ffffff',
    '--ion-color-danger-contrast-rgb': '255,255,255',
    '--ion-color-danger-shade': '#d23c3c',
    '--ion-color-danger-tint': '#f15757',

    // --- Warna Monokrom (Abu-abu) ---
    '--ion-color-light': '#ebedf0',
    '--ion-color-light-rgb': '243,244,246',
    '--ion-color-light-contrast': '#000000',
    '--ion-color-light-contrast-rgb': '0,0,0',
    '--ion-color-light-shade': '#d6d7d8',
    '--ion-color-light-tint': '#f4f5f7',

    '--ion-color-medium': '#9ca3af',
    '--ion-color-medium-rgb': '156,163,175',
    '--ion-color-medium-contrast': '#000000',
    '--ion-color-medium-contrast-rgb': '0,0,0',
    '--ion-color-medium-shade': '#898f9a',
    '--ion-color-medium-tint': '#a6acb7',

    '--ion-color-dark': '#1f2937',
    '--ion-color-dark-rgb': '31,41,55',
    '--ion-color-dark-contrast': '#ffffff',
    '--ion-color-dark-contrast-rgb': '255,255,255',
    '--ion-color-dark-shade': '#1b2430',
    '--ion-color-dark-tint': '#353e4b',

    // Color Step
    '--ion-text-color-step-50': '#1d2332',
    '--ion-text-color-step-100': '#282f3c',
    '--ion-text-color-step-150': '#343a47',
    '--ion-text-color-step-200': '#3f4551',
    '--ion-text-color-step-250': '#4b515c',
    '--ion-text-color-step-300': '#575c67',
    '--ion-text-color-step-350': '#626771',
    '--ion-text-color-step-400': '#6e727c',
    '--ion-text-color-step-450': '#797e86',
    '--ion-text-color-step-500': '#858991',
    '--ion-text-color-step-550': '#91949c',
    '--ion-text-color-step-600': '#9ca0a6',
    '--ion-text-color-step-650': '#a8abb1',
    '--ion-text-color-step-700': '#b3b6bb',
    '--ion-text-color-step-750': '#bfc2c6',
    '--ion-text-color-step-800': '#cbcdd1',
    '--ion-text-color-step-850': '#d6d8db',
    '--ion-text-color-step-900': '#e2e3e6',
    '--ion-text-color-step-950': '#edeff0',

    '--ion-background-color-step-50': '#edeff0',
    '--ion-background-color-step-100': '#e2e3e6',
    '--ion-background-color-step-150': '#d6d8db',
    '--ion-background-color-step-200': '#cbcdd1',
    '--ion-background-color-step-250': '#bfc2c6',
    '--ion-background-color-step-300': '#b3b6bb',
    '--ion-background-color-step-350': '#a8abb1',
    '--ion-background-color-step-400': '#9ca0a6',
    '--ion-background-color-step-450': '#91949c',
    '--ion-background-color-step-500': '#858991',
    '--ion-background-color-step-550': '#797e86',
    '--ion-background-color-step-600': '#6e727c',
    '--ion-background-color-step-650': '#626771',
    '--ion-background-color-step-700': '#575c67',
    '--ion-background-color-step-750': '#4b515c',
    '--ion-background-color-step-800': '#3f4551',
    '--ion-background-color-step-850': '#343a47',
    '--ion-background-color-step-900': '#282f3c',
    '--ion-background-color-step-950': '#1d2332',
  };

  darkTheme = { // kumpulan variabel css ionic untuk mode gelap
    // --- Latar Belakang & Teks Netral (Elegan & Nyaman di Mata) ---
    '--ion-background-color': '#121212', // Standar Dark Mode Material Design
    '--ion-text-color': '#f9fafb', // Putih keabu-abuan agar tidak silau
    '--ion-text-color-rgb': '249,250,251',
    '--ion-card-background': '#1e1e1e', // Sedikit lebih terang dari background agar elemen menonjol
    '--ion-background-color-rgb': '18,18,18',
    '--ion-toolbar-background': '#1e1e1e',
    '--ion-tab-bar-background': '#1e1e1e',

    // --- Warna Utama: Oranye Modern (Sama dengan Light Mode agar konsisten) ---
    '--ion-color-primary': '#f97316',
    '--ion-color-primary-rgb': '249,115,22',
    '--ion-color-primary-contrast': '#ffffff',
    '--ion-color-primary-contrast-rgb': '255,255,255',
    '--ion-color-primary-shade': '#db6513',
    '--ion-color-primary-tint': '#fa812d',

    // --- Warna Sekunder & Tersier ---
    '--ion-color-secondary': '#3b82f6',
    '--ion-color-secondary-rgb': '59,130,246',
    '--ion-color-secondary-contrast': '#ffffff',
    '--ion-color-secondary-contrast-rgb': '255,255,255',
    '--ion-color-secondary-shade': '#3472d8',
    '--ion-color-secondary-tint': '#4f8ff7',

    '--ion-color-tertiary': '#14b8a6',
    '--ion-color-tertiary-rgb': '20,184,166',
    '--ion-color-tertiary-contrast': '#ffffff',
    '--ion-color-tertiary-contrast-rgb': '255,255,255',
    '--ion-color-tertiary-shade': '#12a292',
    '--ion-color-tertiary-tint': '#2cbfaf',

    // --- Warna Status ---
    '--ion-color-success': '#10b981',
    '--ion-color-success-rgb': '16,185,129',
    '--ion-color-success-contrast': '#ffffff',
    '--ion-color-success-contrast-rgb': '255,255,255',
    '--ion-color-success-shade': '#0ea371',
    '--ion-color-success-tint': '#28c08e',

    '--ion-color-warning': '#f59e0b',
    '--ion-color-warning-rgb': '245,158,11',
    '--ion-color-warning-contrast': '#000000',
    '--ion-color-warning-contrast-rgb': '0,0,0',
    '--ion-color-warning-shade': '#d88b0a',
    '--ion-color-warning-tint': '#f6a823',

    '--ion-color-danger': '#ef4444',
    '--ion-color-danger-rgb': '239,68,68',
    '--ion-color-danger-contrast': '#ffffff',
    '--ion-color-danger-contrast-rgb': '255,255,255',
    '--ion-color-danger-shade': '#d23c3c',
    '--ion-color-danger-tint': '#f15757',

    // --- Warna Monokrom (Disesuaikan untuk Dark Mode) ---
    '--ion-color-light': '#686d75', // Dibalik: light menjadi gelap di dark mode
    '--ion-color-light-rgb': '31,41,55',
    '--ion-color-light-contrast': '#ffffff',
    '--ion-color-light-contrast-rgb': '255,255,255',
    '--ion-color-light-shade': '#1b2430',
    '--ion-color-light-tint': '#353e4b',

    '--ion-color-medium': '#9ca3af',
    '--ion-color-medium-rgb': '156,163,175',
    '--ion-color-medium-contrast': '#000000',
    '--ion-color-medium-contrast-rgb': '0,0,0',
    '--ion-color-medium-shade': '#898f9a',
    '--ion-color-medium-tint': '#a6acb7',

    '--ion-color-dark': '#f3f4f6', // Dibalik: dark menjadi terang di dark mode
    '--ion-color-dark-rgb': '243,244,246',
    '--ion-color-dark-contrast': '#000000',
    '--ion-color-dark-contrast-rgb': '0,0,0',
    '--ion-color-dark-shade': '#d6d7d8',
    '--ion-color-dark-tint': '#f4f5f7',

    '--ion-text-color-step-50': '#edeeef',
    '--ion-text-color-step-100': '#e2e3e4',
    '--ion-text-color-step-150': '#d6d7d8',
    '--ion-text-color-step-200': '#cbcccc',
    '--ion-text-color-step-250': '#bfc0c1',
    '--ion-text-color-step-300': '#b4b4b5',
    '--ion-text-color-step-350': '#a8a9a9',
    '--ion-text-color-step-400': '#9d9d9e',
    '--ion-text-color-step-450': '#919292',
    '--ion-text-color-step-500': '#868687',
    '--ion-text-color-step-550': '#7a7a7b',
    '--ion-text-color-step-600': '#6e6f6f',
    '--ion-text-color-step-650': '#636364',
    '--ion-text-color-step-700': '#575858',
    '--ion-text-color-step-750': '#4c4c4c',
    '--ion-text-color-step-800': '#404041',
    '--ion-text-color-step-850': '#353535',
    '--ion-text-color-step-900': '#292929',
    '--ion-text-color-step-950': '#1e1e1e',

    '--ion-background-color-step-50': '#1e1e1e',
    '--ion-background-color-step-100': '#292929',
    '--ion-background-color-step-150': '#353535',
    '--ion-background-color-step-200': '#404041',
    '--ion-background-color-step-250': '#4c4c4c',
    '--ion-background-color-step-300': '#575858',
    '--ion-background-color-step-350': '#636364',
    '--ion-background-color-step-400': '#6e6f6f',
    '--ion-background-color-step-450': '#7a7a7b',
    '--ion-background-color-step-500': '#868687',
    '--ion-background-color-step-550': '#919292',
    '--ion-background-color-step-600': '#9d9d9e',
    '--ion-background-color-step-650': '#a8a9a9',
    '--ion-background-color-step-700': '#b4b4b5',
    '--ion-background-color-step-750': '#bfc0c1',
    '--ion-background-color-step-800': '#cbcccc',
    '--ion-background-color-step-850': '#d6d7d8',
    '--ion-background-color-step-900': '#e2e3e4',
    '--ion-background-color-step-950': '#edeeef',
  };

  // dijalankan sekali saat komponen dibuat, saat ini kosong
  ngOnInit(){
  }
  
  // keluar dari akun lalu pindah ke halaman login
  logout(){
    // ubah status login menjadi false
    this.accountService.logout();

    // pindah ke halaman login
    this.router.navigate(['/login']);
  }
}
