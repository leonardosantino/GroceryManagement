import { ReactNode } from "react";

export function conditionalRender(
  bool: boolean,
  component: ReactNode,
  other?: ReactNode,
) {
  if (bool) {
    return component;
  }

  return other;
}
