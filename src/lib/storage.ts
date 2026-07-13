import {
  STATUS_OVERRIDES_STORAGE_KEY,
  USER_DETAILS_STORAGE_KEY,
} from '@/lib/constants';
import type { User, UserDetail, UserStatus, UsersSummary } from '@/types/user';

interface StatusOverrideEntry {
  status: UserStatus;
  originalStatus: UserStatus;
}

type StatusOverrides = Record<string, StatusOverrideEntry>;
type UserDetailsCache = Record<string, UserDetail>;

function parseOverrides(raw: string): StatusOverrides {
  const parsed = JSON.parse(raw) as Record<string, StatusOverrideEntry | UserStatus>;

  return Object.fromEntries(
    Object.entries(parsed).map(([id, value]) => {
      if (typeof value === 'string') {
        return [id, { status: value, originalStatus: value }];
      }

      return [id, value];
    }),
  );
}

export const STATUS_CHANGED_EVENT = 'lendsqr_status_changed';

function dispatchStatusChanged(message = 'User status updated') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(STATUS_CHANGED_EVENT, { detail: { message } }),
    );
  }
}

function readOverrides(): StatusOverrides {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = localStorage.getItem(STATUS_OVERRIDES_STORAGE_KEY);
    return raw ? parseOverrides(raw) : {};
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

export function setUserStatusOverride(
  id: string,
  status: UserStatus,
  currentStatus: UserStatus,
  message = 'User status updated',
) {
  const overrides = readOverrides();
  const existing = overrides[id];

  overrides[id] = {
    status,
    originalStatus: existing?.originalStatus ?? currentStatus,
  };
  writeOverrides(overrides);

  const cached = getCachedUserDetail(id);
  if (cached) {
    saveUserDetail({ ...cached, status });
  }

  dispatchStatusChanged(message);
}

export function applySummaryOverrides(summary: UsersSummary): UsersSummary {
  const overrides = readOverrides();
  let activeUsers = summary.activeUsers;

  Object.values(overrides).forEach((entry) => {
    const wasActive = entry.originalStatus === 'Active';
    const isActive = entry.status === 'Active';

    if (wasActive && !isActive) {
      activeUsers -= 1;
    } else if (!wasActive && isActive) {
      activeUsers += 1;
    }
  });

  return {
    ...summary,
    activeUsers: Math.max(0, activeUsers),
  };
}

export function mergeUserStatus<T extends User>(user: T): T {
  const override = getStatusOverrides()[user.id];
  return override ? { ...user, status: override.status } : user;
}

export function mergeUsersStatus<T extends User>(users: T[]): T[] {
  const overrides = getStatusOverrides();
  return users.map((user) =>
    overrides[user.id] ? { ...user, status: overrides[user.id].status } : user,
  );
}
