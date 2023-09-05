interface Props {
  direction: 'departures' | 'arrivals';
  flightDate?: string;
  searchString?: string;
}

export const useFetchFlights = () =>
  async function fetchFlights({ direction, flightDate, searchString }: Props) {
    const { flights } = await fetch(
      `/api/flights?direction=${direction}&flightDate=${flightDate}&searchString=${searchString}`
    ).then((data) => data.json());

    return flights;
  };
