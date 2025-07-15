import { RefObject } from "react";

export function refScroll(ref: RefObject<HTMLInputElement | null>) {
  ref.current?.scrollIntoView({ behavior: "smooth" });
}

export function refValue(ref: RefObject<HTMLInputElement | null>): string {
  return ref.current?.value as string;
}
