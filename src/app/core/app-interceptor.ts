import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable } from "rxjs";
import { environment } from "src/environments/environment";
const API_URL = environment.apiURL


@Injectable()

export class AppInterceptor implements HttpInterceptor {

    constructor(
        private router: Router
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let reqStream$ = next.handle(req);


        if (req.url.startsWith('/api')) {
            reqStream$ = next.handle(req.clone({
                url: req.url.replace('/api', API_URL),
                withCredentials: true
            }));
        }
        return reqStream$;
        // return reqStream$.pipe(
        //     catchError((err, caught) => {
        //         this.router.navigate(['/error', { msg: err.statusText, code: String(err.status), url: err.url }]);
        //         return caught;
        //     })
        // )
    }
}

export const appInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
}