import { Phone } from "@/model/objects/Phone";

export class Seller {
  constructor(
    public id: string,
    public name: string,
    public lastName: string,
    public dateOfBirth: string,
    public phone: Phone,
    public createdAt: string,
    public updatedAt: string,
  ) {}

  static from(user: Partial<Seller>) {
    const it = user as Seller;
    return new Seller(
      it.id,
      it.name,
      it.lastName,
      it.dateOfBirth,
      it.phone,
      it.createdAt,
      it.updatedAt,
    );
  }

  static default() {
    return new Seller("", "", "", "", new Phone("", "", ""), "", "");
  }

  copy({
    id = this.id,
    name = this.name,
    lastName = this.lastName,
    dateOfBirth = this.dateOfBirth,
    phone = this.phone,
    createdAt = this.createdAt,
    updatedAt = this.updatedAt,
  }: Partial<Seller> = {}) {
    return new Seller(
      id,
      name,
      lastName,
      dateOfBirth,
      phone,
      createdAt,
      updatedAt,
    );
  }
}
