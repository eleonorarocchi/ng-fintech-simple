import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, map, of, switchMap } from 'rxjs';
import { AppointmentsService } from 'src/app/api/appointments.service';
import { Location } from 'src/app/models/location';

@Component({
  selector: 'er-appointments',
  template: `
    <mat-drawer-container class="drawer-container" autosize>
      <div class="drawer-sidenav-content" (click)="closeDrawer()">
        <mat-selection-list #location [multiple]="false">
          <mat-list-option *ngFor="let loc of locations$ | async" [value]="loc._id"  (click)="selectLocation($event, loc._id)">
            <div class="simple-row">
              <mat-icon class="simple-col">domain</mat-icon>
              <div class="simple-col">{{loc.name}}<br/><span class="text-small">{{loc.address}}</span></div>
            </div>
          </mat-list-option>
        </mat-selection-list>
      </div>
      <mat-drawer #drawer class="drawer-sidenav" mode="side" position="end">
        <er-appointment [location]="selectedLocation$ | async" [daysWithSlots]="daysWithSlots$ | async" (closeDrawer)="closeDrawer($event)"></er-appointment>
      </mat-drawer>
    </mat-drawer-container>
    
  `,
  styleUrls: ['appointments.component.css']
})
export class AppointmentsComponent {
  @ViewChild('drawer') public drawer!: MatDrawer;
  
  locations$ = new BehaviorSubject<Location[]>([]); 
  selectedLocationId$ = new BehaviorSubject<number | null>(null); 
  selectedLocation$ = this.selectedLocationId$.pipe(
    map((id) => this.locations$.getValue().filter(item => item._id === id)[0] )
  )

  daysWithSlots$ = this.selectedLocationId$.pipe(switchMap(locationId => { return locationId !== null ? this._service.getSlots(locationId) : of(null)}))

  constructor(private _snackBar: MatSnackBar, private _service: AppointmentsService) { }

  ngOnInit() {
    this._service.getLocations().subscribe((res) => {
      this.locations$.next( res );
    })
  }
  
  selectLocation(event: Event, locationId: number) {
    event.stopPropagation();
    this.selectedLocationId$.next(locationId);

    if(!this.drawer.opened)
      this.drawer.toggle();
  }

  closeDrawer($event?: string) {
    if(!!$event)
    {
      this._snackBar.open($event, 'Chiudi');
      this.selectedLocationId$.next(null);
    }
    if(this.drawer.opened)
      this.drawer.toggle();
  }
}
