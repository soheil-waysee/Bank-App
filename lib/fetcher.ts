import { env } from '@/config/env';

type FetchOptions = RequestInit & {
  query?: Record<string, string | number | boolean>;
};

export async function fetcher<T extends object>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const baseUrl = `${env.NEXT_PUBLIC_BASE_URL}/api`;

  const url = new URL(`${baseUrl}${endpoint}`);
  if (options.query) {
    Object.entries(options.query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const res = await fetch(url.toString(), {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Fetch error: ${res.status} - ${errText}`);
  }

  return res.json();
}
