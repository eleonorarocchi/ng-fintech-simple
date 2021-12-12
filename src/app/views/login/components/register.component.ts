import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';
import { repeatPasswordErrorStateMatcher } from './utility/repeat-password-error-state-matcher';

@Component({
  selector: 'er-register',
  template: `
    <form #f="ngForm" class="cute-form" (ngSubmit)="signup(f)">
      <mat-form-field class="full-width mb-15" appearance="fill">
        <mat-label>Email</mat-label>
        <input matInput ngModel name="email" required #email="ngModel">
        <mat-error *ngIf="email.hasError('required')">
          Email <strong>richiesta</strong>
        </mat-error>
      </mat-form-field>

      <mat-form-field class="full-width mb-15" appearance="fill">
        <mat-label>Nome</mat-label>
        <input matInput ngModel name="name" required #name="ngModel">
        <mat-error *ngIf="name.hasError('required')">
          Nome <strong>obbligatorio</strong>
        </mat-error>
      </mat-form-field>

      <mat-form-field class="full-width mb-15" appearance="fill">
        <mat-label>Cognome</mat-label>
        <input matInput ngModel name="surname" required #surname="ngModel">
        <mat-error *ngIf="surname.hasError('required')">
          Cognome <strong>obbligatorio</strong>
        </mat-error>
      </mat-form-field>

      <mat-form-field class="full-width mb-15" appearance="fill">
        <mat-label>Password</mat-label>
        <input matInput ngModel name="password" [type]="showPassord ? 'text' : 'password'" required  #password="ngModel" [errorStateMatcher]="passwordMatcher">
        <mat-icon matSuffix (click)="showPassord = !showPassord">{{ showPassord ? 'visibility' : 'visibility_off'}}</mat-icon>
        <mat-error *ngIf="password.hasError('required')">
          Password is <strong>required</strong>
        </mat-error>
      </mat-form-field>

      <mat-form-field class="full-width mb-15" appearance="fill">
        <mat-label>Ripeti</mat-label>
        <input matInput ngModel name="repeatPassword" [type]="showRepeatPassword ? 'text' : 'password'" required  #repeatPassword="ngModel" equalFieldsValidator
        [errorStateMatcher]="passwordMatcher">
        <mat-icon matSuffix (click)="showRepeatPassword = !showRepeatPassword">{{ showRepeatPassword ? 'visibility' : 'visibility_off'}}</mat-icon>
        <mat-error *ngIf="repeatPassword.hasError('required')">
          Password <strong>obbligatoria</strong>
        </mat-error>
      </mat-form-field>
      <p>
      <mat-error *ngIf="repeatPassword.errors?.['noMatch'] ">
        Le password non coincidono
      </mat-error>
      </p>
      <button mat-raised-button color="primary" class="full-width mb-15" [disabled]="f.invalid" >Registrami</button>
    </form>
    <mat-error *ngIf="message.length > 0">
      {{ message }}
    </mat-error>
    <a routerLink="/login/signin">Hai già un account? Accedi</a>
  `,
   styles: []
})
export class RegisterComponent {
  message:string = '';
  passwordMatcher = new repeatPasswordErrorStateMatcher();
  showPassord:boolean = false;
  showRepeatPassword:boolean = false;
  
  constructor(private _snackBar: MatSnackBar, private _service: AuthService, private _router: Router) {
    
  }

  // TODO: GESTIONE ERRORI

  signup(f: NgForm) {
    if(f.valid) 
      {
        this._service.register(f.value).subscribe({
          next: () => {
            const snackBarRef = this._snackBar.open('Registrazione completata', 'Vai al login');
            snackBarRef.onAction().subscribe(() => {
              this._router.navigate(['login'])
            });
            
          },
          error: () => {
            this.message = 'Registrazione fallita.';
          }
        })
      }
  }
}
  
