import {
  Box as MUIBox,
  Paper as MUIPaper,
  SxProps,
  Theme,
  Typography,
  TypographyVariant,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import Image from "next/image";
import { ReactNode } from "react";

type TextProps = {
  children: string;
  sx?: SxProps<Theme>;
  variant?: OverridableStringUnion<TypographyVariant>;
  userSelect?: "none" | "auto";
  noWrap?: boolean;
  maxLength?: number;
  color?: string;
};

export function Text({
  children,
  sx,
  variant,
  noWrap = false,
  userSelect = "none",
  maxLength = 0,
  color,
}: TextProps) {
  const str = getStr();

  function getStr() {
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
      noWrap={noWrap}
      color={color}
      sx={{
        wordWrap: "break-word",
        userSelect: userSelect,
        ...sx,
      }}
      variant={variant}
    >
      {str}
    </Typography>
  );
}

type ColProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export function Col({ children, sx }: ColProps) {
  return (
    <MUIBox
      sx={{
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
    >
      {children}
    </MUIBox>
  );
}

type RowProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export function Row({ children, sx }: RowProps) {
  return (
    <MUIBox
      sx={{
        display: "flex",
        ...sx,
      }}
    >
      {children}
    </MUIBox>
  );
}

type BoxProps = {
  children?: ReactNode;
  sx?: SxProps<Theme>;
};

export function Box({ children, sx }: BoxProps) {
  return (
    <MUIBox
      sx={{
        borderStyle: "solid",
        borderColor: "outline",
        borderWidth: 1,
        borderRadius: 1,
        backgroundColor: "surface",
        ...sx,
      }}
    >
      {children}
    </MUIBox>
  );
}

type PaperProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
  variant?: OverridableStringUnion<"elevation" | "outlined">;
  elevation?: number;
};

export function Paper({ children, variant, elevation = 0, sx }: PaperProps) {
  return (
    <MUIPaper variant={variant} elevation={elevation} sx={sx}>
      {children}
    </MUIPaper>
  );
}

export function Img({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return <Image src={src} alt={alt} width={width} height={height} />;
}

type FormProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export function Form({ children, sx }: FormProps) {
  return (
    <MUIBox component={"form"} sx={sx}>
      {children}
    </MUIBox>
  );
}
