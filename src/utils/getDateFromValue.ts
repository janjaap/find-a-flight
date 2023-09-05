import { getDateParts } from "./getDateParts";

export function getDateFromValue(value?: string) {
  if (!value) return null;

  const [day, month, year] = getDateParts(value);

  return new Date(Date.UTC(year, month - 1, day));
}
