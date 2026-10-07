import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account-service';
import { AnimationController } from "@ionic/angular";

// halaman login, kartu login dan judulnya muncul dengan animasi
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  username = ''; // teks username yang diketik, terhubung dua arah ke input
  password = ''; // teks password yang diketik, terhubung dua arah ke input

  // angular memberikan router, account service, dan pembuat animasi dari ionic yang dipakai bersama
  constructor(private router: Router, private accountService: AccountService, public animCtrl : AnimationController) { }

  // kosong, tidak ada yang perlu disiapkan saat halaman dibuat
  ngOnInit() {
  }

  // jalan setiap kali halaman login ditampilkan, memutar animasi masuk
  ionViewDidEnter() {
    // ambil elemen kartu login dan judul dari dom
    // as htmlelement memberi tahu typescript bahwa hasilnya pasti ada, padahal queryselector bisa mengembalikan null
    const loginCard = document.querySelector(".login-card") as HTMLElement; // as HTMLElement = trust me bro it will never be null
    const headerText = document.querySelector(".header-section") as HTMLElement;

    // animasi kartu login: muncul pelan, lalu naik ke posisinya
    // setelah animasi naik selesai, judul dimunculkan dengan cara yang sama
    //<animations>
    this.animCtrl.create().addElement(loginCard).duration(700).fromTo("opacity", 0, 1).easing("ease-out").play().then();

    // animasi naik berjalan bersamaan dengan animasi muncul pelan di atas, play mengembalikan promise jadi then menunggu animasi ini selesai
    this.animCtrl.create().addElement(loginCard).duration(500).fromTo("transform", "translateY(70px)", "translateY(0)").easing("ease-out").play().then(() => {
      // judul dimunculkan pelan sambil naik, dijalankan setelah animasi kartu selesai
      this.animCtrl.create().addElement(headerText).duration(300).fromTo("opacity", 0, 1).easing("ease-out").play();
      this.animCtrl.create().addElement(headerText).duration(500).fromTo("transform", "translateY(70px)", "translateY(0)").easing("ease-out").play()
    });
    //</animations>
  }

  // jalan sebelum halaman ditinggalkan, kartu dan judul dibuat transparan lagi
  ionViewWillLeave () {
    // ambil lagi elemen kartu login dan judul dari dom
    const loginCard = document.querySelector(".login-card") as HTMLElement; // as HTMLElement = trust me bro it will never be null
    const headerText = document.querySelector(".header-section") as HTMLElement;

    // opacity diatur lewat style langsung, nilainya berupa teks
    loginCard.style.opacity = "0";
    headerText.style.opacity = "0"; 
  }

  // memeriksa username dan password lewat account service, kalau cocok pindah ke dashboard, kalau tidak tampilkan peringatan
  login() {
    if (this.accountService.checkLogin(this.username, this.password)) {
      // login berhasil, pindah ke dashboard
      this.router.navigate(['/dashboard']);
    } else {
      // login gagal, pengguna tetap di halaman login
      alert('Invalid username or password');
    }
  }
}
