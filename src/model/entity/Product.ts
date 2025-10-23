export class Product {
  id?: string;
  seller?: string;

  name: string;
  description: string;
  categories: string[];
  images: string[];
  unity: Unit;
  createdAt?: string;
  updatedAt?: string;
}

export class Unit {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;

  constructor(unit: Unit) {
    this.id = unit.id;
    this.name = unit.name;
    this.description = unit.description;
    this.price = unit.price;
    this.quantity = unit.quantity;
  }
}
