import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  username = '';
  password = '';

  constructor() {}

  ngOnInit() {
  }

  login() {
    if (this.username === 'admin' && this.password === 'admin123') {
      alert('Login successful!');
    } else {
      alert('Invalid username or password');
    }
  }
}
