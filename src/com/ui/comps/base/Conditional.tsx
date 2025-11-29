import { ReactNode } from "react";

type Props = {
  bool?: boolean;
  isLoading?: boolean;
  children: ReactNode;
  childrenAlt?: ReactNode;
};

export function Conditional({
  bool,
  isLoading,
  children,
  childrenAlt = null,
}: Props) {
  if (isLoading) return null;
  if (bool) return children;

  return childrenAlt;
}
