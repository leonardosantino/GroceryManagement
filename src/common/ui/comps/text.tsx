import { SxProps, Theme, Typography, TypographyVariant } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

type Props = {
  children: string;
  sx?: SxProps<Theme>;
  variant?: OverridableStringUnion<TypographyVariant>;
  userSelect?: "none" | "auto";
  noWrap?: boolean;
  maxLength?: number;
};

export function Text({
  children,
  sx,
  variant,
  noWrap = false,
  userSelect = "none",
  maxLength = 0,
}: Props) {
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
