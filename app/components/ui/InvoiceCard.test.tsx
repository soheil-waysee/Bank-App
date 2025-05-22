import { render, screen } from '@testing-library/react';
import { InvoiceCard } from './InvoiceCard';
import { Card } from '@/app/types/card';

describe('InvoiceCard', () => {
  const mockCard: Card = {
    id: 1,
    companyId: 101,
    number: '1234',
    status: 'active',
    limit: 5000,
    used: 1500,
  };

  it('renders invoice heading and masked card number', () => {
    render(<InvoiceCard card={mockCard} />);

    expect(screen.getByText(/invoice due/i)).toBeInTheDocument();

  });

  it('renders the bank card image', () => {
    render(<InvoiceCard card={mockCard} />);

    const image = screen.getByAltText(/bank card/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/card.jpg');
  });

  it('renders the navigation icon button', () => {
    render(<InvoiceCard card={mockCard} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    const icon = screen.getByTestId('ArrowForwardIosIcon');
    expect(icon).toBeInTheDocument();
  });
});
