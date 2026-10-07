import { Service } from '@angular/core';

// satu instance dipakai bersama oleh semua halaman, jadi status login dan data akun sama di seluruh aplikasi
@Service()
export class AccountService {
  private user = { // data akun yang sedang dipakai, hanya tersimpan di memori
    id: 0,
    username: 'admin',
    password: 'admin123',
    profilePicture:
      'https://images.alodokter.com/dk0z4ums3/image/upload/v1661753020/attached_image/inilah-cara-merawat-anak-kucing-yang-tepat.jpg',
  };

  // BYPASS LOGIN UNTUK MEMUDAHKAN TESTING
  isLogin = true;

  // memeriksa username dan password, kalau cocok maka status login menjadi true
  checkLogin(user_: string, pass_: string): boolean {
    // username dan password harus sama dengan data akun
    if (user_ == this.user.username && pass_ == this.user.password) {
      this.isLogin = true;
      return true;
    } else {
      return false;
    }
  }

  // mengganti password kalau password lama benar, mengembalikan true kalau berhasil
  changePassword(userId: number, oldPass_: string, newPass_: string): boolean {
    // password lama harus sama dengan password yang tersimpan
    if (
      this.user.password == oldPass_
    ) {
      this.user.password = newPass_;
      return true;
    } else {
      return false;
    }
  }

  // mengganti username akun
  changeUsername(username : string) {
    this.user.username = username;
  }

  // mengambil username akun saat ini
  getUsername(): string {
    return this.user.username;
  }

  // mengganti url foto profil akun
  changeProfilePicture(url : string) {
    this.user.profilePicture = url;
  }

  // mengambil url foto profil akun saat ini
  getProfilePicture(): string {
    return this.user.profilePicture;
  }

  // keluar dengan menjadikan status login false, halaman yang memeriksa status ini akan mengarahkan kembali ke login
  logout() {
    this.isLogin = false;
  }
}
