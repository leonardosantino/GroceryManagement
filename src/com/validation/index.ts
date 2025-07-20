export function isNotNullOrEmpty(it: string) {
  return !isNullOrEmpty(it);
}

export function isNullOrEmpty(it: unknown) {
  return isNull(it) || isEmpty(it as string);
}

export function isEmpty(it: string) {
  return it.trim() == "";
}

export function isNotNull(it: unknown) {
  return !isNull(it);
}

export function isNull(it: unknown) {
  return it == null || it == "null" || it == undefined || it == "undefined";
}
