import { BoxStyle, Box, StyleProps } from "@/com/ui/comps/box";

export function Col(props: Readonly<BoxStyle>) {
  const viewStyle: StyleProps = {
    flexDirection: "column",
  };

  return <Box style={viewStyle} {...props} />;
}
