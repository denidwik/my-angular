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
import {ErrorDialogService} from '../components/error-dialog/errordialog.service';
import {User} from '../_models/user';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(public errorDialogService: ErrorDialogService,) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: User = JSON.parse(localStorage.getItem('currentUser'));

        if (localStorage.getItem('currentUser')) {
            request = request.clone({ headers: request.headers.set('Authorization', token.token) });
        }

        // if (!request.headers.has('Content-Type')) {
        //     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        // }
        //
        // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                // console.log(error.status)
                data = {
                    reason: error.message,
                    status: error.status
                };
                this.errorDialogService.openDialog(data);
                return throwError(error);
            }));
    }
}
