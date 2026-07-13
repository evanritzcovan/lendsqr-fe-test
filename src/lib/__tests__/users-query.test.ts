import { describe, expect, it } from 'vitest';
import type { UserDetail } from '@/types/user';
import {
  filterUsers,
  getUserById,
  getUsersSummary,
  queryUsers,
} from '@/lib/users-query';

const mockUsers: UserDetail[] = [
  {
    id: '1',
    organization: 'Lendsqr',
    username: 'Adedeji',
    email: 'adedeji@lendsqr.com',
    phoneNumber: '08078903721',
    dateJoined: '2020-05-15T10:00:00.000Z',
    status: 'Active',
    userId: 'LSQF001',
    fullName: 'Adedeji Hassan',
    tier: 2,
    accountBalance: '₦200,000.00',
    accountBank: '9912345678/Providus Bank',
    bvn: '12345678901',
    gender: 'Male',
    maritalStatus: 'Single',
    children: 'None',
    typeOfResidence: "Parent's Apartment",
    levelOfEducation: 'B.Sc',
    employmentStatus: 'Employed',
    sectorOfEmployment: 'FinTech',
    durationOfEmployment: '2 years',
    officeEmail: 'adedeji@lendsqr.com',
    monthlyIncome: '₦200,000.00 - ₦400,000.00',
    loanRepayment: '40,000',
    hasLoan: true,
    hasSavings: false,
    socials: {
      twitter: '@adedeji',
      facebook: 'Adedeji Hassan',
      instagram: '@adedeji',
    },
    guarantors: [
      {
        fullName: 'Debby Ogana',
        phoneNumber: '08012345678',
        emailAddress: 'debby@example.com',
        relationship: 'Sister',
      },
      {
        fullName: 'John Doe',
        phoneNumber: '08087654321',
        emailAddress: 'john@example.com',
        relationship: 'Friend',
      },
    ],
  },
  {
    id: '2',
    organization: 'Irorun',
    username: 'grace',
    email: 'grace@gmail.com',
    phoneNumber: '07060780922',
    dateJoined: '2021-03-10T08:30:00.000Z',
    status: 'Pending',
    userId: 'LSQF002',
    fullName: 'Grace Effiom',
    tier: 1,
    accountBalance: '₦150,000.00',
    accountBank: '1234567890/Access Bank',
    bvn: '10987654321',
    gender: 'Female',
    maritalStatus: 'Single',
    children: 'None',
    typeOfResidence: 'Rented Apartment',
    levelOfEducation: 'M.Sc',
    employmentStatus: 'Employed',
    sectorOfEmployment: 'Banking',
    durationOfEmployment: '4 years',
    officeEmail: 'grace@irorun.com',
    monthlyIncome: '₦300,000.00 - ₦500,000.00',
    loanRepayment: '55,000',
    hasLoan: false,
    hasSavings: true,
    socials: {
      twitter: '@grace_effiom',
      facebook: 'Grace Effiom',
      instagram: '@grace_effiom',
    },
    guarantors: [
      {
        fullName: 'Debby Ogana',
        phoneNumber: '08099887766',
        emailAddress: 'debby.ogana@example.com',
        relationship: 'Sister',
      },
      {
        fullName: 'Mary Jane',
        phoneNumber: '08011223344',
        emailAddress: 'mary@example.com',
        relationship: 'Colleague',
      },
    ],
  },
  {
    id: '3',
    organization: 'Lendstar',
    username: 'tomiwa',
    email: 'tomiwa@lendstar.com',
    phoneNumber: '08123456789',
    dateJoined: '2019-11-20T14:15:00.000Z',
    status: 'Blacklisted',
    userId: 'LSQF003',
    fullName: 'Tomiwa Ade',
    tier: 3,
    accountBalance: '₦80,000.00',
    accountBank: '5555666677/GTBank',
    bvn: '55667788990',
    gender: 'Male',
    maritalStatus: 'Married',
    children: '2',
    typeOfResidence: 'Own Apartment',
    levelOfEducation: 'HND',
    employmentStatus: 'Self-employed',
    sectorOfEmployment: 'Retail',
    durationOfEmployment: '6 years',
    officeEmail: 'tomiwa@lendstar.com',
    monthlyIncome: '₦100,000.00 - ₦250,000.00',
    loanRepayment: '20,000',
    hasLoan: true,
    hasSavings: true,
    socials: {
      twitter: '@tomiwa',
      facebook: 'Tomiwa Ade',
      instagram: '@tomiwa_ade',
    },
    guarantors: [
      {
        fullName: 'Samuel Ok',
        phoneNumber: '08055443322',
        emailAddress: 'sam@example.com',
        relationship: 'Brother',
      },
      {
        fullName: 'Jane Smith',
        phoneNumber: '08066778899',
        emailAddress: 'jane@example.com',
        relationship: 'Friend',
      },
    ],
  },
];

describe('users-query', () => {
  it('returns a paginated slice of users', () => {
    const result = queryUsers(mockUsers, { page: 1, limit: 2 });

    expect(result.data).toHaveLength(2);
    expect(result.total).toBe(3);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(2);
    expect(result.totalPages).toBe(2);
  });

  it('clamps page to the last available page', () => {
    const result = queryUsers(mockUsers, { page: 99, limit: 2 });

    expect(result.page).toBe(2);
    expect(result.data).toHaveLength(1);
  });

  it('filters users by search term', () => {
    const result = queryUsers(mockUsers, { search: 'grace' });

    expect(result.total).toBe(1);
    expect(result.data[0]?.username).toBe('grace');
  });

  it('filters users by status', () => {
    const result = queryUsers(mockUsers, { status: 'Active,Pending' });

    expect(result.total).toBe(2);
    expect(result.data.map((user) => user.status).sort()).toEqual([
      'Active',
      'Pending',
    ]);
  });

  it('returns an empty result when filters match nothing', () => {
    const result = queryUsers(mockUsers, { organization: 'Missing Org' });

    expect(result.total).toBe(0);
    expect(result.data).toEqual([]);
    expect(result.totalPages).toBe(1);
  });

  it('caps limit at 100', () => {
    const largeSet = Array.from({ length: 150 }, (_, index) => ({
      ...mockUsers[0],
      id: String(index + 1),
    }));

    const result = queryUsers(largeSet, { limit: 500 });

    expect(result.limit).toBe(100);
    expect(result.data).toHaveLength(100);
  });

  it('computes summary stats', () => {
    expect(getUsersSummary(mockUsers)).toEqual({
      totalUsers: 3,
      activeUsers: 1,
      usersWithLoans: 2,
      usersWithSavings: 2,
    });
  });

  it('finds a user by id', () => {
    expect(getUserById(mockUsers, '2')?.fullName).toBe('Grace Effiom');
    expect(getUserById(mockUsers, '999')).toBeUndefined();
  });

  it('filters by date range', () => {
    const result = filterUsers(mockUsers, {
      dateFrom: '2020-01-01',
      dateTo: '2020-12-31',
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.username).toBe('Adedeji');
  });
});
