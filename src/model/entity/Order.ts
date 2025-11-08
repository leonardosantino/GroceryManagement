import { OrderItem } from "@/model/aggregate/OrderItem";
import { Address } from "@/model/entity/Address";
import { Payment } from "@/model/objects/Payment";
import { OrderStatus } from "@/model/objects/OrderStatus";

export class OrderCustomer {
  constructor(
    public name: string,
    public lastName: string,
    public phone: {
      countryCode: string;
      stateCode: string;
      number: string;
    },
  ) {}
}

export class Order {
  constructor(
    public id: string,
    public code: string,
    // public seller: string,
    public customer: OrderCustomer,
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
      // it.seller,
      it.customer,
      it.items,
      it.payment,
      it.address,
      OrderStatus.from(it.status),
      it.deliveryAt,
      it.createdAt,
      it.updatedAt,
    );
  }

  copy({
    id = this.id,
    code = this.code,
    // seller = this.seller,
    customer = this.customer,
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
      // seller,
      customer,
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
