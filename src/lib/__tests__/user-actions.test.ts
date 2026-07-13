import { describe, expect, it } from 'vitest';
import {
  getStatusForAction,
  getUserActionLabel,
  getUserRowActions,
} from '@/lib/user-actions';

describe('user-actions', () => {
  it('shows deactivate and blacklist for active users', () => {
    expect(getUserRowActions('Active')).toEqual({
      statusAction: 'deactivate',
      listAction: 'blacklist',
    });
  });

  it('shows activate and blacklist for inactive users', () => {
    expect(getUserRowActions('Inactive')).toEqual({
      statusAction: 'activate',
      listAction: 'blacklist',
    });
  });

  it('shows activate and blacklist for pending users', () => {
    expect(getUserRowActions('Pending')).toEqual({
      statusAction: 'activate',
      listAction: 'blacklist',
    });
  });

  it('shows activate and unblacklist for blacklisted users', () => {
    expect(getUserRowActions('Blacklisted')).toEqual({
      statusAction: 'activate',
      listAction: 'unblacklist',
    });
  });

  it('maps actions to the correct statuses', () => {
    expect(getStatusForAction('activate')).toBe('Active');
    expect(getStatusForAction('deactivate')).toBe('Inactive');
    expect(getStatusForAction('blacklist')).toBe('Blacklisted');
    expect(getStatusForAction('unblacklist')).toBe('Inactive');
  });

  it('returns readable action labels', () => {
    expect(getUserActionLabel('deactivate')).toBe('Deactivate User');
    expect(getUserActionLabel('unblacklist')).toBe('Unblacklist User');
  });
});
