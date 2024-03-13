import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    //O Interceptor vai interceptar todas as requisições e inserir o parâmetro auth e seu token. 
    //Somente quando tiver usuário logado.
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            if(!user) {
                return next.handle(req);
            }

            const modifiedReq = req.clone({
                params: new HttpParams().set('auth', user.token)
            })
            
            return next.handle(modifiedReq);
        }));
    }
}