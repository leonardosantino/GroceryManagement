export function isNullOrEmptyList(it?: unknown[]) {
  return isNull(it) || isEmptyList(it);
}

export function isEmptyList(it?: unknown[]) {
  return it?.length === 0;
}

export function isEmptySet(it?: Set<unknown>) {
  return it?.size === 0;
}

export function isNotNullOrEmpty(it?: string | null) {
  return !isNullOrEmpty(it);
}

export function isNullOrEmpty(it?: string | null) {
  return isNull(it) || isEmpty(it);
}

export function isEmpty(it: string) {
  return it.trim() === "";
}

export function isNotNull(it: unknown) {
  return !isNull(it);
}

export function isNull(it: unknown) {
  return it == null || it === "null" || it === undefined || it === "undefined";
}
