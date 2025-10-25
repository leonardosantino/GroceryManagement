import { App } from "@/schema/app";

import { isNullOrEmpty } from "@/com/validation";

export class SessionStorage {
  private readonly KEY = App.schema.concat(".auth.session");

  getSession() {
    const token = localStorage.getItem(this.KEY);
    const isAuth = !isNullOrEmpty(token);

    return { token, isAuth };
  }

  setSession(session: string) {
    localStorage.setItem(this.KEY, session);
  }

  deleteSession() {
    localStorage.removeItem(this.KEY);
  }
}
