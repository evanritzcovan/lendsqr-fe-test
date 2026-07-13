import {
  STATUS_OVERRIDES_STORAGE_KEY,
  USER_DETAILS_STORAGE_KEY,
} from '@/lib/constants';
import type { User, UserDetail, UserStatus } from '@/types/user';

type StatusOverrides = Record<string, UserStatus>;
type UserDetailsCache = Record<string, UserDetail>;

function readOverrides(): StatusOverrides {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = localStorage.getItem(STATUS_OVERRIDES_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StatusOverrides) : {};
  } catch {
    return {};
  }
}

function writeOverrides(overrides: StatusOverrides) {
  localStorage.setItem(STATUS_OVERRIDES_STORAGE_KEY, JSON.stringify(overrides));
}

function readUserDetailsCache(): UserDetailsCache {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = localStorage.getItem(USER_DETAILS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UserDetailsCache) : {};
  } catch {
    return {};
  }
}

function writeUserDetailsCache(cache: UserDetailsCache) {
  localStorage.setItem(USER_DETAILS_STORAGE_KEY, JSON.stringify(cache));
}

export function getStatusOverrides(): StatusOverrides {
  return readOverrides();
}

export function getCachedUserDetail(id: string): UserDetail | null {
  return readUserDetailsCache()[id] ?? null;
}

export function saveUserDetail(user: UserDetail) {
  const cache = readUserDetailsCache();
  cache[user.id] = user;
  writeUserDetailsCache(cache);
}

export function setUserStatusOverride(id: string, status: UserStatus) {
  const overrides = readOverrides();
  overrides[id] = status;
  writeOverrides(overrides);

  const cached = getCachedUserDetail(id);
  if (cached) {
    saveUserDetail({ ...cached, status });
  }
}

export function mergeUserStatus<T extends User>(user: T): T {
  const override = getStatusOverrides()[user.id];
  return override ? { ...user, status: override } : user;
}

export function mergeUsersStatus<T extends User>(users: T[]): T[] {
  const overrides = getStatusOverrides();
  return users.map((user) =>
    overrides[user.id] ? { ...user, status: overrides[user.id] } : user,
  );
}
