import { ReactNode } from "react";
import { Properties, Property } from "csstype";

import {
  TextTheme,
  ThemeTextColor,
  ThemeTextSize,
  ThemeTextWeight,
} from "@/com/ui/schema/scheme";

type TextProps = {
  flex?: number;
  size?: ThemeTextSize;
  color?: ThemeTextColor;
  align?: Property.TextAlign;
  weight?: ThemeTextWeight;
  maxLength?: number;

  children: ReactNode;
};

export function Text(textProps: Readonly<TextProps>) {
  const {
    flex,
    size,
    color,
    align,
    weight,
    maxLength = 0,
    children,
  } = textProps;

  const style: Properties = {
    wordWrap: "break-word",
    textWrap: "wrap",
    margin: 0,
  };

  if (flex) {
    style.display = "flex";

    style.flexGrow = flex;
    style.flexShrink = 1;
    style.flexBasis = 0;
  }

  if (size) style.fontSize = `${TextTheme[size]}px`;
  if (color) style.color = TextTheme[color];
  if (align) style.textAlign = align;
  if (weight) style.fontWeight = TextTheme[weight];

  const str = getStr();

  function getStr() {
    const str = children as string;

    if (maxLength) {
      return strConcat(str);
    }
    return str;
  }

  function strConcat(str: string) {
    if (maxLength < str.length) return getSubStr(str).concat(" ...");

    return str;
  }

  function getSubStr(str: string) {
    return str.substring(0, maxLength);
  }

  return <p style={style}>{str}</p>;
}
