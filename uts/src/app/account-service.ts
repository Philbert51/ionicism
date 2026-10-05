import { Service } from '@angular/core';

@Service()
export class AccountService {
  private user = {
    id: 0,
    username: 'admin',
    password: 'admin123',
    profilePicture:
      'https://images.alodokter.com/dk0z4ums3/image/upload/v1661753020/attached_image/inilah-cara-merawat-anak-kucing-yang-tepat.jpg',
  };

  // BYPASS LOGIN UNTUK MEMUDAHKAN TESTING
  isLogin = true;

  checkLogin(user_: string, pass_: string): boolean {
    if (user_ == this.user.username && pass_ == this.user.password) {
      this.isLogin = true;
      return true;
    } else {
      return false;
    }
  }

  changePassword(userId: number, oldPass_: string, newPass_: string): boolean {
    if (
      this.user.password == oldPass_ &&
      this.user.password == newPass_
    ) {
      this.user.password = newPass_;
      return true;
    } else {
      return false;
    }
  }

  getUsername(): string {
    return this.user.username;
  }

  getProfilePicture(): string {
    return this.user.profilePicture;
  }

  logout() {
    this.isLogin = false;
  }
}
