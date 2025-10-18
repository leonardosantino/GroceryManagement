import { BoxStyle } from "@/com/ui/comps/box";

import { Col } from "@/com/ui";

export function ScrollCol(props: Readonly<BoxStyle>) {
  return (
    <Col
      style={{
        overflow: "scroll",
        scrollbarWidth: "none",
      }}
      {...props}
    />
  );
}
