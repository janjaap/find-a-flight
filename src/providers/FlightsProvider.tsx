import { createContext, useContext, useState } from 'react';

import type { PropsWithChildren } from 'react';
import type { Criteria } from '@/types/Criteria';
import type { Flight } from '@/types/Flight';

type FlightsContextType = {
  criteria: Criteria | null;
  flights: Array<Flight> | null;
  setCriteria: ({ flightDate, searchString }: Criteria) => void;
  setFlights: (flights: Array<Flight>) => void;
};

export const FlightsContext = createContext<FlightsContextType | null>(null);

export function FlightsProvider({ children }: PropsWithChildren) {
  const [flights, setFlights] = useState<Array<Flight> | null>(null);
  const [criteria, setCriteria] = useState<Criteria | null>(null);

  const initialContext = {
    criteria,
    flights,
    setCriteria,
    setFlights,
  };

  return <FlightsContext.Provider value={initialContext}>{children}</FlightsContext.Provider>;
}

export function useFlights() {
  const context = useContext(FlightsContext);

  if (!context) throw new Error('useFlights can only be used in a FlightsProvider');

  return context;
}
