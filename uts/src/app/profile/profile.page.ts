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

  saveProfile() {
    
    if (this.username != "") {
      this.isEmptyUsername = false;
      this.accService.changeUsername(this.username);
    }
    else {
      this.isEmptyUsername = true;
    }
    

    // does not check if profile picture is empty
    this.accService.changeProfilePicture(this.url);
    alert(this.accService.getProfilePicture())
    alert(this.accService.getUsername());
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
