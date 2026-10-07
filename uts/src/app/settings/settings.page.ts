import { Component, OnInit } from '@angular/core';
import { Theme } from "../theme";

// halaman pengaturan, berisi pilihan mode gelap
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {

  // angular memberikan theme yang dipakai bersama, public supaya html bisa terhubung langsung ke theme.isdark
  constructor(public theme : Theme) { }

  // kosong, tidak ada yang perlu disiapkan saat halaman dibuat
  ngOnInit() {
  }


}
