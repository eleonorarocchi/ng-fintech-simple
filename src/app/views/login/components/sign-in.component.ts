import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'er-sign-in',
  template: `
    <form #f="ngForm" class="cute-form" (ngSubmit)="accedi(f)">
      <mat-form-field class="full-width mb-15" appearance="fill">
        <mat-label>Email</mat-label>
        <input matInput ngModel name="email" required #email="ngModel">
        <mat-icon matPrefix>person</mat-icon>
        <mat-error *ngIf="email.hasError('required')">
          Email is <strong>required</strong>
        </mat-error>
      </mat-form-field>

      <mat-form-field class="full-width mb-15" appearance="fill">
        <mat-label>Password</mat-label>
        <input matInput ngModel name="password" [type]="showPassord ? 'text' : 'password'" required  #password="ngModel">
        <mat-icon matPrefix>lock</mat-icon>
        <mat-icon matSuffix (click)="showPassord = !showPassord">{{ showPassord ? 'visibility' : 'visibility_off'}}</mat-icon>
        <mat-error *ngIf="password.hasError('required')">
          Password is <strong>required</strong>
        </mat-error>
      </mat-form-field>

      <button mat-raised-button color="primary" class="full-width mb-15" [disabled]="f.invalid" >Accedi</button>
    </form>
    <mat-error *ngIf="message.length > 0">
      {{ message }}
    </mat-error>
    <a routerLink="/login/register">Crea un nuovo account</a>
  `,
  styles: []
})
export class SignInComponent {
  showPassord:boolean = false;
  message:string = '';

  constructor(private _service: AuthService, private _router: Router) { }

  accedi(f: NgForm) {
    const { email, password } = f.value;
    if(f.valid) 
      this._service.login(email, password).subscribe({
        next: () => {
          this._router.navigateByUrl('/dashboard');
        },
        error: () => {
          this.message = 'Login failed.';
        }
      })
  }
}
