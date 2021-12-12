import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateLayoutComponent } from './components/private-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ErrorDialogService } from './services/error-dialog.service';
import { ErrorDialogComponent } from './components/error-dialog.component';

const routes: Routes = [{ path: '', component: PrivateLayoutComponent, children: [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'}]}];

@NgModule({
  declarations: [
    PrivateLayoutComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)

  ],
  exports: [
    PrivateLayoutComponent
  ],
  providers: [
    ErrorDialogService
  ]
})
export class CoreModule { }
