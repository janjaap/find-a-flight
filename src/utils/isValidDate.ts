import { getDateFromValue } from "./getDateFromValue";
import { getDateParts } from "./getDateParts";

export function isValidDate(value?: string) {
  if (!value) return false;

  const validDate = getDateFromValue(value);

  if (!validDate) return false;

  const [day, month, year] = getDateParts(value);

  const sameDay = validDate.getDate() === day;
  const sameMonth = validDate.getMonth() + 1 === month;
  const sameYear = validDate.getFullYear() === year;

  return sameDay && sameMonth && sameYear;
}
