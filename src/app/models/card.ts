import { CardType } from "./cart-type";

export interface Card {
    _id: string;
    number: string;
    ownerId: string;
    owner: string;
    type: CardType;
    amount: number;
}