import { ReactNode } from "react";

type Props = {
  bool?: boolean;
  children: ReactNode;
  childrenAlt?: ReactNode;
};

export function Conditional({ bool, children, childrenAlt = null }: Props) {
  if (bool) return children;

  return childrenAlt;
}
