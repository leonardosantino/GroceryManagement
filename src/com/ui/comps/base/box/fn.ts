import { ReactNode } from "react";
import { Properties } from "csstype";

import { typeofNumber, typeofString } from "@/com/validation/typeof";

import { BoxStyle, BoxProps } from "@/com/ui/comps/base/box/type";
import { ColorTheme } from "@/com/ui/theme/scheme";

export function styleProperties(boxProps: BoxStyle): Properties {
  const {
    flex,
    direction,
    justify,
    align,
    wrap,

    height,
    minHeight,
    width,
    maxWidth,
    padding,
    margin,
    marginX,
    gap,

    backgroundColor,
    borderColor,

    borderRadius,
    borderWidth,

    ...commonStyle
  } = boxProps;

  const style: Properties = {
    display: "flex",
    ...commonStyle,
  };

  if (flex) {
    style.flexGrow = flex;
    style.flexShrink = 1;
    style.flexBasis = 0;
  }
  if (direction) style.flexDirection = direction;
  if (wrap) style.flexWrap = wrap;
  if (justify) style.justifyContent = justify;
  if (align) style.alignItems = align;

  if (typeofNumber(height)) style.height = getPx(height);
  else if (typeofString(height)) style.height = height;

  if (minHeight) style.minHeight = getPx(minHeight);

  if (typeofNumber(width)) style.width = getPx(width);
  else if (typeofString(width)) style.width = width;

  if (maxWidth) style.maxWidth = getPx(maxWidth);
  if (padding) style.padding = get4xPx(padding);
  if (margin) style.margin = get4xPx(margin);
  if (marginX) {
    style.marginLeft = style.marginRight = get4xPx(marginX);
  }
  if (gap) style.gap = get4xPx(gap);

  if (backgroundColor) style.backgroundColor = ColorTheme[backgroundColor];
  if (borderColor) style.borderColor = ColorTheme[borderColor];

  if (borderRadius) style.borderRadius = get4xPx(borderRadius);
  if (borderWidth) style.borderWidth = get4xPx(borderWidth);

  return style;
}

export function compProps(boxProps: BoxProps) {
  const { children, testId } = boxProps;

  const props: {
    children?: ReactNode;
    "data-testid"?: string;
  } = {
    children,
  };

  if (testId) props["data-testid"] = testId;

  return props;
}

export function getPx(n: number) {
  return `${n}px`;
}

export function get4xPx(n: number) {
  return `${n * 4}px`;
}
