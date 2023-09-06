import { useState } from 'react';

import type { MouseEvent } from 'react';
import type { Criteria } from '@/types/Criteria';
import type { Flight } from '@/types/Flight';

import styles from './Flights.module.css';
import { getDateFromValue } from '@/utils/getDateFromValue';

type Sort = 'asc' | 'desc';
type DateStyle = "full" | "long" | "medium" | "short";

interface Props {
  criteria: Criteria | null;
  flights: Array<Flight>;
}

const formatFlightDate = (date: string, dateStyle?: DateStyle) => new Date(date).toLocaleDateString('nl-NL', { timeZone: 'UTC', dateStyle });

function getDateTimeFromFlight(flight: Flight) {
  const date = getDateFromValue(flight.date);

  if (!date) return new Date();

  const [hours, minutes] = flight.expectedTime.split(':').map((timePart) => Number.parseInt(timePart, 10));

  date?.setHours(hours);
  date?.setMinutes(minutes);

  return date;
}

export function Flights({ flights, criteria }: Props) {
  const [sort, setSort] = useState<Sort>('asc');

  function onSort(event: MouseEvent<HTMLButtonElement>) {
    if (sort === 'asc') {
      setSort('desc');
    } else {
      setSort('asc');
    }
  }

  function sortByExpectedDateTime(flightA: Flight, flightB: Flight) {
    const dateA = getDateTimeFromFlight(flightA);
    const dateB = getDateTimeFromFlight(flightB);

    return sort === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  }

  const formattedCriteria = [
    criteria?.flightDate && `datum ${formatFlightDate(criteria.flightDate, 'long')}`,
    criteria?.searchString && `vlucht/bestemming ${criteria.searchString}`,
  ].filter(Boolean);

  return (
    <div className={styles.flights}>
      {flights.length ? (
        <>
          <div className={styles['flights-list-header']}>
            <div>
              <div>
                {criteria?.flightDate && <>Alle vluchten met aankomstdatum <strong className={styles['flights-date']}>{formatFlightDate(criteria.flightDate, 'long')}</strong></>}
              </div>

              <p data-testid="numberOfFoundFlights">Aantal gevonden vluchten: <strong>{flights.length}</strong></p>
            </div>

            {flights.length > 1 && (
              <div>
                <button className={styles['flights-list-sort-button']} onClick={onSort}>
                  Sorteer {sort === 'asc' ? <span aria-label='Sorteer op datum aflopend'>&uarr;</span> : <span aria-label='Sorteer op datum oplopend'>&darr;</span>}
                </button>
              </div>
            )}
          </div>

          <ul className={styles['flights-list']}>
            {[...flights].sort(sortByExpectedDateTime).map((flight) => (
              <li className={styles['flights-list-card']} key={flight.flightIdentifier}>
                <div className={styles['flights-list-card__section']}>
                  {flight.expectedTime}
                  {!criteria?.flightDate && (
                    <div className={styles['flights-date']}>
                      {new Date(flight.date).toLocaleDateString('nl-NL', { timeZone: 'UTC', dateStyle: 'medium' })}
                    </div>
                  )}
                </div>
                <div className={styles['flights-list-card__section']}>
                  <strong className={styles['flights-list-card__airport']}>{flight.airport}</strong>
                  {flight.flightNumber}
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <span>Geen vluchten gevonden {formattedCriteria.length > 0 && <>met {formattedCriteria.join(' en ')}</>}</span>
      )}
    </div>
  );
};
