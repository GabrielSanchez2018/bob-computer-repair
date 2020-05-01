import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, RouterState } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class RoleGuard implements CanActivate {

    constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.getRole().pipe(map(res => {
            console.log(res);
            if (res === "admin") {
                return true;
            } else {
                this.router.navigate(['/']);
                return false;
            }
        }));
    }

    getRole() {
        return this.http.get('/api/users/' + this.cookieService.get('sessionuser') + '/role');
    }
}
