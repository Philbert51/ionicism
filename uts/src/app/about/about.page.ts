import { Component, OnInit } from '@angular/core';

// halaman tentang aplikasi, isinya hanya ada di file html dan tidak butuh logika
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: false,
})
export class AboutPage implements OnInit {

  // tidak ada service yang dibutuhkan halaman ini
  constructor() { }

  // kosong, tidak ada yang perlu disiapkan saat halaman dibuat
  ngOnInit() {
  }

}
