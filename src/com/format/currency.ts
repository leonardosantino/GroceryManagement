export function currencyFromString({
  value,
  maxLength,
}: {
  value: string;
  maxLength: number;
}) {
  if (value.length > maxLength) return value.substring(0, 9);

  const digits = value.replaceAll(/\D/g, "");

  const number = Number(digits) / 100;

  return currencyFromDouble(number);
}

export function doubleFromCurrency(str: string) {
  return Number(str.replaceAll("R$", "").replaceAll(".", "").replace(",", "."));
}

export function currencyFromDouble(number?: number) {
  return number?.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
}
