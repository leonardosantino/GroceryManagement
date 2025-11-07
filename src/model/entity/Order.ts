import { OrderItem } from "@/model/aggregate/OrderItem";
import { Address } from "@/model/entity/Address";
import { Payment } from "@/model/objects/Payment";
import { OrderStatus } from "@/model/objects/OrderStatus";

export class Order {
  constructor(
    public id: string,
    public code: string,
    public seller: string,
    public items: OrderItem[],
    public payment: Payment,
    public address: Address,
    public status: OrderStatus,
    public deliveryAt: string,
    public createdAt: string,
    public updatedAt: string,
  ) {}

  static from(order: Partial<Order>) {
    const it = order as Order;
    return new Order(
      it.id,
      it.code,
      it.seller,
      it.items,
      it.payment,
      it.address,
      it.status,
      it.deliveryAt,
      it.createdAt,
      it.updatedAt,
    );
  }

  copy({
    id = this.id,
    code = this.code,
    seller = this.seller,
    items = this.items,
    payment = this.payment,
    address = this.address,
    status = this.status,
    deliveryAt = this.deliveryAt,
    createdAt = this.createdAt,
    updatedAt = this.updatedAt,
  }: Partial<Order> = {}) {
    return new Order(
      id,
      code,
      seller,
      items,
      payment,
      address,
      status,
      deliveryAt,
      createdAt,
      updatedAt,
    );
  }
}
