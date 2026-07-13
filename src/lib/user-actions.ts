import type { UserStatus } from '@/types/user';

export type UserStatusAction = 'activate' | 'deactivate';
export type UserListAction = 'blacklist' | 'unblacklist';

export interface UserRowActions {
  statusAction: UserStatusAction;
  listAction: UserListAction;
}

export function getUserRowActions(status: UserStatus): UserRowActions {
  return {
    statusAction: status === 'Active' ? 'deactivate' : 'activate',
    listAction: status === 'Blacklisted' ? 'unblacklist' : 'blacklist',
  };
}

export function getStatusForAction(action: UserStatusAction | UserListAction): UserStatus {
  switch (action) {
    case 'activate':
      return 'Active';
    case 'deactivate':
      return 'Inactive';
    case 'blacklist':
      return 'Blacklisted';
    case 'unblacklist':
      return 'Inactive';
  }
}

export function getUserActionLabel(
  action: UserStatusAction | UserListAction,
): string {
  switch (action) {
    case 'activate':
      return 'Activate User';
    case 'deactivate':
      return 'Deactivate User';
    case 'blacklist':
      return 'Blacklist User';
    case 'unblacklist':
      return 'Unblacklist User';
  }
}
