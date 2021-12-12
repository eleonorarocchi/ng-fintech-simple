import { Directive, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS } from "@angular/forms";
import { map, Observable } from "rxjs";
import { CardsService } from "src/app/api/cards.service";
import { Card } from "src/app/models/card";

@Injectable({ providedIn: 'root' })
export class TransferValidator {
    constructor(private _service: CardsService) {
    }

    validate(): AsyncValidatorFn {
        return  (control: AbstractControl) : Observable<{ [key: string]: any } | null> => {
            return this._service.getCards().pipe(
                map((res:Card[]) => {
                    if(control.parent?.get('cardId')?.value === "")
                        return null;
                    const filtered: Card[] = res.filter(card => card._id === control.parent?.get('cardId')?.value);
                    if (filtered.length === 1)
                    {
                        return filtered[0].amount >= control.parent?.get('amount')?.value ? null : { poorCredit : true }
                    }
                    return { cardNotFound : true };
                })
            );
        }
    }
}

@Directive({ 
    selector: '[transferValidator]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: TransferValidatorDirective,
            multi: true
        }
    ]
})
export class TransferValidatorDirective implements AsyncValidator {
    constructor(private transferValidator: TransferValidator) {
    }
    
    validate(control: AbstractControl) {
        return this.transferValidator.validate()(control);
    }
}