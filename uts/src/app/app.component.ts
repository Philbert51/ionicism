import { Component } from '@angular/core';
import { Theme } from './theme';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(public theme: Theme) {}
  lightTheme = {
    // --- Latar Belakang & Teks Netral (Bersih & Terang) ---
    '--ion-background-color': '#f9fafb', // Abu-abu sangat muda agar tidak terlalu silau
    '--ion-text-color': '#111827', // Abu-abu sangat gelap (lebih lembut dari hitam pekat)
    '--ion-card-background': '#ffffff', // Putih bersih untuk menonjolkan elemen
    '--ion-toolbar-background': '#ffffff',
    '--ion-tab-bar-background': '#ffffff',

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
    '--ion-color-light': '#f3f4f6',
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
  };

  darkTheme = {
    // --- Latar Belakang & Teks Netral (Elegan & Nyaman di Mata) ---
    '--ion-background-color': '#121212', // Standar Dark Mode Material Design
    '--ion-text-color': '#f9fafb', // Putih keabu-abuan agar tidak silau
    '--ion-card-background': '#1e1e1e', // Sedikit lebih terang dari background agar elemen menonjol
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
    '--ion-color-light': '#1f2937', // Dibalik: light menjadi gelap di dark mode
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
  };
}
