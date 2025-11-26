import { app } from "@/schema/app";

import { isEmpty } from "@/com/validation";

export class SessionStorage {
  readonly KEY = app.schema.concat(".auth.session");

  getSession() {
    const strSession = sessionStorage.getItem(this.KEY);

    if (strSession) {
      const { id, token } = JSON.parse(strSession);
      const isAuth = !isEmpty(token);

      return { id, token, isAuth };
    }

    const strLocal = localStorage.getItem(this.KEY);

    if (strLocal) {
      const { id, token } = JSON.parse(strLocal);
      const isAuth = !isEmpty(token);

      return { id, token, isAuth };
    }

    return { isAuth: false };
  }

  setSession(session: { id: string; token: string; isPersistent: boolean }) {
    const str = JSON.stringify(session);

    if (session.isPersistent) localStorage.setItem(this.KEY, str);
    else sessionStorage.setItem(this.KEY, str);
  }

  deleteSession() {
    localStorage.removeItem(this.KEY);
    sessionStorage.removeItem(this.KEY);
  }
}
