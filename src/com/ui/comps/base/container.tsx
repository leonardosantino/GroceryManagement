import { BoxProps, Box, BoxStyle } from "@/com/ui/comps/base/box";

export function Container(props: Readonly<BoxProps>) {
  const { wrap, ...rest } = props;

  const viewStyle: BoxStyle = {
    height: "inherit",
    flexWrap: "nowrap",
  };

  if (wrap) viewStyle.flexWrap = wrap;

  return <Box style={viewStyle} {...rest} />;
}
