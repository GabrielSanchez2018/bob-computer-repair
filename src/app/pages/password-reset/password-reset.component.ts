import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  username: string;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private fb: FormBuilder, private cookieService: CookieService) {
    this.username = this.route.snapshot.queryParamMap.get('username');
  }

  ngOnInit() {
    this.form = this.fb.group({
      password: [null, Validators.compose([Validators.required])]
    });
  }

  resetPassword() {
    this.http.put('/api/session/users/' + this.username + '/reset-password', {
      password: this.form.controls['password'].value
    }).subscribe(res => {
      this.cookieService.set('sessionuser', this.username, 1);
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
    });
  }

}
