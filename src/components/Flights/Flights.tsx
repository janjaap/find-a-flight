import { useState } from 'react';

import type { MouseEvent } from 'react';
import type { Criteria } from '@/types/Criteria';
import type { Flight } from '@/types/Flight';

import styles from './Flights.module.css';

type Sort = 'asc' | 'desc';
type DateStyle = "full" | "long" | "medium" | "short"

interface Props {
  criteria: Criteria | null;
  flights: Array<Flight>;
}

const formatFlightDate = (date: string, dateStyle?: DateStyle) => new Date(date).toLocaleDateString('nl-NL', { timeZone: 'UTC', dateStyle })

export function Flights({ flights, criteria }: Props) {
  const [sort, setSort] = useState<Sort>('asc');

  function onSort(event: MouseEvent<HTMLButtonElement>) {
    if (sort === 'asc') {
      setSort('desc');
    } else {
      setSort('asc');
    }
  }

  function sortByExpectedTime(flightA: Flight, flightB: Flight) {
    let sortDirection = 0;

    if (flightA.expectedTime < flightB.expectedTime) {
      sortDirection = -1;
    } else if (flightA.expectedTime > flightB.expectedTime) {
      sortDirection = 1;
    }

    return sort === 'asc' ? sortDirection : sortDirection * -1;
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

              <p>Aantal gevonden vluchten: <strong>{flights.length}</strong></p>
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
            {flights.sort(sortByExpectedTime).map((flight) => (
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
        <span>Geen vluchten gevonden met {formattedCriteria.join(' en ')}</span>
      )}
    </div>
  );
};
