import { useState } from 'react';

import type { ChangeEvent, FormEvent } from 'react';

import { Fieldset } from '../Fieldset/Fieldset';
import { Input } from '../Input/Input';
import { Label } from '../Label/Label';
import styles from './FindAFlight.module.css';

import { useFlights } from '@/providers/FlightsProvider';
import { useFetchFlights } from '@/hooks/useFetchFlights/useFetchFlights';
import { getDateFromValue } from '@/utils/getDateFromValue';
import { isValidDate } from '@/utils/isValidDate';

export function FindAFlight() {
  const [dateError, setDateError] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchString, setSearchString] = useState('');

  const fetchFlights = useFetchFlights();
  const { setFlights, setCriteria } = useFlights();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    setIsSubmitted(true);

    if (dateError) {
      return;
    }

    const dateFromValue = getDateFromValue(flightDate);

    const flights = await fetchFlights({
      direction: 'departures',
      flightDate: dateFromValue ? dateFromValue.toUTCString() : '',
      searchString,
    });

    setCriteria({ flightDate: dateFromValue ? dateFromValue.toUTCString() : undefined, searchString });
    setFlights(flights);

    setIsSubmitted(false);
    setDateError('');
  }

  function onChangeDate(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const { value, validity } = target;

    setFlightDate(value);
    setDateError('');

    if (!value) return;

    if (!validity.valid) {
      setDateError('Voer een datum in volgens het format DD-MM-YYYY');
      return;
    }

    // check if the date is a valid date
    if (!isValidDate(value)) {
      setDateError('Voer een geldige datum in');
      return;
    }
  }

  function onChangeSearchString(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event;

    setSearchString(target.value);
  }

  return (
    <div className={styles['find-a-flight']}>
      <h2 className={styles['find-a-flight__title']}>Vind een vlucht</h2>

      <form onSubmit={onSubmit} className={styles['find-a-flight__form']} noValidate>
        <Fieldset>
          <Label id="radioDepartures">
            <Input type="radio" name="direction" value="departures" id="radioDepartures" checked disabled />
            Vertrek
          </Label>

          <Label id="radioArrivals">
            <Input type="radio" name="direction" value="arrivals" id="radioArrivals" disabled />
            Aankomst
          </Label>
        </Fieldset>

        <Fieldset direction="vertical">
          <Label id="date" isVisuallyHidden>
            Datum
          </Label>

          <Input
            aria-describedby={dateError ? 'dateError' : undefined}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            erroneousInput={dateError}
            id="date"
            onChange={onChangeDate}
            pattern="([0-9]{2}-){2}[0-9]{4}"
            placeholder="Datum (DD-MM-YYYY)"
            spellCheck="false"
            type="text"
            value={flightDate}
          />
          {isSubmitted && dateError && <span id="dateError" className={styles['find-a-flight__error']}>{dateError}</span>}
        </Fieldset>

        <Fieldset>
          <Label id="flight" isVisuallyHidden>
            Vluchtnummer of bestemming
          </Label>

          <div className={styles['find-a-flight__submit-container']}>
            <Input
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              id="flight"
              onChange={onChangeSearchString}
              placeholder="Bij. KL 1001 of Londen"
              spellCheck="false"
              type="search"
              value={searchString}
            />

            <button type="submit" className={styles['find-a-flight__submit']}>
              <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentcolor"
                  d="M19.8 18.4l-4.2-4.2a6.5 6.5 0 10-9.1 1.5 6.7 6.7 0 003.9 1.2 6.5 6.5 0 003.8-1.3l4.2 4.2a1 1 0 101.6-1.2zm-13.9-8a4.5 4.5 0 019 0 4.6 4.6 0 01-4.5 4.5 4.5 4.5 0 01-4.5-4.5z"
                />
              </svg>
              <span className="visually-hidden">Zoeken</span>
            </button>
          </div>
        </Fieldset>
      </form>
    </div>
  );
}
