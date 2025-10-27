export class Username {
  constructor(public email: string) {}

  static from(username: Partial<Username>) {
    const it = username as Username;
    return new Username(it.email);
  }

  static default() {
    return new Username("");
  }

  copy({ email = this.email }: Partial<Username> = {}) {
    return new Username(email);
  }
}
