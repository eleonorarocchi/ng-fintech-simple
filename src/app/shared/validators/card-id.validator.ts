import { Directive, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, AsyncValidatorFn, NG_ASYNC_VALIDATORS } from "@angular/forms";
import { map, Observable } from "rxjs";
import { CardsService } from "src/app/api/cards.service";
import { Card } from "src/app/models/card";

@Injectable({ providedIn: 'root' })
export class CardIdValidator {
    constructor(private _service: CardsService) {
    }

    validate(): AsyncValidatorFn {
        return  (control: AbstractControl) : Observable<{ [key: string]: any } | null> => {
            return this._service.getCards().pipe(
                map((res:Card[]) => {
                    if(control.parent?.get('cardId')?.value === "")
                        return null;
                        
                    const filtered: Card[] = res.filter(card => card._id === control.parent?.get('cardId')?.value);
                    if (filtered.length <= 0)
                        return { cardNotFound : true };
                    return null;
                })
            );
        }
    }
}

@Directive({ 
    selector: '[cardIdValidator]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: CardIdValidatorDirective,
            multi: true
        }
    ]
})
export class CardIdValidatorDirective implements AsyncValidator {
    constructor(private cardIdValidator: CardIdValidator) {
    }
    
    validate(control: AbstractControl) {
        return this.cardIdValidator.validate()(control);
    }
}