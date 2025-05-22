import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('renders the logo with link', () => {
    render(<Header />);

    const logo = screen.getByAltText('Company Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.jpg');

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders the menu icon button', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
    expect(screen.getByTestId('MenuIcon')).toBeInTheDocument();
  });
});
