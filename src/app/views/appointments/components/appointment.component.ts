
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DayWithSlots } from 'src/app/models/day-with-slots';
import { Location } from 'src/app/models/location';
import * as L from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/shared/components/confirm-dialog.component';
import { NgForm } from '@angular/forms';
import { AppointmentsService } from 'src/app/api/appointments.service';
import { Utils } from 'src/app/shared/utils';
import { DayWithSlot } from 'src/app/models/day-with-slot';


@Component({
  selector: 'er-appointment',
  template: `
    <er-map *ngIf="coords && name" [locationCoords]="coords" [locationName]="name"></er-map>
    <form  #f="ngForm">
        <mat-form-field appearance="fill" class="full-width date-selector">
            <mat-label>Scegli una data</mat-label>
            <input matInput [matDatepicker]="pickerValue"  [matDatepickerFilter]="dateFilter"  (dateInput)="dateChoosed($event)" ngModel name="appointmentDate" readonly="true" (click)="pickerValue.open()">
            <mat-datepicker-toggle matSuffix [for]="pickerValue"></mat-datepicker-toggle>
            <mat-datepicker #pickerValue></mat-datepicker>
        </mat-form-field>
        
        <mat-selection-list #hoursList [multiple]="false" *ngIf="selectedDay">
            <div matSubheader>Orari disponibili</div>
            <mat-list-option *ngFor="let slot of selectedDay?.slots" [value]="slot" (click)="confirmChoise(slot)" >
                <div class="simple-row">
                    <mat-icon class="simple-col">access_time</mat-icon>
                    <div class="simple-col">{{slot}}</div>
                </div>
            </mat-list-option>
        </mat-selection-list>
    </form>
  `,
  styleUrls: ['appointment.component.css']
})
export class AppointmentComponent {
    @Input('location') location : Location | null = null;
    @Input('daysWithSlots') daysWithSlots : DayWithSlots[] | null = null;
    @Output() closeDrawer = new EventEmitter<string>();
    @ViewChild('f', { static: true }) form!: NgForm;
    selectedDay: DayWithSlots | null = null;
    coords!: [number, number];
    name!: string;
    dateFilter: (date: Date | null) => boolean =
    (date: Date | null) => {
      return this.daysWithSlots ? this.daysWithSlots.findIndex(item => item.day ? (new Date(item.day)).getTime() ===  date?.getTime() : null) >= 0 : false;
    }

    map!: L.Map;
    marker!: L.Marker;

    constructor(private _dialog: MatDialog, private _service: AppointmentsService) { }

    ngOnInit() {
      
    }

    ngOnChanges() {
      this.selectedDay = null;
      this.form.reset();
      if(this.location)
      {
        this.coords = this.location.coords;
        this.name = this.location.name;
      }
    }

    dateChoosed(date:MatDatepickerInputEvent<Date, Date | null>) {
        if(date.value != null && this.daysWithSlots)
        {
            const selected = this.daysWithSlots.filter(item => { 
              return item.day === Utils.dateToString(date.target.value);
            })
            this.selectedDay = selected.length > 0 ? selected[0] : null;
        }
        else 
            this.selectedDay = null;
    }

    confirmChoise(slot: number) {
      
      if (this.selectedDay) {
        const date = Utils.dateToString_DDMMYYYY(new Date(this.selectedDay?.day));
        const dialogRef = this._dialog.open(ConfirmDialog, {
            width: '450px',
            data: { title: 'Confermi l\'appuntamento?', content: 'L\'appuntamento sarà fissato per il giorno ' + date + ' alle ' + slot},
        });
        
        dialogRef.afterClosed().subscribe(result => {
            if(result && this.selectedDay)
            {
              const selection: DayWithSlot = new DayWithSlot(this.selectedDay.day, slot);
              this._service.postSchedule(selection).subscribe((res) => {
                this.reset();
                this.closeDrawer.emit("Appuntamento confermato");
              });
            }
        });
      }
    }

    

    reset() {
        this.form.resetForm();
        this.selectedDay = null;
    }
}
