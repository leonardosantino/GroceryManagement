import { SxProps, Theme, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { OverridableStringUnion } from "@mui/types";

type Props = {
  children: string;
  sx?: SxProps<Theme>;
  variant?: OverridableStringUnion<Variant>;
  ellipsis?: boolean;
};

export function Text({ children, sx, variant, ellipsis = false }: Props) {
  if (ellipsis) {
    return (
      <Typography
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",

          ...sx,
        }}
        variant={variant}
      >
        {children}
      </Typography>
    );
  }
  return (
    <Typography
      sx={{
        wordWrap: "break-word",
        ...sx,
      }}
      variant={variant}
    >
      {children}
    </Typography>
  );
}
