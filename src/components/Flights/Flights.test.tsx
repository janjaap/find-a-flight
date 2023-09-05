import { render, screen } from '@testing-library/react';
import { Flights } from './Flights';

describe('Flights', () => {
  it('renders an empty cards container', () => {
    render(<Flights criteria={null} flights={[]} />)

    expect(screen.getByText('Geen vluchten gevonden')).toBeInTheDocument();
  });

  it('renders a list of cards', () => {

  })
});
