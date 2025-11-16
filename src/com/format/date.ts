import { isNullOrEmpty } from "@/com/validation";

export function toLocalDate(date?: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  if (!isNullOrEmpty(date))
    return new Intl.DateTimeFormat("pt-BR", options).format(
      new Date(date as string),
    );
}

export function toLocalDayMonth(date?: string) {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "2-digit",
  };

  if (!isNullOrEmpty(date))
    return new Intl.DateTimeFormat("pt-BR", options).format(
      new Date(date as string),
    );
}

export function toLocalDayMonthYear(date?: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  if (!isNullOrEmpty(date))
    return new Intl.DateTimeFormat("pt-BR", options).format(
      new Date(date as string),
    );
}

export function toLocalDayMonthHour(date?: string) {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  if (!isNullOrEmpty(date))
    return new Intl.DateTimeFormat("pt-BR", options).format(
      new Date(date as string),
    );
}

export function toLocalDateTime(date?: string) {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  if (!isNullOrEmpty(date))
    return new Intl.DateTimeFormat("pt-BR", options).format(
      new Date(date as string),
    );
}

export function toDatePlus30Minutes(date?: string) {
  if (!isNullOrEmpty(date)) {
    const newDate = new Date(date as string);

    newDate.setMinutes(newDate.getMinutes() + 30);

    return toLocalDateTime(newDate.toISOString());
  }
}
