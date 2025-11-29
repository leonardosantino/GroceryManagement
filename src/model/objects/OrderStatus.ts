import { OrderStatusType } from "@/model/objects/OrderStatusType";

export class OrderStatus {
  constructor(
    public name: OrderStatusType,
    public description: string,
  ) {}

  static from(orderStatus: Partial<OrderStatus>) {
    const it = orderStatus as OrderStatus;
    return new OrderStatus(it.name, it.description);
  }

  copy({
    name = this.name,
    description = this.description,
  }: Partial<OrderStatus> = {}) {
    return new OrderStatus(name, description);
  }
}
