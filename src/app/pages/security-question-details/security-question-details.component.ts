/*=========================
Name: Brittany Dockter, Justin Singleton, Gabriel Sanchez
Date: April 19, 2020
Assignment: security question details
Description: SQ function for details
==========================*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-security-question-details',
  templateUrl: './security-question-details.component.html',
  styleUrls: ['./security-question-details.component.css']
})
export class SecurityQuestionDetailsComponent implements OnInit {
  question: any;
  questionId: any;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router) {
    this.questionId = this.route.snapshot.paramMap.get('questionId');

    this.http.get('api/security-questions/' + this.questionId).subscribe(res => {
      this.question = res;
    }, err => {
      console.log(err);
    }, () => {
      this.form.controls.text.setValue(this.question.text);
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  saveQuestion() {
    this.http.put('/api/security-questions/' + this.questionId, {
      text: this.form.controls.text.value,
    }).subscribe(res => {
      this.router.navigate(['/security-questions']);
    });
  }

  cancel() {
    this.router.navigate(['/security-questions']);
  }

}
