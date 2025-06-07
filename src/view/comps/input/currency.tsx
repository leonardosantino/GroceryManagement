import { TextField } from "@mui/material";
import { ChangeEvent, Ref, useState } from "react";

export function TextFieldCurrency({
  inputRef,
  error,
  required,
}: {
  inputRef: Ref<HTMLInputElement>;
  error?: boolean;
  required?: boolean;
}) {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(currencyFromString({ value: e.target.value, maxLength: 9 }));
  };

  return (
    <TextField
      required={required}
      placeholder="Preço"
      value={value}
      onChange={handleChange}
      error={error}
      inputRef={inputRef}
    />
  );
}

function currencyFromString({
  value,
  maxLength,
}: {
  value: string;
  maxLength: number;
}) {
  if (value.length > maxLength) return value.substring(0, 9);

  const digits = value.replace(/\D/g, "");

  const number = Number(digits) / 100;

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}

export function doubleFromCurrency(str: string) {
  return Number(str.replace(/R\$/g, "").replace(/\./g, "").replace(",", "."));
}
