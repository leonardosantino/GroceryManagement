export class Address {
  constructor(
    public street: string,
    public number: string,
    public district: string,
    public city: string,
    public state: string,
    public zipCode: string,
    public complement?: string,
  ) {}

  static from(address: Partial<Address>) {
    const it = address as Address;
    return new Address(
      it.street,
      it.number,
      it.district,
      it.city,
      it.state,
      it.zipCode,
      it.complement,
    );
  }

  copy({
    street = this.street,
    number = this.number,
    district = this.district,
    city = this.city,
    state = this.state,
    zipCode = this.zipCode,
    complement = this.complement,
  }: Partial<Address> = {}) {
    return new Address(
      street,
      number,
      district,
      city,
      state,
      zipCode,
      complement,
    );
  }
}
