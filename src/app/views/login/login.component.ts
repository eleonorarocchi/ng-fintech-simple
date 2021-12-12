import { Component } from '@angular/core';

@Component({
  selector: 'er-login',
  template: `
    <div class="row">
      <h1>NgFintech</h1>

      <mat-card>
        <router-outlet></router-outlet>
      </mat-card>
    </div>
  `,
  styleUrls: ['login.component.css']
})
export class LoginComponent {
}
