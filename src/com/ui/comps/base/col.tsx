import { BoxProps, Box, BoxStyle } from "@/com/ui/comps/base/box";

export function Col(props: Readonly<BoxProps>) {
  const viewStyle: BoxStyle = {
    flexDirection: "column",
  };

  return <Box style={viewStyle} {...props} />;
}
