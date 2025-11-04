export class Payment {
  constructor(
    public method: string,
    public items: number,
    public shipping: number,
    public amount: number,
  ) {}

  static from(payment: Partial<Payment>) {
    const it = payment as Payment;
    return new Payment(it.method, it.items, it.shipping, it.amount);
  }

  copy({
    method = this.method,
    items = this.items,
    shipping = this.shipping,
    amount = this.amount,
  }: Partial<Payment> = {}) {
    return new Payment(method, items, shipping, amount);
  }
}
