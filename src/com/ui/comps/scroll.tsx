import { BoxProps } from "@mui/material";

import { Col } from "@/com/ui";

export function ScrollCol(props: BoxProps) {
  return (
    <Col
      {...props}
      sx={{
        overflow: "scroll",
        scrollbarWidth: "none",
        ...props.sx,
      }}
    />
  );
}
