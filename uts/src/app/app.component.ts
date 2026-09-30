import { Component } from '@angular/core';
import { Theme } from "./theme";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(public theme : Theme) {}
  lightTheme = { 
  '--ion-background-color': '#ffffff',
  '--ion-text-color': 'black',
  '--ion-card-background' : '#03AC0E',
  '--ion-toolbar-background' : '#03AC0E',
  "--ion-tab-bar-background" : "#03AC0E",

  '--ion-color-primary': '#c8d41c',
  '--ion-color-primary-rgb': '200,212,28',
  '--ion-color-primary-contrast': '#000000',
  '--ion-color-primary-contrast-rgb': '0,0,0',
  '--ion-color-primary-shade': '#b0bb19',
  '--ion-color-primary-tint': '#ced833',

  '--ion-color-secondary': '#00ff11',
  '--ion-color-secondary-rgb': '0,255,17',
  '--ion-color-secondary-contrast': '#000000',
  '--ion-color-secondary-contrast-rgb': '0,0,0',
  '--ion-color-secondary-shade': '#00e00f',
  '--ion-color-secondary-tint': '#1aff29',

  '--ion-color-tertiary': '#6030ff',
  '--ion-color-tertiary-rgb': '96,48,255',
  '--ion-color-tertiary-contrast': '#ffffff',
  '--ion-color-tertiary-contrast-rgb': '255,255,255',
  '--ion-color-tertiary-shade': '#542ae0',
  '--ion-color-tertiary-tint': '#7045ff',

  '--ion-color-success': '#2dd55b',
  '--ion-color-success-rgb': '45,213,91',
  '--ion-color-success-contrast': '#000000',
  '--ion-color-success-contrast-rgb': '0,0,0',
  '--ion-color-success-shade': '#28bb50',
  '--ion-color-success-tint': '#42d96b',

  '--ion-color-warning': '#ffc409',
  '--ion-color-warning-rgb': '255,196,9',
  '--ion-color-warning-contrast': '#000000',
  '--ion-color-warning-contrast-rgb': '0,0,0',
  '--ion-color-warning-shade': '#e0ac08',
  '--ion-color-warning-tint': '#ffca22',

  '--ion-color-danger': '#c5000f',
  '--ion-color-danger-rgb': '197,0,15',
  '--ion-color-danger-contrast': '#ffffff',
  '--ion-color-danger-contrast-rgb': '255,255,255',
  '--ion-color-danger-shade': '#ad000d',
  '--ion-color-danger-tint': '#cb1a27',

  '--ion-color-light': '#fff700',
  '--ion-color-light-rgb': '255,247,0',
  '--ion-color-light-contrast': '#000000',
  '--ion-color-light-contrast-rgb': '0,0,0',
  '--ion-color-light-shade': '#e0d900',
  '--ion-color-light-tint': '#fff81a',

  '--ion-color-medium': '#8f8a00',
  '--ion-color-medium-rgb': '143,138,0',
  '--ion-color-medium-contrast': '#000000',
  '--ion-color-medium-contrast-rgb': '0,0,0',
  '--ion-color-medium-shade': '#7e7900',
  '--ion-color-medium-tint': '#9a961a',

  '--ion-color-dark': '#0e7500',
  '--ion-color-dark-rgb': '14,117,0',
  '--ion-color-dark-contrast': '#ffffff',
  '--ion-color-dark-contrast-rgb': '255,255,255',
  '--ion-color-dark-shade': '#0c6700',
  '--ion-color-dark-tint': '#26831a',
};

  darkTheme = {
  '--ion-background-color': 'black',
  '--ion-text-color': '#b0bb19',
  '--ion-card-background' : '#03AC0E',
  '--ion-toolbar-background' : '#03AC0E',
  "--ion-tab-bar-background" : "#03AC0E",

  "--ion-color-primary": "#FFC409",
  "--ion-color-primary-rgb": "255,196,9",
  "--ion-color-primary-contrast": "#000000",
  "--ion-color-primary-contrast-rgb": "0,0,0",
  "--ion-color-primary-shade": "#e0ac08",
  "--ion-color-primary-tint": "#ffca22",

  '--ion-color-secondary': '#00ff11',
  '--ion-color-secondary-rgb': '0,255,17',
  '--ion-color-secondary-contrast': '#000000',
  '--ion-color-secondary-contrast-rgb': '0,0,0',
  '--ion-color-secondary-shade': '#00e00f',
  '--ion-color-secondary-tint': '#1aff29',

  '--ion-color-tertiary': '#6030ff',
  '--ion-color-tertiary-rgb': '96,48,255',
  '--ion-color-tertiary-contrast': '#ffffff',
  '--ion-color-tertiary-contrast-rgb': '255,255,255',
  '--ion-color-tertiary-shade': '#542ae0',
  '--ion-color-tertiary-tint': '#7045ff',

  '--ion-color-success': '#2dd55b',
  '--ion-color-success-rgb': '45,213,91',
  '--ion-color-success-contrast': '#000000',
  '--ion-color-success-contrast-rgb': '0,0,0',
  '--ion-color-success-shade': '#28bb50',
  '--ion-color-success-tint': '#42d96b',

  '--ion-color-warning': '#ffc409',
  '--ion-color-warning-rgb': '255,196,9',
  '--ion-color-warning-contrast': '#000000',
  '--ion-color-warning-contrast-rgb': '0,0,0',
  '--ion-color-warning-shade': '#e0ac08',
  '--ion-color-warning-tint': '#ffca22',

  '--ion-color-danger': '#c5000f',
  '--ion-color-danger-rgb': '197,0,15',
  '--ion-color-danger-contrast': '#ffffff',
  '--ion-color-danger-contrast-rgb': '255,255,255',
  '--ion-color-danger-shade': '#ad000d',
  '--ion-color-danger-tint': '#cb1a27',

  '--ion-color-light': '#fff700',
  '--ion-color-light-rgb': '255,247,0',
  '--ion-color-light-contrast': '#000000',
  '--ion-color-light-contrast-rgb': '0,0,0',
  '--ion-color-light-shade': '#e0d900',
  '--ion-color-light-tint': '#fff81a',

  '--ion-color-medium': '#8f8a00',
  '--ion-color-medium-rgb': '143,138,0',
  '--ion-color-medium-contrast': '#000000',
  '--ion-color-medium-contrast-rgb': '0,0,0',
  '--ion-color-medium-shade': '#7e7900',
  '--ion-color-medium-tint': '#9a961a',

  '--ion-color-dark': '#0e7500',
  '--ion-color-dark-rgb': '14,117,0',
  '--ion-color-dark-contrast': '#ffffff',
  '--ion-color-dark-contrast-rgb': '255,255,255',
  '--ion-color-dark-shade': '#0c6700',
  '--ion-color-dark-tint': '#26831a',
};
}
