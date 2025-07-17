import { Button, Input, InputProps } from "@mui/material";

export function InputFile(props: Readonly<InputProps>) {
  return (
    <Button component="label" variant="outlined" sx={{ width: 100 }}>
      Selecione
      <VisuallyHiddenInput {...props} />
    </Button>
  );
}

function VisuallyHiddenInput(props: Readonly<InputProps>) {
  return (
    <Input
      {...props}
      type="file"
      inputProps={{ accept: "image/*" }}
      sx={{ clipPath: "inset(50%)" }}
    />
  );
}
