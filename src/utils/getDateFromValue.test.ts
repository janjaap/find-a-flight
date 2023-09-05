import { getDateFromValue } from "./getDateFromValue";

describe('getDateFromValue', () => {
  it('returns a UTC date', () => {
    expect(getDateFromValue('20-02-2024')?.toISOString()).toEqual('2024-02-20T00:00:00.000Z');
  });

  it('returns no date object for a non-Dutch formatted date', () => {
    expect(getDateFromValue('02/20/2024')?.toISOString()).not.toEqual('2024-02-20T00:00:00.000Z');
  });
});
