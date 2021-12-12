export interface Location {
    _id: number;
    name: string;
    address: string;
    phone?: string;
    email?: string;
    coords: [number, number]
  }