import { render, screen } from '@testing-library/react';
import { RemainingSpendCard } from './RemainingSpendCard';
import { Card } from '@/app/types/card';

describe('RemainingSpendCard', () => {
  const mockCard: Card = {
    id: 1,
    companyId: 101,
    number: '1234',
    status: 'active',
    limit: 5000,
    used: 1500,
  };

  it('renders the title and used/limit correctly', () => {
    render(<RemainingSpendCard card={mockCard} />);

    expect(screen.getByText(/remaining spend/i)).toBeInTheDocument();
    expect(
      screen.getByText(text => text.includes('3') && text.includes('8') && text.includes('kr'))
    ).toBeInTheDocument();

    expect(screen.getByText(/based on your set limit/i)).toBeInTheDocument();
  });

  it('renders the forward icon button', () => {
    render(<RemainingSpendCard card={mockCard} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('ArrowForwardIosIcon')).toBeInTheDocument();
  });
});
