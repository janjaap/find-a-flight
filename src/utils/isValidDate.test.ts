import { isValidDate } from "./isValidDate";

describe('isValidDate', () => {
  it('returns true for a valid date', () => {
    expect(isValidDate('22-02-2022')).toEqual(true);
    expect(isValidDate('22/02/2022')).toEqual(true);
  });

  it('returns false for an invalid date', () => {
    expect(isValidDate()).toEqual(false);
    expect(isValidDate(' ')).toEqual(false);
    expect(isValidDate('30-02-2022')).toEqual(false);
    expect(isValidDate('02/22/2022')).toEqual(false);
  });
});
