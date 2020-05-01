/*=========================
Name: Brittany Dockter, Justin Singleton, Gabriel Sanchez
Date: April 19, 2020
Assignment: SQ create component.ts
Description: functions for creating SQ's
==========================*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-security-question-create',
  templateUrl: './security-question-create.component.html',
  styleUrls: ['./security-question-create.component.css']
})
export class SecurityQuestionCreateComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) { }
  form: FormGroup;
  ngOnInit() {
	  this.form = this.fb.group({
		  text: [null, Validators.compose([Validators.required])]
	  });
  }

  // Create
  create() {
	  this.http.post('/api/security-questions', {
		  text: this.form.controls.text.value,
	  }).subscribe(res => {
		  this.router.navigate(['/security-questions']);
	  })
  }

  // Cancel
  cancel() {
	this.router.navigate(['/security-questions']);
  }

}