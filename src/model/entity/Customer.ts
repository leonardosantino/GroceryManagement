import { Phone } from "@/model/objects/Phone";

export class Customer {
  constructor(
    public id: string,
    public status: {
      name: string;
      description: string;
    },
    public name: string,
    public lastName: string,
    public dateOfBirth: string,
    public phone: Phone,
    public createdAt: string,
    public updatedAt: string,
  ) {}

  static from(user: Partial<Customer>) {
    const it = user as Customer;
    return new Customer(
      it.id,
      it.status,
      it.name,
      it.lastName,
      it.dateOfBirth,
      it.phone,
      it.createdAt,
      it.updatedAt,
    );
  }

  static default() {
    return new Customer(
      "",
      { name: "", description: "" },
      "",
      "",
      "",
      new Phone("", "", ""),
      "",
      "",
    );
  }

  copy({
    id = this.id,
    status = this.status,
    name = this.name,
    lastName = this.lastName,
    dateOfBirth = this.dateOfBirth,
    phone = this.phone,
    createdAt = this.createdAt,
    updatedAt = this.updatedAt,
  }: Partial<Customer> = {}) {
    return new Customer(
      id,
      status,
      name,
      lastName,
      dateOfBirth,
      phone,
      createdAt,
      updatedAt,
    );
  }
}
