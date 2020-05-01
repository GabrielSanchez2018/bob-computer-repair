/*=========================
Name: Brittany Dockter
Date: April 19, 2020
Assignment: error interceptor
Description: handles errors for 404 and 500 status codes
==========================*/

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable() 
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private cookieService: CookieService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            // if 404 route to 404 page
            if ([404].indexOf(err.status) !== -1) {
              this.router.navigate(['/session/404']);
            }
            // if 500 route to 500 page
            if ([500].indexOf(err.status) !== -1) {
              this.router.navigate(['/session/500']);
            }
            // if error return error message
            const error = err.error.message || err.statusText;
            return throwError(error)
          
          }));
    }
}