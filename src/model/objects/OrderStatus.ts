export class OrderStatus {
  name: OrderStatusType;
  description: string;
}

export enum OrderStatusType {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  PROCESSING = "PROCESSING",
  READY = "READY",
  DELIVERY = "DELIVERY",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}
