import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  token = localStorage.getItem('token');
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (!localStorage.getItem('token')) {
        localStorage.setItem('token', null)
      }
        const token: any =  localStorage.getItem('token') || null;


        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', "Bearer " + token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                }
                return event;
            }));
    }

    // intercept(
    //   req: HttpRequest<any>,
    //   next: HttpHandler
    // ): Observable<HttpEvent<any>> {
    //   const idToken = localStorage.getItem('token');

    //   if (idToken) {
    //     const cloned = req.clone({
    //       headers: req.headers
    //         .set('Authorization', this.token)
    //         .set(`Accept`, `application/vnd.knack.api-v1+json`),
    //     });

    //     return next.handle(cloned);
    //   } else {
    //     return next.handle(req);
    //   }
    // }
}
