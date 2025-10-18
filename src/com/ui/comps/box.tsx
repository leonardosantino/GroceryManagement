import { Property } from "csstype";
import { Box as Bx, SxProps } from "@mui/material";
import { ReactNode } from "react";

export type StyleProps = SxProps;

export type BoxStyle = {
  position?: Property.Position;
  flex?: number;
  direction?: Property.FlexDirection;
  wrap?: Property.FlexWrap;
  justify?: Property.JustifyContent;
  align?: Property.AlignItems;
  width?: number;
  maxWidth?: number;
  height?: string | number;
  padding?: number;
  paddingX?: number;
  paddingY?: number;
  margin?: number;
  marginX?: number;
  gap?: number;
  style?: SxProps;
  children?: ReactNode;
};

export function Box(props: Readonly<BoxStyle>) {
  const {
    position,
    flex,
    direction,
    wrap,
    justify,
    align,
    width,
    maxWidth,
    height,
    padding,
    paddingX,
    paddingY,
    margin,
    marginX,
    gap,
    style,
    ...rest
  } = props;

  const viewStyle: Record<string, string | number> = {};

  if (position) {
    viewStyle.position = position;
    viewStyle.right = 0;
    viewStyle.left = 0;
  }
  if (flex) {
    viewStyle.flexGrow = flex;
    viewStyle.flexShrink = 1;
    viewStyle.flexBasis = 0;
  }
  if (direction) viewStyle.flexDirection = direction;
  if (wrap) viewStyle.flexWrap = wrap;
  if (justify) viewStyle.justifyContent = justify;
  if (align) viewStyle.alignItems = align;
  if (width) viewStyle.width = width;
  if (maxWidth) viewStyle.maxWidth = maxWidth;
  if (height) viewStyle.height = height;
  if (padding) viewStyle.padding = padding;
  if (paddingX) {
    viewStyle.paddingLeft = paddingX;
    viewStyle.paddingRight = paddingX;
  }
  if (paddingY) {
    viewStyle.paddingTop = paddingY;
    viewStyle.paddingBottom = paddingY;
  }
  if (margin) viewStyle.margin = margin;
  if (marginX) {
    viewStyle.marginLeft = marginX;
    viewStyle.marginRight = marginX;
  }
  if (gap) viewStyle.gap = gap;

  return (
    <Bx
      sx={{
        display: "flex",
        ...viewStyle,
        ...style,
      }}
      {...rest}
    />
  );
}
