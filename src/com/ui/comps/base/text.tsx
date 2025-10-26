import { ReactNode } from "react";
import { Property } from "csstype";

import Typography from "@mui/material/Typography";

import {
  TextTheme,
  ThemeTextColor,
  ThemeTextSize,
  ThemeTextWeight,
} from "@/com/ui/schema/scheme";

type TextProps = {
  flex?: number;
  maxLength?: number;
  size?: ThemeTextSize;
  color?: ThemeTextColor;
  align?: Property.TextAlign;
  weight?: ThemeTextWeight;
  children: ReactNode;
};

export function Text(props: Readonly<TextProps>) {
  const { flex, size, color, align, weight, maxLength = 0, ...rest } = props;

  const viewStyle: Record<string, string | number> = {};

  if (flex) viewStyle.flex = flex;
  if (size) viewStyle.fontSize = TextTheme[size];
  if (color) viewStyle.color = TextTheme[color];
  if (weight) viewStyle.fontWeight = TextTheme[weight];
  if (align) viewStyle.textAlign = align;

  const str = getStr();

  function getStr() {
    const children = props.children as string;

    if (maxLength) {
      return strConcat(children);
    }
    return children;
  }

  function strConcat(str: string) {
    if (maxLength < str.length) return getSubStr(str).concat(" ...");

    return str;
  }

  function getSubStr(str: string) {
    return str.substring(0, maxLength);
  }

  return (
    <Typography
      sx={{
        wordWrap: "break-word",
        textWrap: "wrap",
        ...viewStyle,
      }}
      {...rest}
    >
      {str}
    </Typography>
  );
}
