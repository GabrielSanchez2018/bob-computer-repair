/*=========================
Name: Brittany Dockter, Justin Singleton, Gabriel Sanchez
Date: April 19, 2020
Assignment: session guard
Description: prevents access to users that are not signed in
==========================*/

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, RouterState } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({providedIn: 'root'})
export class SessionGuard implements CanActivate {

    constructor(private router: Router, private cookieService: CookieService) {
 }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const isAuthenticated = this.cookieService.get('sessionuser');

        if (isAuthenticated) {
            return true;
        } else {
            this.router.navigate(['/session/signin']);
            return false;
        }
    }
}
