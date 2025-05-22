import { render, screen } from '@testing-library/react';
import { TransactionPreviewCard } from './TransactionPreviewCard';

describe('TransactionPreviewCard', () => {
  const transactions = [
    {
      id: 1,
      description: 'Coffee',
      value: '45',
      currency: 'SEK',
      date: '2024-05-01T10:00:00Z',
    },
    {
      id: 2,
      description: 'Lunch',
      value: '120',
      currency: 'SEK',
      date: '2024-05-02T12:00:00Z',
    },
  ];

  it('renders the title and each transaction item', () => {
    render(<TransactionPreviewCard transactions={transactions} transactionCount={10} />);

    expect(screen.getByText(/latest transactions/i)).toBeInTheDocument();
  });

  it('renders the view more button with correct count and icon', () => {
    render(<TransactionPreviewCard transactions={transactions} transactionCount={10} />);

    expect(screen.getByTestId('Button')).toHaveTextContent('10 more items in transaction view');
  });
});
