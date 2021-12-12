import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';
import { UserStore } from '../user.store';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userStore: UserStore, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        if(error instanceof HttpErrorResponse && error.status === 401) {
          this.userStore.removeUser();
          this.router.navigateByUrl('/login');
        }
        return throwError(error)
      })
    )
  }
}