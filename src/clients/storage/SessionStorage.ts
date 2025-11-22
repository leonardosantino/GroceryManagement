import { App } from "@/schema/app";

import { isEmpty, isNull } from "@/com/validation";

export class SessionStorage {
  readonly KEY = App.schema.concat(".auth.session");

  getSession() {
    const str = localStorage.getItem(this.KEY);

    if (isNull(str)) return { isAuth: false };

    const { id, token } = JSON.parse(str);
    const isAuth = !isEmpty(token);

    return { id, token, isAuth };
  }

  setSession(session: { id: string; token: string }) {
    const str = JSON.stringify(session);

    localStorage.setItem(this.KEY, str);
  }

  deleteSession() {
    localStorage.removeItem(this.KEY);
  }
}
