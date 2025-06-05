import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

export function TextFieldCurrency() {
  const [value, setValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(formatCurrency({ value: e.target.value, maxLength: 9 }));
  };

  return (
    <TextField placeholder="Preço" value={value} onChange={handleChange} />
  );
}

function formatCurrency({
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
