/*=========================
Name: Brittany Dockter, Justin Singleton, Gabriel Sanchez
Date: April 19, 2020
Assignment: account registration backend
Description: form functions for account reg page
==========================*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-account-registration',
  templateUrl: './account-registration.component.html',
  styleUrls: ['./account-registration.component.css']
})
export class AccountRegistrationComponent implements OnInit {
  securityQuestions: any;
  form: FormGroup;
  registrationForm: FormGroup;
  errorMessage: string;

  constructor(private http: HttpClient, private route: Router, private fb: FormBuilder, private cookieService: CookieService) {
    this.http.get('/api/security-questions').subscribe(res => {
      this.securityQuestions = res;
    }, err => {
      console.log(err);
    });
   }
// registration form fields, requiring to be validated by the database
  ngOnInit() {
    this.registrationForm = new FormGroup({
      contactInformation: new FormGroup({
        firstname: new FormControl(null, Validators.required),
        lastname: new FormControl(null, Validators.required),
        phoneNumber: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required)
      }),
      // required security question fields that have to be validated from the database
      securityQuestions: new FormGroup({
        securityQuestion1: new FormControl(null, Validators.required),
        securityQuestion2: new FormControl(null, Validators.required),
        securityQuestion3: new FormControl(null, Validators.required),
        answerToSecurityQuestion1: new FormControl(null, Validators.required),
        answerToSecurityQuestion2: new FormControl(null, Validators.required),
        answerToSecurityQuestion3: new FormControl(null, Validators.required)
      }),
      // login information validated by the database
      credentials: new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
      })
    });
  }
// the 3 parts of the form are constant
  register(form) {
    const contactInformation = form.contactInformation;
    const securityQuestions = form.securityQuestions;
    const credentials = form.credentials;

    // security questions are bound to the corresponding answers for validation
    const selectedSecurityQuestions = [
      {questionId: securityQuestions.securityQuestion1,
      answer: securityQuestions.answerToSecurityQuestion1},

      {questionId: securityQuestions.securityQuestion2,
      answer: securityQuestions.answerToSecurityQuestion2},

      {questionId: securityQuestions.securityQuestion3,
      answer: securityQuestions.answerToSecurityQuestion3}
    ];
// register a user by posting the required fields to the database,
// allowing the user to then login and use cookies to authenticate the user
// using proper error handling in the event that a user logs in with incorrect
// credentials or invalid data
    this.http.post('/api/session/register', {
      username: credentials.username,
      password: credentials.password,
      firstname: contactInformation.firstname,
      lastname: contactInformation.lastname,
      phoneNumber: contactInformation.phoneNumber,
      address: contactInformation.address,
      email: contactInformation.email,
      securityQuestion: selectedSecurityQuestions
    }).subscribe(res => {
      if (res['auth']) {
        this.cookieService.set('isAuthenticated', 'true', 1);
        this.cookieService.set('username', credentials.username, 1);
        this.route.navigate(['/']);
      } else {
        this.errorMessage = res['text'];
      }
    }, err => {
      console.log(err);
      this.errorMessage = err;
    });
  }
}
