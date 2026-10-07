import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account-service';

// halaman profil, untuk mengganti foto profil, username, dan password
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  username : string = ""; // username yang diedit, diisi dari account service dan terhubung dua arah ke input
  oldPassword : string = ""; // password lama yang diketik, diperiksa oleh account service sebelum password diganti
  newPassword : string = ""; // password baru yang diketik
  confirmPassword : string = ""; // pengetikan ulang password baru, harus sama dengan newpassword
  url : string = ""; // url foto profil, diisi dari account service dan terhubung dua arah ke textarea
  isMismatch : boolean = false; // true kalau password baru dan konfirmasinya berbeda saat tombol ditekan
  isIncorrect : boolean = false; // true kalau password lama salah, memunculkan chip error
  isEmptyUsername : boolean = false; // true kalau username dikosongkan saat menyimpan, memunculkan chip error

  // angular memberikan account service yang dipakai bersama
  constructor(public accService : AccountService) { }

  // ionic menyimpan halaman di cache, jadi fungsi ini hanya jalan sekali dan tidak di setiap kunjungan
  ngOnInit() {
    // ambil url foto dan username yang tersimpan untuk mengisi form
    this.url = this.accService.getProfilePicture();
    this.username = this.accService.getUsername();
  }

  // true kalau url foto kosong atau formatnya benar, dipakai layar untuk memilih foto dan memunculkan chip error
  // peringatan: hanya memeriksa format url, bukan memastikan gambarnya benar benar ada
  isValid(): boolean {
    // pola regex: diawali http atau https, lalu nama domain, titik, dan akhiran domain
    const url = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/;

    // test mengembalikan true kalau teks cocok dengan pola, url kosong juga dianggap valid
    return url.test(this.url) || this.url == "";
  }

  // menyimpan username dan foto profil ke account service
  saveProfile() {
    
    // username hanya disimpan kalau tidak kosong, kalau kosong chip error ditampilkan
    if (this.username != "") {
      this.isEmptyUsername = false;
      this.accService.changeUsername(this.username);
    }
    else {
      this.isEmptyUsername = true;
    }
    

    // foto profil hanya disimpan kalau url valid, kalau tidak valid foto dikosongkan
    // does not check if profile picture is empty
    if (this.isValid()){
      this.accService.changeProfilePicture(this.url);
    }
    else {
      // url tidak valid, jadi foto profil yang tersimpan dikosongkan
      this.accService.changeProfilePicture("");
    }
  }

  // mengganti password, password baru dan konfirmasi harus sama lalu password lama diperiksa oleh account service
  changePassword() { 
    // password baru dan konfirmasi berbeda, jadi tandai lalu hentikan fungsi
    if (this.newPassword != this.confirmPassword) {
      // peringatan: nilai ini tidak pernah dikembalikan ke false di mana pun dan tidak dipakai oleh layar
      this.isMismatch = true;
      return; // returns and set mismatch to true if password and confirm doesn't match
    }
    
    
    // account service mengembalikan true kalau password lama benar dan langsung menggantinya
    // id pengguna diisi 0 karena hanya ada satu akun di account service
    // not checking for an empty password
    // check if password is correct, password changes in accService.
    // hardcoded 0 for now
    if (this.accService.changePassword(0, this.oldPassword, this.newPassword)) {

      // password lama benar, jadi chip error disembunyikan
      this.isIncorrect = false;
    }
    else {

      // password lama salah, jadi chip error ditampilkan
      this.isIncorrect = true;
    }
  }
}
