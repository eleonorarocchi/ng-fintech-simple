export const CardTypes = ["visa", "mastercard"] as const;
export type CardType = typeof CardTypes[number];