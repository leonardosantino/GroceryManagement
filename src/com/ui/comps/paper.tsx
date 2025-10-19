import { Paper as Pa } from "@mui/material";
import { BoxProps, BoxStyle } from "@/com/ui/comps/box";

export function Paper(props: BoxProps) {
  const { flex, direction, wrap, justify, align, style, children, ...others } =
    props;

  const viewStyle: BoxStyle = {
    display: "flex",
  };

  if (flex) viewStyle.flexGrow = flex;
  if (direction) viewStyle.flexDirection = direction;
  if (wrap) viewStyle.flexWrap = wrap;
  if (justify) viewStyle.justifyContent = justify;
  if (align) viewStyle.alignItems = align;

  return (
    <Pa
      sx={{
        ...viewStyle,
        ...others,
        ...style,
      }}
    >
      {children}
    </Pa>
  );
}
