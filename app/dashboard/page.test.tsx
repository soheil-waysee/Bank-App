import { render, screen, waitFor } from '@testing-library/react';
import DashboardContent from './page';
import { fetchDashboardData } from '@/services/dashboard';
import { Card } from '@/app/types/card';

type CompanySelectProps = {
  selectedId?: string;
  companies: Array<{ id: number; name: string }>;
  onChange: (id: string) => void;
};

jest.mock('@/app/components/forms/CompanySelect', () => ({
  CompanySelect: (props: CompanySelectProps) => (
    <div data-testid="CompanySelect">Mocked CompanySelect - {props.selectedId}</div>
  ),
}));

jest.mock('@/app/components/ui/InvoiceCard', () => ({
  InvoiceCard: ({ card }: { card: Card }) => (
    <div data-testid="InvoiceCard">Mocked InvoiceCard {card.number}</div>
  ),
}));

jest.mock('@/app/components/ui/RemainingSpendCard', () => ({
  RemainingSpendCard: () => <div data-testid="RemainingSpendCard">Mocked RemainingSpendCard</div>,
}));

jest.mock('@/app/components/ui/TransactionPreviewCard', () => ({
  TransactionPreviewCard: () => (
    <div data-testid="TransactionPreviewCard">Mocked TransactionPreviewCard</div>
  ),
}));

const mockDashboardData = {
  transactions: [
    { id: 1, description: 'Mock tx', value: '100', currency: 'SEK', date: '2024-05-01' },
  ],
  transactionCount: 5,
  card: {
    id: 1,
    companyId: 1,
    number: '1234',
    status: 'active',
    limit: 5000,
    used: 2000,
  },
  companies: [{ id: 1, name: 'Company A' }],
};

beforeEach(() => {
  (fetchDashboardData as jest.Mock).mockResolvedValue(mockDashboardData);
});

describe('DashboardContent', () => {
  it('renders dashboard content after fetch', async () => {
    render(<DashboardContent />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('CompanySelect')).toBeInTheDocument();
    });

    expect(screen.getByTestId('InvoiceCard')).toBeInTheDocument();
    expect(screen.getByTestId('RemainingSpendCard')).toBeInTheDocument();
    expect(screen.getByTestId('TransactionPreviewCard')).toBeInTheDocument();
  });
});
