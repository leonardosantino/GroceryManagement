export class Unity {
  constructor(
    public name: string,
    public price: number,
    public quantity: number,
  ) {}

  static default() {
    return new Unity("", 0, 0);
  }

  static from(unity: Partial<Unity>) {
    const it = unity as Unity;
    return new Unity(it.name, it.price, it.quantity);
  }

  copy({
    name = this.name,
    price = this.price,
    quantity = this.quantity,
  }: Partial<Unity> = {}) {
    return new Unity(name, price, quantity);
  }
}
