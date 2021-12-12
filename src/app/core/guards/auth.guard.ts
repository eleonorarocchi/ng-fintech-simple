import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, take } from 'rxjs/operators';
import { AuthService } from 'src/app/api/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private _service: AuthService, private _router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this._service.fetchUser().pipe(
      take(1),
      mapTo(true),
      catchError(() => {
        this._router.navigateByUrl('/login');
        return of(false);
      })
    );
  }

  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
