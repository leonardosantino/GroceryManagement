import { OrderItem } from "@/model/aggregate/OrderItem";
import { Address } from "@/model/entity/Address";
import { Payment } from "@/model/objects/Payment";
import { EStatus } from "@/model/objects/EStatus";

export class Order {
  constructor(
    public id: string,
    public seller: string,
    public items: OrderItem[],
    public payment: Payment,
    public address: Address,
    public status: EStatus,
    public deliveryAt: string,
    public createdAt: string,
    public updatedAt: string,
  ) {}

  static from(order: Partial<Order>) {
    const it = order as Order;
    return new Order(
      it.id,
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
