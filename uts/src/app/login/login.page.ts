import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account-service';
import { AnimationController } from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  username = '';
  password = '';

  constructor(private router: Router, private accountService: AccountService, public animCtrl : AnimationController) { }

  ngOnInit() {

    //<animations>
    const loginCard = document.querySelector(".login-card") as HTMLElement; // as HTMLElement = trust me bro it will never be null
    const headerText = document.querySelector(".header-section") as HTMLElement;
    this.animCtrl.create().addElement(loginCard).duration(700).fromTo("opacity", 0, 1).easing("ease-out").play().then();
    this.animCtrl.create().addElement(loginCard).duration(500).fromTo("transform", "translateY(70px)", "translateY(0)").easing("ease-out").play().then(() => {
      this.animCtrl.create().addElement(headerText).duration(300).fromTo("opacity", 0, 1).easing("ease-out").play();
      this.animCtrl.create().addElement(headerText).duration(500).fromTo("transform", "translateY(70px)", "translateY(0)").easing("ease-out").play()
    });
    //</animations>

  }

  login() {
    if (this.accountService.checkLogin(this.username, this.password)) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid username or password');
    }
  }
}
