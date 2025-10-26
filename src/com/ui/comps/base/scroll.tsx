import { BoxProps, BoxStyle, Box } from "@/com/ui/comps/base/box";

export function ScrollCol(props: Readonly<BoxProps>) {
  const viewStyle: BoxStyle = {
    flexDirection: "column",
    overflow: "scroll",
    scrollbarWidth: "none",
  };

  return <Box style={viewStyle} {...props} />;
}
