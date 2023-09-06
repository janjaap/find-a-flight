import { NextApiRequest, NextApiResponse } from 'next';
import flightsHandler, { Data, departures } from './flights';
import { createMocks } from 'node-mocks-http';
import { getDateFromValue } from '../../utils/getDateFromValue';

describe('flights API', () => {
  it('returns full list of flights when no search parameters are given', async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse<Data>>({
      method: 'GET',
    });

    await flightsHandler(req, res);

    expect(res.statusCode).toBe(200);

    const { flights } = res._getJSONData();

    expect(flights).toHaveLength(departures.length);
  });

  it('returns an empty list for arrivals', async () => {
    // arrivals has not yet been implemented
    const { req, res } = createMocks<NextApiRequest, NextApiResponse<Data>>({
      method: 'GET',
      query: {
        direction: 'arrivals',
      }
    });

    await flightsHandler(req, res);

    const { flights } = res._getJSONData();
    expect(flights.length).toBe(0);
  });

  it('returns all matching flights for a specific date', async () => {
    const date = getDateFromValue('23-02-2022');

    const { req, res } = createMocks<NextApiRequest, NextApiResponse<Data>>({
      method: 'GET',
      query: {
        flightDate: date?.toUTCString(),
      }
    });

    await flightsHandler(req, res);

    const { flights } = res._getJSONData();

    expect(flights.length).not.toBe(0);

    // the amount of returned flights should be less than the total
    expect(flights.length).toBeLessThan(departures.length);
  });

  it('returns an empty list for unavailable date', async () => {
    // date for which there are no flights available
    const date = getDateFromValue('23-02-2024');

    const { req, res } = createMocks<NextApiRequest, NextApiResponse<Data>>({
      method: 'GET',
      query: {
        flightDate: date?.toUTCString(),
      }
    });

    await flightsHandler(req, res);

    const { flights } = res._getJSONData();
    expect(flights.length).toBe(0);
  });

  it('returns all matching flights for a specific destination', async () => {
    // case should not matter when searching
    const destination = 'lOnDoN';

    const { req, res } = createMocks<NextApiRequest, NextApiResponse<Data>>({
      method: 'GET',
      query: {
        searchString: destination,
      }
    });

    await flightsHandler(req, res);

    const { flights } = res._getJSONData();

    expect(flights.length).not.toBe(0);

    // the amount of returned flights should be less than the total
    expect(flights.length).toBeLessThan(departures.length);
  });

  it('returns an empty list for unavailable destination', async () => {
    const destination = 'Enkhuizen';

    const { req, res } = createMocks<NextApiRequest, NextApiResponse<Data>>({
      method: 'GET',
      query: {
        searchString: destination,
      }
    });

    await flightsHandler(req, res);

    const { flights } = res._getJSONData();
    expect(flights.length).toBe(0);
  });
});
