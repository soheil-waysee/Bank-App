type Company = {
  id: number;
  name: string;
  orgNumber: string;
  createdAt: string;
  updatedAt: string;
};

type Card = {
  id: number;
  companyId: number;
  number: string;
  status: string;
  limit: number;
  used: number;
  createdAt: string;
  updatedAt: string;
};

type Invoice = {
  id: number;
  dueDate: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type Transaction = {
  id: number;
  description: string;
  value: number;
  currency: string;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type DashboardData = {
  companies: Company[];
  card: Card;
  invoices: Invoice[];
  transactions: Transaction[];
  transactionCount: number;
};
