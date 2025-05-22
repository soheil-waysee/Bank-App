import { fetcher } from '@/lib/fetcher';

export async function fetchDashboardData(companyId?: string) {
  return fetcher('/dashboard', { query: companyId ? { companyId } : undefined });
}
