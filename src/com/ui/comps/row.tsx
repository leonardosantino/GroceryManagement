import { BoxStyle, Box, StyleProps } from "@/com/ui/comps/box";

export function Row(props: Readonly<BoxStyle>) {
  const { wrap, ...rest } = props;

  const viewStyle: StyleProps = {
    direction: "row",
    wrap: "wrap",
  };

  if (wrap) viewStyle.wrap = wrap;

  return <Box style={viewStyle} {...rest} />;
}
