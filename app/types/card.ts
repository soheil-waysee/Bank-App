export type Card = {
  id: number;
  companyId: number;
  number: string;
  status: 'active' | 'inactive';
  limit: number;
  used: number;
};
