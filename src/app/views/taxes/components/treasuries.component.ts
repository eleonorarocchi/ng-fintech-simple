import { Component, EventEmitter, Input } from "@angular/core";
import { AbstractControl, ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { getAllErrors } from "../utility/get-all-errors";

@Component({
    selector: 'er-treasuries',
    template: `
     <div [formGroup]="formGroup">
            <ng-container formArrayName="treasuries" *ngFor="let treasury of treasuries.controls; let i = index" >
                <div class="inline" [formGroupName]="i">
                    <mat-form-field appearance="fill" class="full-width">
                        <mat-label>Codice Tributo</mat-label>
                        <input matInput formControlName="taxCode">
                    </mat-form-field>
                    <mat-form-field appearance="fill" class="full-width">
                        <mat-label>Anno di riferimento</mat-label>
                        <input matInput formControlName="referenceYear">
                    </mat-form-field>
                    <mat-form-field appearance="fill" class="full-width">
                        <mat-label>Importo a debito</mat-label>
                        <input matInput formControlName="dueAmount">
                    </mat-form-field>
                    <mat-form-field appearance="fill" class="full-width">
                        <mat-label>Importo a credito</mat-label>
                        <input matInput formControlName="creditAmount">
                    </mat-form-field>
                    <button type="button" mat-mini-fab color="accent" aria-label="rimuovi tributo" (click)="removeTreasury(i)">
                        <mat-icon>delete</mat-icon>
                    </button>
                </div>
            </ng-container>
            <div *ngIf="treasuries.controls.length  > 0" class="subtotal inline">
                <div class="filler"></div>
                <div class="single">Totale a debito: {{treasuryDue}}</div>
                <div class="single">Totale a credito: {{treasuryCredit}}</div>
            </div>
            <button type="button" mat-fab color="accent" aria-label="Aggiungi tributo" (click)="addTreasury()">
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
    }
    .subtotal {
        font-weight: bold;
        display: flex;
    }
    .subtotal .single {
        width: calc((100% / 4 - 12px));
    }
    .subtotal .filler {
        width: calc((100% / 4 - 12px) * 2 );
    }
    mat-form-field {
        width: calc(100% / 4 - 12px);
    }    
    button {
        margin-left: 5px;
    }
`],
providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: TreasuriesComponent,
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: TreasuriesComponent,
    multi: true
  }
],
})
export class TreasuriesComponent implements ControlValueAccessor{
    @Input("formGroup") formGroup!: FormGroup;
    formChanged = new EventEmitter<number>();
    totalsTreasuries$: Subscription | null = null;
    treasuryDue: number = 0;
    treasuryCredit: number = 0

    constructor(){
        
    }

    ngOnInit() {
        this.totalsTreasuries$ = this.treasuries.valueChanges.subscribe(changes => {
            this.treasuryDue = changes.reduce((acc:number, obj:any) => { return acc + (obj.dueAmount ? parseFloat(obj.dueAmount) : 0); }, 0);
            this.treasuryCredit =  changes.reduce((acc:number, obj:any) => { return acc + (obj.creditAmount ? parseFloat(obj.creditAmount) : 0); }, 0);
            this.formChanged.emit(this.treasuryDue + this.treasuryCredit);
        });
    }


    private createTreasuryGroup() {
        return new FormGroup({
            taxCode: new FormControl('',Validators.required),
            referenceYear: new FormControl('',Validators.required),
            dueAmount: new FormControl(0,Validators.required),
            creditAmount: new FormControl(0,Validators.required),
        });
    }

    get treasuries() {
        return this.formGroup.get("treasuries") as FormArray;
      }

    addTreasury(): void {
        this.treasuries.push(this.createTreasuryGroup())
    }

    removeTreasury(index: number): void {
        this.treasuries.removeAt(index);
    }

    writeValue(controls: any) {
        if (controls === null) {
            this.formGroup.reset();
        }
    }

    registerOnChange(fn: () => void): void {
        this.treasuries.valueChanges.subscribe(fn);
    }

    registerOnTouched(fn: any): void {

    }

    validate(control: AbstractControl): ValidationErrors | null {    
        return this.treasuries && this.treasuries.valid ? null : getAllErrors(this.treasuries);
    }

    ngOnDestroy(): void {
        if(this.totalsTreasuries$ !=null)
          this.totalsTreasuries$.unsubscribe();
    }
}