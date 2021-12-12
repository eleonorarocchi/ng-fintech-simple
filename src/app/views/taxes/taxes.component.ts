import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { TaxesService } from 'src/app/api/taxes.service';
import { CardSelectorDialog } from 'src/app/shared/components/card-selector-dialog.components';

@Component({
  selector: 'er-taxes',
  templateUrl: 'taxes.component.html',
  styleUrls: ['taxes.component.css']
})
export class TaxesComponent {
  totalBalance$: Subscription | null = null;
  totalBalance: number = 0;
  taxesForm = this._formBuilder.group({
    taxpayer: [],
    treasuries:  this._formBuilder.array([
      // ...
    ]),
    taxes: this._formBuilder.array([
      // ...
    ])
  })

  // TODO: Rendi il form più bello visivamente e più ordinato.

  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, public _dialog: MatDialog, private _service: TaxesService) { }

  ngOnInit() {
    this.totalBalance$ = this.taxesForm.valueChanges.subscribe(changes => {
      const treasuries = changes.treasuries.reduce((acc:number, obj:any) => { return acc + parseFloat(obj.creditAmount) - parseFloat(obj.dueAmount); }, 0);
      const taxes = changes.taxes.reduce((acc:number, obj:any) => { return acc + parseFloat(obj.credit) - parseFloat(obj.debt) ; }, 0);
      this.totalBalance = treasuries+taxes;
    })
  }

  get treasuries() {
    return this.taxesForm.get('treasuries') as FormArray;
  }

  get taxes() {
    return this.taxesForm.get('taxes') as FormArray;
  }

  private clearTreasuries() {
    this.treasuries.clear();
  }

  private clearTaxes() {
    this.taxes.clear();
  }

  sendTaxex(){
    if(this.taxesForm.status === "VALID")
    {
      const dialogRef = this._dialog.open(CardSelectorDialog, {
        width: '450px',
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if(result !== null)
        {
          this._service.postTaxes(this.taxesForm.value).subscribe((res) => {
            if(res)
            {
              this._snackBar.open('Trasferimento concluso.', 'Chiudi');
              this.clearTreasuries();
              this.clearTaxes();
              this.taxesForm.reset();
            }else {
              this._snackBar.open('Purtroppo si è verificato un errore.', 'Chiudi');
            }
          })
        }
      });
    }
  }

  collectErrors(form: FormGroup) {
    let errors: Record<string, ValidationErrors> = {};
    Object.keys(form.controls).forEach(key => {
      const error = form.get(key)!.errors;
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  }

  ngOnDestroy(): void {
    if(this.totalBalance$ !=null)
      this.totalBalance$.unsubscribe();
  }
}
