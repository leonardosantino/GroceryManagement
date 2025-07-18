import { Typography, TypographyProps } from "@mui/material";

type TextProps = {
  maxLength?: number;
} & TypographyProps;

export function Text(props: TextProps) {
  const maxLength = props.maxLength ?? 0;
  const children = props.children as string;

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
      {...props}
      sx={{
        wordWrap: "break-word",
        textWrap: "wrap",
        ...props.sx,
      }}
    >
      {str}
    </Typography>
  );
}
