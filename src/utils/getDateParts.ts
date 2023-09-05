export const getDateParts = (value: string) => value.split(/\W/).map((val) => Number.parseInt(val, 10));
