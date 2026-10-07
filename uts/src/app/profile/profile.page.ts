import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  username : string = "";
  oldPassword : string = "";
  newPassword : string = "";
  confirmPassword : string = "";
  url : string = "";
  isMismatch : boolean = false;
  isIncorrect : boolean = false;
  isEmptyUsername : boolean = false;

  constructor(public accService : AccountService) { }

  ngOnInit() {
    this.url = this.accService.getProfilePicture();
    this.username = this.accService.getUsername();
  }

  isValid(): boolean {
    const url = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/;
    return url.test(this.url) || this.url == "";
  }

  saveProfile() {
    
    if (this.username != "") {
      this.isEmptyUsername = false;
      this.accService.changeUsername(this.username);
    }
    else {
      this.isEmptyUsername = true;
    }
    

    // does not check if profile picture is empty
    if (this.isValid()){
      this.accService.changeProfilePicture(this.url);
    }
    else {
      this.accService.changeProfilePicture("");
    }
  }

  changePassword() { 
    if (this.newPassword != this.confirmPassword) {
      this.isMismatch = true;
      return; // returns and set mismatch to true if password and confirm doesn't match
    }
    
    
    // not checking for an empty password
    // check if password is correct, password changes in accService.
    // hardcoded 0 for now
    if (this.accService.changePassword(0, this.oldPassword, this.newPassword)) {

      this.isIncorrect = false;
    }
    else {

      this.isIncorrect = true;
    }
  }
}
