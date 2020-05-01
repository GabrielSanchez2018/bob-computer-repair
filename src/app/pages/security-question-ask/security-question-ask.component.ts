import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-security-question-ask',
  templateUrl: './security-question-ask.component.html',
  styleUrls: ['./security-question-ask.component.css']
})
export class SecurityQuestionAskComponent implements OnInit {

  form: FormGroup;
  selectedQuestions: any;
  question1: string;
	question2: string;
	question3: string;
  username: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private fb: FormBuilder, private cookieService: CookieService) {
    this.username = this.route.snapshot.paramMap.get('username');
    this.http.get('/api/users/' + this.username + '/security-questions').subscribe(res => {
      this.selectedQuestions = res;
      console.log(this.selectedQuestions);
    }, err => {
      console.log(err)
    }, () => {
      this.http.post('/api/security-questions/find-by-ids', {
				question1: this.selectedQuestions[0].questionId,
				question2: this.selectedQuestions[1].questionId,
				question3: this.selectedQuestions[2].questionId
			}).subscribe(res => {
				this.question1 = res[0].text;
				this.question2 = res[1].text;
				this.question3 = res[2].text;

				console.log(this.question1);
				console.log(this.question2);
				console.log(this.question3);
			});
		});
  }

  ngOnInit() {
    this.form = this.fb.group({
      answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion3: [null, Validators.compose([Validators.required])]
    });
  }

  getNew() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.http.post('/api/session/verify/users/' + this.username + '/security-questions', {
      answerToSecurityQuestion1: this.form.controls['answerToSecurityQuestion1'].value,
      answerToSecurityQuestion2: this.form.controls['answerToSecurityQuestion2'].value,
      answerToSecurityQuestion3: this.form.controls['answerToSecurityQuestion3'].value
    }).subscribe(res => {
      console.log('correct');
      this.router.navigate(['/password-reset'], { queryParams: { username: this.username }})
    }, err => {
      console.log(err);
    });
  }
}
