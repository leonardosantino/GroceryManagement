import { notificationPermission } from "@/com/global/notification";

import { ws } from "@/clients/socket";

export function onAuth(session: { isLoading: boolean; isAuth: boolean }) {
  if (session.isLoading) return;

  if (session.isAuth) {
    notificationPermission();
    ws.activate();
  } else {
    ws.deactivate();
  }
}
