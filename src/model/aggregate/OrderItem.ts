import { Product } from "@/model/entity/Product";

export class OrderItem {
  constructor(
    public id: string,
    public name: string,
    public image: string,
    public unity: {
      name: string;
      price: number;
      quantity: number;
    },
  ) {}

  static from(item: Partial<OrderItem>): OrderItem {
    const it = item as OrderItem;

    return new OrderItem(it.id, it.name, it.image, it.unity);
  }

  static fromProduct(it: Product): OrderItem {
    return new OrderItem(it.id, it.name, it.images.at(0) as string, it.unity);
  }

  copy({
    id = this.id,
    name = this.name,
    image = this.image,
    unity = this.unity,
  }: Partial<OrderItem> = {}) {
    return new OrderItem(id, name, image, unity);
  }

  getAmount() {
    return this.unity.price * this.unity.quantity;
  }
}
