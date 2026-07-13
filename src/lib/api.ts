import type {
  PaginatedUsersResponse,
  UserDetail,
  UsersSummary,
} from '@/types/user';
import type { UsersQueryParams } from '@/lib/users-query';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function buildQueryString(params: UsersQueryParams = {}): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = 'Request failed';

    try {
      const body = (await response.json()) as { message?: string };
      message = body.message ?? message;
    } catch {
      message = response.statusText || message;
    }

    throw new ApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}

function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return '';
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getBaseUrl()}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    cache: 'no-store',
  });

  return parseJson<T>(response);
}

export async function fetchUsers(
  params: UsersQueryParams = {},
): Promise<PaginatedUsersResponse> {
  return apiFetch<PaginatedUsersResponse>(
    `/api/users${buildQueryString(params)}`,
  );
}

export async function fetchUsersSummary(): Promise<UsersSummary> {
  return apiFetch<UsersSummary>('/api/users/summary');
}

export async function fetchUserById(id: string): Promise<UserDetail> {
  return apiFetch<UserDetail>(`/api/users/${id}`);
}
