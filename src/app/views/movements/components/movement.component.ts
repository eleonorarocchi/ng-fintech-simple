import { Component, Input } from '@angular/core';

@Component({
  selector: 'er-movement',
  template: `
     <mat-expansion-panel (opened)="panelOpenState = true"
                       (closed)="panelOpenState = false">
    <mat-expansion-panel-header>
      <mat-panel-title>
        <div class="container">
          <div class="row">
            <div class="col-1 date">[{{date}}]</div>
            <div class="col-1 amount {{type}}">  {{amount | lightcurrency}}</div> 
            <div class="col title"> {{title}}</div>  
            <ng-container *ngIf="!panelOpenState">
              <div class="col description">{{description | truncate}}</div>
            </ng-container>
          </div>
        </div>
      </mat-panel-title>
    </mat-expansion-panel-header>
    {{description}}
  </mat-expansion-panel>
  `,
  styles: [`
    .date {
      color: gray;
      font-style: italic;
      font-size: x-small;
    }

    .amount, .title {
      font-weight: bold;
    }
    
    .amount.in {
      color: green;
    }

    .amount.out {
      color: red;
    }
    .description {
      font-size: small
    }
  `]
})
export class MovementComponent {
  panelOpenState = false;
  @Input() date:string | null = null; 
  @Input() amount!:number; 
  @Input() type!: 'in' | 'out'; 
  @Input() title!:string; 
  @Input() description!:string; 
}
