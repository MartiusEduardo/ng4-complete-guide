import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { map, take, tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthGuard {
    
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | UrlTree | boolean {
        return this.authService.user.pipe(take(1), map(user => {
            const isAuth = !!user;
            if(isAuth) {
                return true;
            }
            return this.router.createUrlTree(['/auth']);
            // }), tap(isAuth => {
        //     if(isAuth) {
        //         this.router.navigate(['/auth']);
        //     }
        }));
    }
}