import { isNull } from "@/com/validation";

export function toYearMonthDayHourMinute(date?: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  if (!isNull(date))
    return new Intl.DateTimeFormat("pt-BR", options).format(new Date(date));
}

export function toYearMonthDay(date?: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  if (!isNull(date))
    return new Intl.DateTimeFormat("pt-BR", options).format(new Date(date));
}

export function toMonthDayHourMinute(date?: string) {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  if (!isNull(date))
    return new Intl.DateTimeFormat("pt-BR", options).format(new Date(date));
}

export function toMonthDay(date?: string) {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "2-digit",
  };

  if (!isNull(date))
    return new Intl.DateTimeFormat("pt-BR", options).format(new Date(date));
}

export function toHourMinute(date?: string) {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  if (!isNull(date))
    return new Intl.DateTimeFormat("pt-BR", options).format(new Date(date));
}
