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
