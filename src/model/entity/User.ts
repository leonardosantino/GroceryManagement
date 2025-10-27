import { Username } from "@/model/objects/Username";

export class User {
  constructor(
    public username: Username,
    public password: string,
  ) {}

  static from(user: Partial<User>) {
    const it = user as User;
    return new User(it.username, it.password);
  }

  static default() {
    return new User(Username.default(), "");
  }

  copy({
    username = this.username,
    password = this.password,
  }: Partial<User> = {}) {
    return new User(username, password);
  }
}
