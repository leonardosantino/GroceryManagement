import { ReactNode } from "react";

type Props = {
  bool: boolean;
  children: ReactNode;
};

export function Conditional({ bool, children }: Props) {
  if (bool) {
    return children;
  }
}
