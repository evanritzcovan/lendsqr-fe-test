import type { UsersQueryParams } from '@/lib/users-query';

const FILTER_KEYS: (keyof UsersQueryParams)[] = [
  'search',
  'status',
  'organization',
  'username',
  'email',
  'phoneNumber',
  'dateFrom',
  'dateTo',
  'sort',
];

export function serializeUsersParams(params: UsersQueryParams): string {
  const searchParams = new URLSearchParams();

  if (params.page && params.page > 1) {
    searchParams.set('page', String(params.page));
  }

  if (params.limit) {
    searchParams.set('limit', String(params.limit));
  }

  FILTER_KEYS.forEach((key) => {
    const value = params[key];
    if (value !== undefined && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
}

export function buildUsersUrl(params: UsersQueryParams): string {
  const query = serializeUsersParams(params);
  return query ? `/users?${query}` : '/users';
}

export function mergeUsersParams(
  current: UsersQueryParams,
  updates: Partial<UsersQueryParams>,
  options: { resetPage?: boolean } = {},
): UsersQueryParams {
  const next: UsersQueryParams = {
    ...current,
    ...updates,
  };

  const shouldResetPage =
    options.resetPage ??
    Object.keys(updates).some(
      (key) => key !== 'page' && key !== 'limit',
    );

  if (shouldResetPage && !('page' in updates)) {
    next.page = 1;
  }

  return next;
}

export interface UsersFilterFormValues {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

export function filtersToQueryParams(
  filters: UsersFilterFormValues,
): Partial<UsersQueryParams> {
  const params: Partial<UsersQueryParams> = {
    organization: filters.organization || undefined,
    username: filters.username || undefined,
    email: filters.email || undefined,
    phoneNumber: filters.phoneNumber || undefined,
    status: filters.status || undefined,
    dateFrom: undefined,
    dateTo: undefined,
  };

  if (filters.date) {
    params.dateFrom = filters.date;
    params.dateTo = filters.date;
  }

  return params;
}

export function queryParamsToFilters(
  params: UsersQueryParams,
): UsersFilterFormValues {
  return {
    organization: params.organization ?? '',
    username: params.username ?? '',
    email: params.email ?? '',
    date: params.dateFrom ?? '',
    phoneNumber: params.phoneNumber ?? '',
    status: params.status ?? '',
  };
}
