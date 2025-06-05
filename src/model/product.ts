export class Product {
  id: string;
  seller: string;

  name: string = "";
  description: string;
  categories: string[];
  images: string[];
  units: Unit[];

  createdAt: Date | string;
}

export class Unit {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}
