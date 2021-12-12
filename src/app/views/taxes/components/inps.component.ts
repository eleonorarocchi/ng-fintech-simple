import { Component, EventEmitter, Input } from "@angular/core";
import { AbstractControl, ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { dateRangeValidator } from "src/app/shared/validators/date-range.validator";
import { getAllErrors } from "../utility/get-all-errors";
import { INPSErrorStateMatcher } from "../utility/inps-error-state-matcher";

@Component({
    selector: 'er-inps',
    template: `
     <div [formGroup]="formGroup">
        <ng-container formArrayName="taxes" *ngFor="let tax of taxes.controls; let i = index" >
            <div class="inline" [formGroupName]="i">
                <mat-form-field appearance="fill">
                    <mat-label>Codice Sede</mat-label>
                    <input matInput formControlName="headquartersCode">
                </mat-form-field>
                <mat-form-field appearance="fill">
                    <mat-label>Causale Contributo</mat-label>
                    <input matInput formControlName="causal">
                </mat-form-field>
                <mat-form-field appearance="fill">
                    <mat-label>Codice INPS</mat-label>
                    <input matInput formControlName="inpsCode">
                </mat-form-field>
                <mat-form-field appearance="fill">
                    <mat-label>Da</mat-label>
                    <input matInput [matDatepicker]="dateFromPickerValue" formControlName="dateFrom" readonly="true" [errorStateMatcher]="inpsMatcher"
                    (click)="dateFromPickerValue.open()">
                    <mat-datepicker-toggle matSuffix [for]="dateFromPickerValue"></mat-datepicker-toggle>
                    <mat-datepicker #dateFromPickerValue></mat-datepicker>
                </mat-form-field>
                <mat-form-field appearance="fill">
                    <mat-label>A</mat-label>
                    <input matInput [matDatepicker]="dateToPickerValue" formControlName="dateTo" readonly="true" [errorStateMatcher]="inpsMatcher"
                    (click)="dateToPickerValue.open()">
                    <mat-datepicker-toggle matSuffix [for]="dateToPickerValue"></mat-datepicker-toggle>
                    <mat-datepicker #dateToPickerValue></mat-datepicker>
                </mat-form-field>
                <mat-form-field appearance="fill">
                    <mat-label>Debito</mat-label>
                    <input matInput formControlName="debt">
                </mat-form-field>
                <mat-form-field appearance="fill">
                    <mat-label>Credito</mat-label>
                    <input matInput formControlName="credit">
                </mat-form-field>
                <button type="button" mat-mini-fab color="accent" aria-label="rimuovi tributo" (click)="removeTax(i)">
                    <mat-icon>delete</mat-icon>
                </button>
            </div>
            <mat-error *ngIf="tax.hasError('errorDate')">
                "Data da" dev'essere antecedente a "Data a".
            </mat-error>
        </ng-container>
        <div *ngIf="taxes.controls.length  > 0" class="subtotal inline">
            <div class="filler"></div>
            <div class="single">Totale a debito: {{taxDue}}</div>
            <div class="single">Totale a credito: {{taxCredit}}</div>
        </div>
        <button type="button" mat-fab color="accent" aria-label="Aggiungi contributo" (click)="addTax()">
            <mat-icon>add</mat-icon>
        </button>
    </div>
        `,
styles: [`
    .inline {
        display: inline;
    }
    .inline mat-form-field {
        padding: 2px;
        width: calc(100% / 7 - 7px);
    }
    .subtotal {
        font-weight: bold;
        font-weight: bold;
        display: flex;
    }
    .subtotal .single {
        width: calc((100% / 7 - 7px));
    }
    .subtotal .filler {
        width: calc((100% / 7 - 7px) * 5 );
    }
    button {
        margin-left: 5px;
    }
`],
providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: InpsComponent,
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: InpsComponent,
    multi: true
  }
],
})
export class InpsComponent implements ControlValueAccessor{
    inpsMatcher = new INPSErrorStateMatcher();
    @Input("formGroup") formGroup!: FormGroup;
    formChanged = new EventEmitter<any>();
    totalsTaxes$: Subscription | null = null;
    taxDue: number = 0
    taxCredit: number = 0

    constructor(){
        
    }

    ngOnInit() {
        this.totalsTaxes$ = this.taxes.valueChanges.subscribe(changes => {
            this.taxDue = changes.reduce((acc:number, obj:any) => { return acc + (obj.debt ? parseFloat(obj.debt) : 0); }, 0);
            this.taxCredit = changes.reduce((acc:number, obj:any) => { return acc + (obj.credit ? parseFloat(obj.credit) : 0); }, 0);
            this.formChanged.emit(this.taxDue + this.taxCredit);
        });
    }


    private createTaxGroup() {
        return new FormGroup({
          headquartersCode: new FormControl('',Validators.required),
          causal: new FormControl('',Validators.required),
          inpsCode: new FormControl('',Validators.required),
          dateFrom: new FormControl('',Validators.required),
          dateTo: new FormControl('',Validators.required),
          debt: new FormControl(0,Validators.required),
          credit: new FormControl(0,Validators.required),
        }, {
          validators: [dateRangeValidator()],
        })
      }

    get taxes() {
        return this.formGroup.get("taxes") as FormArray;
    }

    addTax(): void {
        this.taxes.push(this.createTaxGroup());
    }

    removeTax(index: number): void {
        this.taxes.removeAt(index);
    }

    writeValue(controls: any) {
        if (controls === null) {
            this.formGroup.reset();
        }
    }

    registerOnChange(fn: () => void): void {
        this.taxes.valueChanges.subscribe(fn);
    }

    registerOnTouched(fn: any): void {

    }

    validate(control: AbstractControl): ValidationErrors | null {    
        return this.taxes && this.taxes.valid ? null : getAllErrors(this.taxes);
    }

    ngOnDestroy(): void {
        if(this.totalsTaxes$ !=null)
          this.totalsTaxes$.unsubscribe();
    }
}