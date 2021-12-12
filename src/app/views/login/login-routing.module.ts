import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register.component';
import { SignInComponent } from './components/sign-in.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent, 
    children: [
      { path: '', redirectTo: 'signin'},
      { path: 'signin', component: SignInComponent},
      { path: 'register', component: RegisterComponent},

    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
