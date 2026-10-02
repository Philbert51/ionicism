import { Component, OnInit } from '@angular/core';
import { Theme } from "../theme";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {

  constructor(public theme : Theme) { }

  ngOnInit() {
  }


}
