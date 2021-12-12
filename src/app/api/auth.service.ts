import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, switchMap, switchMapTo, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStore } from '../core/user.store';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _router: Router, private _userStore: UserStore) { 
    this._http.get<void>(`${environment.apiUrl}/csrf-token`).subscribe();
  }

  register(credentials: { email: string, password: string, name: string, surname: string }): Observable<any> {
    return this._http.post<boolean>(`${environment.apiUrl}/register`, credentials);
  }

  logout(): void {
    this._http.get<any>(`${environment.apiUrl}/logout`).subscribe(() => {
      this._userStore.removeUser();
      this._router.navigateByUrl('/login');
    });
  }

  fetchUser(forceReload = false): Observable<User> {
    return this._userStore.$user.pipe(
      take(1),
      switchMap(user => {
        return (!!user && !forceReload)
          ? of(user)
          : this._http.get<any>(`${environment.apiUrl}/me`, {}).pipe(
            tap(u => this._userStore.setUser(u))
          );
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return this._http.post<any>(`${environment.apiUrl}/login`, { email, password }).pipe(
      switchMapTo(this.fetchUser()),
      map((res) => true)
    );
  }
}
