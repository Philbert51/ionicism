import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  username = '';
  password = '';

  constructor(private router: Router) {}

  ngOnInit() {
  }

  login() {
    if (this.username === 'admin' && this.password === 'admin123') {
      alert('Login successful!');
      this.router.navigate(['/home']);
    } else {
      alert('Invalid username or password');
    }
  }
}
