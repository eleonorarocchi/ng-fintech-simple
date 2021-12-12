import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable, EMPTY } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorDialogService } from '../services/error-dialog.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(public _service: ErrorDialogService) { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes(environment.apiUrl)) {
        request = request.clone({ withCredentials: true });
      }
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse ) => {
          if(error.error) {
            const data: string = error && error.error && error.error.error ? error.error.error : '';
            this._service.openDialog(data);
          }
          else if(error.message)
            this._service.openDialog(error.message);
          else {
            this._service.openDialog("Si è verificato un errore inaspettato.");
          }
          return EMPTY;
        })
      );
  }
}