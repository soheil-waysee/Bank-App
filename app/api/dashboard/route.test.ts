import { GET } from './route';
import { NextRequest } from 'next/server';
import { User, Card, Invoice, Transaction } from '@/db/models';

jest.mock('@/db/models', () => ({
  User: {
    findByPk: jest.fn(),
  },
  Company: jest.fn(),
  Card: {
    findOne: jest.fn(),
  },
  Invoice: {
    findAll: jest.fn(),
  },
  Transaction: {
    findAll: jest.fn(),
    count: jest.fn(),
  },
}));

function createMockRequest(url: string): NextRequest {
  return {
    url,
  } as unknown as NextRequest;
}

describe('GET /api/dashboard', () => {
  const mockCompany = { id: 101, name: 'Test Company' };
  const mockUser = {
    id: 1,
    companies: [mockCompany],
  };
  const mockCard = { id: 201, companyId: 101 };
  const mockInvoices = [{ id: 1 }, { id: 2 }];
  const mockTransactions = [{ id: 11 }, { id: 12 }];
  const mockTransactionCount = 10;

  beforeEach(() => {
    jest.clearAllMocks();

    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);
    (Card.findOne as jest.Mock).mockResolvedValue(mockCard);
    (Invoice.findAll as jest.Mock).mockResolvedValue(mockInvoices);
    (Transaction.findAll as jest.Mock).mockResolvedValue(mockTransactions);
    (Transaction.count as jest.Mock).mockResolvedValue(mockTransactionCount);
  });

  it('should return dashboard data when everything exists', async () => {
    const req = createMockRequest('http://localhost/api/dashboard?companyId=101');
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.companies).toEqual([mockCompany]);
    expect(body.card).toEqual(mockCard);
    expect(body.invoices).toEqual(mockInvoices);
    expect(body.transactions).toEqual(mockTransactions);
    expect(body.transactionCount).toBe(mockTransactionCount);
  });

  it('should return 404 if user has no companies', async () => {
    (User.findByPk as jest.Mock).mockResolvedValueOnce({ companies: [] });

    const req = createMockRequest('http://localhost/api/dashboard');
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(404);
    expect(body.error).toBe('No companies found for user');
  });

  it('should return 404 if card not found', async () => {
    (Card.findOne as jest.Mock).mockResolvedValueOnce(null);

    const req = createMockRequest('http://localhost/api/dashboard');
    const res = await GET(req);
    const body = await res.json();

    expect(res.status).toBe(404);
    expect(body.error).toBe('Card not found for company');
  });
});
