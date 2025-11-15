export function isStatusNotAuthorized(status: number) {
  return status === 401;
}

export function isStatusNoContent(status: number) {
  return status === 204;
}
