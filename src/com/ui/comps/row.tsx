import { BoxProps, Box, BoxStyle } from "@/com/ui/comps/box";

export function Row(props: Readonly<BoxProps>) {
  const { wrap, ...rest } = props;

  const viewStyle: BoxStyle = {
    flexWrap: "wrap",
  };

  if (wrap) viewStyle.flexWrap = wrap;

  return <Box style={viewStyle} {...rest} />;
}
