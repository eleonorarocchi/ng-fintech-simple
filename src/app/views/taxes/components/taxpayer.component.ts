import { Component, EventEmitter } from "@angular/core";
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from "@angular/forms";
import { combineLatest, map, Observable, startWith, Subscription, switchMap } from "rxjs";
import { TaxesService } from "src/app/api/taxes.service";
import { getAllErrors } from "../utility/get-all-errors";

@Component({
    selector: 'er-taxpayer',
    template: `
    <ng-container [formGroup]="taxpayer">
        <mat-form-field appearance="fill" class="full-width">
            <mat-label>Codice Fiscale</mat-label>
            <input matInput formControlName="fiscalCode" fiscalCodeValidator>
        </mat-form-field>
        <mat-form-field appearance="fill" class="half-width">
            <mat-label>Cognome</mat-label>
            <input matInput formControlName="surname">
        </mat-form-field>
        <mat-form-field appearance="fill" class="half-width">
            <mat-label>Nome</mat-label>
            <input matInput formControlName="name">
        </mat-form-field>
        <mat-form-field appearance="fill" class="half-width">
            <mat-label>Data di nascita</mat-label>
            <input matInput [matDatepicker]="pickerValue" formControlName="birthDate" readonly="true" required
            (click)="pickerValue.open()">
            <mat-datepicker-toggle matSuffix [for]="pickerValue"></mat-datepicker-toggle>
            <mat-datepicker #pickerValue></mat-datepicker>
        </mat-form-field>
        <mat-form-field appearance="fill" class="half-width">
            <mat-label>Sesso</mat-label>
            <mat-select matInput formControlName="gender">
                <mat-option value=""></mat-option>
                <mat-option value="F">F</mat-option>
                <mat-option value="M">M</mat-option>
            </mat-select>
        </mat-form-field>
        <mat-form-field appearance="fill" class="half-width">
            <mat-label>Provincia di nascita</mat-label>
            <input matInput formControlName="birthProvince" [matAutocomplete]="autoProv">
            <mat-autocomplete #autoProv="matAutocomplete" >
                <mat-option *ngFor="let option of provinces$ | async" [value]="option">
                    {{option}}
                </mat-option>
            </mat-autocomplete>
        </mat-form-field>
        <mat-form-field appearance="fill" class="half-width">
            <mat-label>Comune di nascita</mat-label>
            <input matInput formControlName="birthPlace" [matAutocomplete]="autoMun">
            <mat-autocomplete #autoMun="matAutocomplete" >
                <mat-option *ngFor="let option of municipalities$ | async" [value]="option">
                    {{option}}
                </mat-option>
            </mat-autocomplete>
        </mat-form-field>
    </ng-container>
    `,
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: TaxpayerComponent,
        multi: true
      },
      {
        provide: NG_VALIDATORS,
        useExisting: TaxpayerComponent,
        multi: true
      }
    ],
  })
  export class TaxpayerComponent implements ControlValueAccessor{
    formChanged = new EventEmitter<any>();
    taxpayer$: Subscription | null = null;
    taxpayer!: FormGroup;
    province!: FormControl;
    birthPlace!: FormControl;
    provinces$: Observable<string[]> | null = null;
    municipalities$: Observable<string[]> | null = null;
    
    constructor(private _formBuilder: FormBuilder, private _service: TaxesService){
        this.taxpayer = this._formBuilder.group({ 
            fiscalCode: new FormControl('',Validators.required),
            surname: new FormControl('',Validators.required),
            name: new FormControl('',Validators.required),
            birthDate: new FormControl('',Validators.required),
            gender: new FormControl('',Validators.required),
            birthProvince: new FormControl('',Validators.required),
            birthPlace: new FormControl('',Validators.required),
        });
    }

    ngOnInit() {
        this.taxpayer$ = this.taxpayer.valueChanges.subscribe(val => {
            this.formChanged.emit(val);
        });

        this.provinces$ = (this.taxpayer?.get('birthProvince') as FormControl).valueChanges.pipe(
            startWith(''),
            switchMap(val => {
                  return this._service.getProvince(val)
                  .pipe(
                    map((response: string[]) => response)
                  )
             }) 
          )

          this.municipalities$ = combineLatest((this.taxpayer?.get('birthProvince') as FormControl).valueChanges, (this.taxpayer?.get('birthPlace') as FormControl).valueChanges).pipe(
            startWith(''),
            switchMap(val => {
                  return this._service.getMunicipality(val[0], val[1])
                  .pipe(
                    map((response: string[]) => response)
                  )
             }) 
          )
        
    }

    writeValue(controls: any) {
        if (controls === null) {
            this.taxpayer.reset();
        }
    }

    registerOnChange(fn: () => void): void {
        this.taxpayer.valueChanges.subscribe(fn);
    }

    registerOnTouched(fn: any): void {
        
    }

    validate(control: AbstractControl): ValidationErrors | null {    
        return this.taxpayer.valid ? null : getAllErrors(this.taxpayer);
    }

    ngOnDestroy(): void {
        if(this.taxpayer$ !=null)
          this.taxpayer$.unsubscribe();
    }
}