export function isNullOrEmptyList(it?: unknown[]) {
  return isNull(it) || it?.length === 0;
}

export function isNullOrEmptySet(it?: Set<unknown>) {
  return isNull(it) || it?.size === 0;
}

export function isNullOrEmpty(it?: string | null) {
  return isNull(it) || isEmpty(it);
}

export function isEmpty(it: string) {
  return it.trim() === "";
}

export function isNull(it: unknown) {
  return it == null || it === "null" || it === undefined || it === "undefined";
}
