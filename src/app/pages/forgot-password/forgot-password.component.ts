/*=========================
Name: Brittany Dockter, Justin Singleton, Gabriel Sanchez
Date: April 19, 2020
Assignment: forgot password backend
Description: reset password functions
==========================*/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
// authenticates the username that needs a password change to tell
// the database which user is changing their password so it can log it
export class ForgotPasswordComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
