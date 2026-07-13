import type {
  PaginatedUsersResponse,
  User,
  UserDetail,
  UsersSummary,
  UserStatus,
} from '@/types/user';
import {
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  USER_STATUSES,
} from '@/lib/constants';

export interface UsersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  organization?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  dateFrom?: string;
  dateTo?: string;
  sort?: string;
}

function toListUser(user: UserDetail): User {
  const { id, organization, username, email, phoneNumber, dateJoined, status } = user;
  return { id, organization, username, email, phoneNumber, dateJoined, status };
}

function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizeText(value: string | undefined): string {
  return value?.trim().toLowerCase() ?? '';
}

function matchesSearch(user: UserDetail, search: string): boolean {
  const query = normalizeText(search);
  if (!query) {
    return true;
  }

  const haystack = [
    user.organization,
    user.username,
    user.email,
    user.phoneNumber,
    user.fullName,
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(query);
}

function matchesPartial(value: string, filter: string | undefined): boolean {
  const query = normalizeText(filter);
  if (!query) {
    return true;
  }

  return value.toLowerCase().includes(query);
}

function matchesStatus(
  user: Pick<User, 'status'>,
  statusFilter: string | undefined,
): boolean {
  if (!statusFilter?.trim()) {
    return true;
  }

  const statuses = statusFilter
    .split(',')
    .map((status) => status.trim())
    .filter((status): status is UserStatus =>
      USER_STATUSES.includes(status as UserStatus),
    );

  if (statuses.length === 0) {
    return true;
  }

  return statuses.includes(user.status);
}

function matchesDateRange(
  user: UserDetail,
  dateFrom?: string,
  dateTo?: string,
): boolean {
  if (!dateFrom && !dateTo) {
    return true;
  }

  const joined = new Date(user.dateJoined).getTime();
  const from = dateFrom ? new Date(dateFrom).setHours(0, 0, 0, 0) : null;
  const to = dateTo ? new Date(dateTo).setHours(23, 59, 59, 999) : null;

  if (from !== null && joined < from) {
    return false;
  }

  if (to !== null && joined > to) {
    return false;
  }

  return true;
}

function compareUsers(a: UserDetail, b: UserDetail, sort?: string): number {
  const [field, direction = 'asc'] = (sort ?? 'dateJoined:desc').split(':');
  const multiplier = direction === 'desc' ? -1 : 1;

  switch (field) {
    case 'organization':
      return a.organization.localeCompare(b.organization) * multiplier;
    case 'username':
      return a.username.localeCompare(b.username) * multiplier;
    case 'email':
      return a.email.localeCompare(b.email) * multiplier;
    case 'status':
      return a.status.localeCompare(b.status) * multiplier;
    case 'dateJoined':
    default:
      return (
        (new Date(a.dateJoined).getTime() - new Date(b.dateJoined).getTime()) *
        multiplier
      );
  }
}

export function filterUsers(
  users: UserDetail[],
  params: UsersQueryParams,
): UserDetail[] {
  return users
    .filter((user) => matchesSearch(user, params.search ?? ''))
    .filter((user) => matchesStatus(user, params.status))
    .filter((user) => matchesPartial(user.organization, params.organization))
    .filter((user) => matchesPartial(user.username, params.username))
    .filter((user) => matchesPartial(user.email, params.email))
    .filter((user) => matchesPartial(user.phoneNumber, params.phoneNumber))
    .filter((user) =>
      matchesDateRange(user, params.dateFrom, params.dateTo),
    )
    .sort((a, b) => compareUsers(a, b, params.sort));
}

function resolvePage(params: UsersQueryParams): number {
  return parsePositiveInt(
    params.page !== undefined ? String(params.page) : undefined,
    1,
  );
}

function resolveLimit(
  params: UsersQueryParams,
  maxLimit = MAX_PAGE_SIZE,
): number {
  return Math.min(
    parsePositiveInt(
      params.limit !== undefined ? String(params.limit) : undefined,
      DEFAULT_PAGE_SIZE,
    ),
    maxLimit,
  );
}

export function filterUsersByStatus<T extends Pick<User, 'status'>>(
  users: T[],
  status?: string,
): T[] {
  if (!status?.trim()) {
    return users;
  }

  return users.filter((user) => matchesStatus(user, status));
}

export function paginateUserList(
  users: User[],
  params: Pick<UsersQueryParams, 'page' | 'limit'>,
): PaginatedUsersResponse {
  const page = resolvePage(params);
  const limit = resolveLimit(params);
  const total = users.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * limit;
  const data = users.slice(start, start + limit);

  return {
    data,
    total,
    page: safePage,
    limit,
    totalPages,
  };
}

export function queryUsersByEffectiveStatus(
  users: User[],
  params: UsersQueryParams,
): PaginatedUsersResponse {
  const filtered = filterUsersByStatus(users, params.status);
  return paginateUserList(filtered, params);
}

export function queryUsers(
  users: UserDetail[],
  params: UsersQueryParams,
  options?: { maxLimit?: number },
): PaginatedUsersResponse {
  const page = resolvePage(params);
  const limit = resolveLimit(params, options?.maxLimit ?? MAX_PAGE_SIZE);
  const filtered = filterUsers(users, params);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * limit;
  const data = filtered.slice(start, start + limit).map(toListUser);

  return {
    data,
    total,
    page: safePage,
    limit,
    totalPages,
  };
}

export function usesClientStatusFilter(params: UsersQueryParams): boolean {
  return Boolean(params.status?.trim());
}

export function getUsersSummary(users: UserDetail[]): UsersSummary {
  return {
    totalUsers: users.length,
    activeUsers: users.filter((user) => user.status === 'Active').length,
    usersWithLoans: users.filter((user) => user.hasLoan).length,
    usersWithSavings: users.filter((user) => user.hasSavings).length,
  };
}

export function getUserById(
  users: UserDetail[],
  id: string,
): UserDetail | undefined {
  return users.find((user) => user.id === id);
}

export function parseUsersQueryParams(
  searchParams: URLSearchParams,
): UsersQueryParams {
  return {
    page: parsePositiveInt(searchParams.get('page') ?? undefined, 1),
    limit: parsePositiveInt(searchParams.get('limit') ?? undefined, DEFAULT_PAGE_SIZE),
    search: searchParams.get('search') ?? undefined,
    status: searchParams.get('status') ?? undefined,
    organization: searchParams.get('organization') ?? undefined,
    username: searchParams.get('username') ?? undefined,
    email: searchParams.get('email') ?? undefined,
    phoneNumber: searchParams.get('phoneNumber') ?? undefined,
    dateFrom: searchParams.get('dateFrom') ?? undefined,
    dateTo: searchParams.get('dateTo') ?? undefined,
    sort: searchParams.get('sort') ?? undefined,
  };
}
