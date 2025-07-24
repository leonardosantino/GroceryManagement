import { Input, InputProps } from "@mui/material";

import { Button } from "@/com/ui";

export function InputFile(props: Readonly<InputProps>) {
  return (
    <Button
      component="label"
      variant={"outlined"}
      sx={{ position: "relative" }}
    >
      Selecione
      <VisuallyHiddenInput {...props} />
    </Button>
  );
}

function VisuallyHiddenInput(props: Readonly<InputProps>) {
  return (
    <Input
      type="file"
      inputProps={{ accept: "image/*" }}
      sx={{ clipPath: "inset(50%)", position: "absolute" }}
      {...props}
    />
  );
}
