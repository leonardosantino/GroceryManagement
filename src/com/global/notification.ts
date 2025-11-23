export function notification(params: { title: string; message: string }) {
  new Notification(params.title, {
    body: params.message,
    silent: false,
  });
}
