import TextField, { TextFieldProps } from "@mui/material/TextField";

export function Input(props: TextFieldProps) {
  return <TextField size="small" {...props} />;
}
