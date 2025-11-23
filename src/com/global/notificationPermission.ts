export function notificationPermission() {
  if (!globalThis.Notification) return;

  if (globalThis.Notification.permission !== "granted")
    Notification.requestPermission();
}
