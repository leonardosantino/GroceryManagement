export function notification(params: {
  title: string;
  message: string;
  onclick: () => void;
}) {
  const notify = new Notification(params.title, {
    body: params.message,
  });

  notify.addEventListener("click", () => params.onclick());
}

export function notificationPermission() {
  if (!globalThis.Notification) return;

  if (globalThis.Notification.permission !== "granted")
    Notification.requestPermission();
}
