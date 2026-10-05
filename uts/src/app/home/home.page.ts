import { Component } from '@angular/core';
import { AccountService } from '../account-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (this.accountService.isLogin == false) {
      this.router.navigate(['/login']);
    }
  }

  ionViewDidEnter() {
    if (this.accountService.isLogin == false) {
      this.router.navigate(['/login']);
    }
  }

  getUsername():string{
    return this.accountService.getUsername();
  }
}
