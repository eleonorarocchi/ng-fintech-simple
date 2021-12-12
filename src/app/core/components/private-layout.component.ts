import { Component } from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'er-private',
  template: `
    <mat-sidenav-container class="private-container">
        <mat-sidenav #sidenav mode="side" opened class="sidenav">
            <h2>Menu</h2>
            <mat-selection-list #shoes [multiple]="false">
            <mat-list-option *ngFor="let item of menu" [value]="item" [routerLink]="item.link" routerLinkActive="mat-list-single-selected-option"
            >
                <div class="menu-item">
                    <mat-icon> {{item.icon}}</mat-icon> {{item.text}}
                </div>
            </mat-list-option>
            <mat-list-option (click)="logout()">
                <div class="menu-item">
                    <mat-icon>person</mat-icon> <div>Eleonora Rocchi <br/> <small>Logout</small> </div>
                </div>
            </mat-list-option>
            </mat-selection-list>
        </mat-sidenav>

        <mat-sidenav-content>
            <mat-toolbar color="primary">NgFintec</mat-toolbar>
            <div class="detail">
                <router-outlet></router-outlet>
            </div>
        </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    h2 {
        display: flex;
        padding: 0 16px;
        align-items: center;
        height: 64px;
        background: #fafafa;
        margin: 0px;
    }

    .private-container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #eee;
        }

    .sidenav {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 250px;
    }
    .detail {
        padding: 25px;
    }
    .menu-item {
        display: flex;
        flex-direction: initial;
        align-items: center;
    }
    .menu-item mat-icon {
        margin-right: 15px;
    }
`]
})
export class PrivateLayoutComponent  {
    menu = [
        { icon : 'home', text: 'Home', link: '/dashboard/home'},
        { icon : 'credit_card', text: 'Carte', link: '/dashboard/cards'},
        { icon : 'receipt_long', text: 'Movimenti', link: '/dashboard/movements'},
        { icon : 'paid', text: 'Trasferisci', link: '/dashboard/transfer'},
        { icon : 'event', text: 'Appuntamenti', link: '/dashboard/appointments'},
        { icon : 'summarize', text: 'Tasse', link: '/dashboard/taxes'}
    ];

    constructor(private _router: Router, private _service: AuthService) { }

    logout() {
        this._service.logout();
    }
}
