import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Flights } from './Flights';

const flights = [
  {
    flightIdentifier: 'D20190401UA969',
    flightNumber: 'UA 969',
    airport: 'San Francisco',
    date: '2022-02-23',
    expectedTime: '14:50',
    originalTime: '14:50',
    url: '/en/departures/flight/D20190401UA969/',
    score: 70.55272,
  },
  {
    flightIdentifier: 'D20190401UA989',
    flightNumber: 'UA 989',
    airport: 'London Heathrow',
    date: '2022-02-24',
    expectedTime: '14:50',
    originalTime: '14:50',
    url: '/en/departures/flight/D20190401UA989/',
    score: 71.53476,
  },
  {
    flightIdentifier: 'D20190401VY8379',
    flightNumber: 'VY 8379',
    airport: 'Santiago Com',
    date: '2022-02-22',
    expectedTime: '15:55',
    originalTime: '15:55',
    url: '/en/departures/flight/D20190401VY8379/',
    score: 62.708916,
  },
];

const user = userEvent.setup({ delay: null });

describe('Flights', () => {
  it('renders an empty cards container', () => {
    render(<Flights criteria={null} flights={[]} />);

    expect(screen.getByText('Geen vluchten gevonden')).toBeInTheDocument();
  });

  it('renders a list of cards', () => {
    render(<Flights criteria={null} flights={flights} />);

    expect(screen.queryByText('Geen vluchten gevonden')).not.toBeInTheDocument();
    expect(screen.getByTestId('numberOfFoundFlights')).toHaveTextContent(`Aantal gevonden vluchten: ${flights.length}`);
    expect(screen.getByRole('button')).toHaveTextContent('Sorteer ↑');
  });

  it('sorts cards asc and desc', async () => {
    render(<Flights criteria={null} flights={flights} />);

    const cards = screen.getAllByRole('listitem');

    expect(cards[0]).toContainHTML(flights[2].airport);
    expect(cards[2]).toContainHTML(flights[1].airport);

    await user.click(screen.getByRole('button'));

    const sortedCards = screen.getAllByRole('listitem');

    expect(sortedCards[0]).toContainHTML(flights[1].airport);
    expect(sortedCards[2]).toContainHTML(flights[2].airport);
  });

  it('shows reason for not finding flights', () => {
    const { rerender } = render(<Flights criteria={{ flightDate: 'Fri, 31 Mar 2023 00:00:00 GMT' }} flights={[]} />);

    expect(screen.getByText('Geen vluchten gevonden met datum 31 maart 2023')).toBeInTheDocument();

    rerender(<Flights criteria={{ searchString: 'KL 666' }} flights={[]} />);

    expect(screen.getByText('Geen vluchten gevonden met vlucht/bestemming KL 666')).toBeInTheDocument();

    rerender(<Flights criteria={{ flightDate: 'Fri, 31 Mar 2023 00:00:00 GMT', searchString: 'KL 666' }} flights={[]} />);

    expect(screen.getByText('Geen vluchten gevonden met datum 31 maart 2023 en vlucht/bestemming KL 666')).toBeInTheDocument();
  });
});
