import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { FindAFlight } from "./FindAFlight";
import { FlightsProvider } from "@/providers/FlightsProvider";

const user = userEvent.setup();

const mockFetchFlights = jest.fn();

jest.mock('@/hooks/useFetchFlights/useFetchFlights', () => ({
  __esModule: true,
  useFetchFlights: () => mockFetchFlights,
}));

describe('FindAFlight', () => {
  it('renders a form', () => {
    render(<FlightsProvider><FindAFlight /></FlightsProvider>);

    expect(screen.getByRole('radio', { name: 'Vertrek' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Vertrek' })).toBeDisabled();
    expect(screen.getByRole('radio', { name: 'Vertrek' })).toBeChecked();

    expect(screen.getByRole('radio', { name: 'Aankomst' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Aankomst' })).toBeDisabled();

    expect(screen.getByRole('textbox', { name: 'Datum' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Datum' })).toBeEnabled();

    expect(screen.getByRole('textbox', { name: 'Vluchtnummer of bestemming' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Vluchtnummer of bestemming' })).toBeEnabled();

    expect(screen.getByRole('button', { name: 'Zoeken' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Zoeken' })).toBeEnabled();
  });

  it('shows error message for invalid date format', async () => {
    render(<FlightsProvider><FindAFlight /></FlightsProvider>);

    await user.type(screen.getByRole('textbox', { name: 'Datum' }), '11-01-202X');

    expect(screen.queryByText('Voer een datum in volgens het format DD-MM-YYYY')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Zoeken' }));

    expect(screen.getByText('Voer een datum in volgens het format DD-MM-YYYY')).toBeInTheDocument();

    await user.type(screen.getByRole('textbox', { name: 'Datum' }), '{backspace}3', { initialSelectionEnd: 10 });

    expect(screen.queryByText('Voer een datum in volgens het format DD-MM-YYYY')).not.toBeInTheDocument();
  });

  it('shows error message for invalid date', async () => {
    render(<FlightsProvider><FindAFlight /></FlightsProvider>);

    await user.type(screen.getByRole('textbox', { name: 'Datum' }), '31-02-2023');

    expect(screen.queryByText('Voer een geldige datum in')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Zoeken' }));

    expect(screen.getByText('Voer een geldige datum in')).toBeInTheDocument();

    await user.type(screen.getByRole('textbox', { name: 'Datum' }), '28-02-2023');

    expect(screen.queryByText('Voer een geldige datum in')).not.toBeInTheDocument();
  });

  it('initiates fetch request on form submit', async () => {
    render(<FlightsProvider><FindAFlight /></FlightsProvider>);

    await user.type(screen.getByRole('textbox', { name: 'Datum' }), '28-02-2023');

    await user.type(screen.getByRole('textbox', { name: 'Vluchtnummer of bestemming' }), 'KL 1001');

    expect(mockFetchFlights).not.toHaveBeenCalled();

    user.click(screen.getByRole('button', { name: 'Zoeken' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Zoeken' })).toBeDisabled();
    });

    expect(mockFetchFlights).toHaveBeenCalledWith({
      direction: 'departures',
      flightDate: expect.stringContaining('28 Feb 2023'),
      searchString: 'KL 1001',
    });


    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Zoeken' })).toBeEnabled();
    });
  });
});
