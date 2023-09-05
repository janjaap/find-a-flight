import { getDateParts } from "./getDateParts";

describe('getDateParts', () => {
  it('returns a list of numeric values', () => {
    const [day, month, year] = getDateParts('23-02-2022');

    expect(day).toEqual(23);
    expect(month).toEqual(2);
    expect(year).toEqual(2022);
  });

  it('does not take non-dutch dates into account', () => {
    // multi-language features not yet implemented
    const [day, month, year] = getDateParts('02/23/2022');

    expect(day).toEqual(2);
    expect(month).toEqual(23);
    expect(year).toEqual(2022);
  });
});
