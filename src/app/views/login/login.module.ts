import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './components/register.component';
import { SignInComponent } from './components/sign-in.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ValidatorsModule } from 'src/app/shared/validators/validators.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
