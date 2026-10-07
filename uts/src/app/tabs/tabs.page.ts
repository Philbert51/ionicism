import { Component, OnInit } from '@angular/core';

// halaman tab yang berisi bilah tab di bawah layar, isinya hanya ada di file html
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit {

  // tidak ada service yang dibutuhkan halaman ini
  constructor() { }

  // kosong, tidak ada yang perlu disiapkan saat halaman dibuat
  ngOnInit() {
  }

}
