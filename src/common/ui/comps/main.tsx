import { ReactNode } from "react";

import { Row } from "@/common/ui/comps/row";

type Props = {
  children: ReactNode;
};

export function Main({ children }: Props) {
  return <Row sx={{ flexGrow: 1, justifyContent: "center" }}>{children}</Row>;
}
