import { Box, BoxProps, BoxStyle } from "@/com/ui/comps/box";
import { ColorTheme, ThemeColor } from "@/com/ui/style/scheme";

type Props = {
  borderColor?: ThemeColor;
  boxColor?: ThemeColor;
  borderRadius?: number;
} & BoxProps;

export function Deco(props: Readonly<Props>) {
  const { borderColor, borderRadius, boxColor, ...rest } = props;

  const viewStyle: BoxStyle = {
    borderWidth: 0.2,
    borderRadius: 8,
    borderColor: ColorTheme.outline,
  };

  if (boxColor) viewStyle.backgroundColor = ColorTheme[boxColor];
  if (borderColor) viewStyle.borderColor = ColorTheme[borderColor];

  if (borderRadius) viewStyle.borderRadius = borderRadius;

  return <Box style={viewStyle} {...rest} />;
}
