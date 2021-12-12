import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateLayoutComponent } from './core/components/private-layout.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
 
  { path: 'login', loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule) },
  { path: 'dashboard', component: PrivateLayoutComponent, canActivate: [AuthGuard],
    children: [
    { path: '', loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'home', loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'cards', loadChildren: () => import('./views/cards/cards.module').then(m => m.CardsModule) },
    { path: 'appointments', loadChildren: () => import('./views/appointments/appointments.module').then(m => m.AppointmentsModule) },
    { path: 'movements', loadChildren: () => import('./views/movements/movements.module').then(m => m.MovementsModule) },
    { path: 'movements/:cardId', loadChildren: () => import('./views/movements/movements.module').then(m => m.MovementsModule) },
    { path: 'transfer', loadChildren: () => import('./views/transfer/transfer.module').then(m => m.TransferModule) },
    { path: 'taxes', loadChildren: () => import('./views/taxes/taxes.module').then(m => m.TaxesModule) }
    ] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
