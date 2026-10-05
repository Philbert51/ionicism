import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  username = '';
  password = '';

  constructor(private router: Router, private accountService: AccountService) {}

  ngOnInit() {
  }

  login() {
    if (this.accountService.checkLogin(this.username, this.password)) {
      this.router.navigate(['/home']);
    } else {
      alert('Invalid username or password');
    }
  }
}
