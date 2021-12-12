import { CardType } from "./cart-type";

export interface CardForm {
    number: string;
    name: string;
    surname: string;
    type: CardType;
    csc: number;
}