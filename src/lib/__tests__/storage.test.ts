import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  USER_DETAILS_STORAGE_KEY,
  STATUS_OVERRIDES_STORAGE_KEY,
} from '@/lib/constants';
import {
  applySummaryOverrides,
  getCachedUserDetail,
  mergeUserStatus,
  saveUserDetail,
  setUserStatusOverride,
} from '@/lib/storage';
import type { UserDetail } from '@/types/user';

const mockUser: UserDetail = {
  id: '1',
  organization: 'Lendsqr',
  username: 'grace',
  email: 'grace@lendsqr.com',
  phoneNumber: '08012345678',
  dateJoined: '2020-05-15T10:00:00.000Z',
  status: 'Active',
  userId: 'LSQF123',
  fullName: 'Grace Hopper',
  tier: 2,
  accountBalance: '₦200,000.00',
  accountBank: '9912345678/Providus Bank',
  bvn: '12345678901',
  gender: 'Female',
  maritalStatus: 'Single',
  children: 'None',
  typeOfResidence: 'Own Apartment',
  levelOfEducation: 'B.Sc',
  employmentStatus: 'Employed',
  sectorOfEmployment: 'FinTech',
  durationOfEmployment: '3 years',
  officeEmail: 'grace@lendsqr.com',
  monthlyIncome: '₦200,000.00',
  loanRepayment: '40,000',
  hasLoan: true,
  hasSavings: true,
  socials: {
    twitter: '@grace',
    facebook: 'Grace Hopper',
    instagram: '@grace',
  },
  guarantors: [
    {
      fullName: 'Ada Lovelace',
      phoneNumber: '08098765432',
      emailAddress: 'ada@example.com',
      relationship: 'Friend',
    },
    {
      fullName: 'Alan Turing',
      phoneNumber: '08011112222',
      emailAddress: 'alan@example.com',
      relationship: 'Colleague',
    },
  ],
};

describe('storage', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      store: {} as Record<string, string>,
      getItem(key: string) {
        return this.store[key] ?? null;
      },
      setItem(key: string, value: string) {
        this.store[key] = value;
      },
    });
  });

  it('saves and retrieves cached user details', () => {
    saveUserDetail(mockUser);
    expect(getCachedUserDetail('1')).toEqual(mockUser);
  });

  it('merges status overrides onto cached users', () => {
    saveUserDetail(mockUser);
    setUserStatusOverride('1', 'Blacklisted', 'Active');

    expect(mergeUserStatus(mockUser).status).toBe('Blacklisted');
    expect(getCachedUserDetail('1')?.status).toBe('Blacklisted');
    expect(localStorage.getItem(STATUS_OVERRIDES_STORAGE_KEY)).toBeTruthy();
    expect(localStorage.getItem(USER_DETAILS_STORAGE_KEY)).toBeTruthy();
  });

  it('adjusts active user summary counts from overrides', () => {
    setUserStatusOverride('1', 'Inactive', 'Active');
    setUserStatusOverride('2', 'Active', 'Inactive');

    const adjusted = applySummaryOverrides({
      totalUsers: 500,
      activeUsers: 200,
      usersWithLoans: 100,
      usersWithSavings: 150,
    });

    expect(adjusted.activeUsers).toBe(200);
  });
});
