import { STATUS_OVERRIDES_STORAGE_KEY } from '@/lib/constants';
import type { User, UserStatus } from '@/types/user';

type StatusOverrides = Record<string, UserStatus>;

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

export function getStatusOverrides(): StatusOverrides {
  return readOverrides();
}

export function setUserStatusOverride(id: string, status: UserStatus) {
  const overrides = readOverrides();
  overrides[id] = status;
  writeOverrides(overrides);
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
