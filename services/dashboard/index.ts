import { fetcher } from '@/lib/fetcher';
import { DashboardData } from '@/types';

export async function fetchDashboardData(companyId?: string): Promise<DashboardData> {
  return fetcher('/dashboard', { query: companyId ? { companyId } : undefined });
}
