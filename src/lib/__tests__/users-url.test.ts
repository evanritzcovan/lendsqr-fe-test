import { describe, expect, it } from 'vitest';
import {
  buildUsersUrl,
  filtersToQueryParams,
  mergeUsersParams,
  serializeUsersParams,
} from '@/lib/users-url';

describe('users-url', () => {
  it('serializes query params', () => {
    expect(
      serializeUsersParams({
        page: 2,
        limit: 25,
        search: 'lendsqr',
        status: 'Active',
      }),
    ).toBe('page=2&limit=25&search=lendsqr&status=Active');
  });

  it('builds a users url', () => {
    expect(buildUsersUrl({ search: 'grace' })).toBe('/users?search=grace');
  });

  it('resets page when filters change', () => {
    expect(
      mergeUsersParams({ page: 3, limit: 50 }, { search: 'test' }),
    ).toEqual({
      page: 1,
      limit: 50,
      search: 'test',
    });
  });

  it('maps filter form values to query params', () => {
    expect(
      filtersToQueryParams({
        organization: 'Lendsqr',
        username: '',
        email: '',
        date: '2020-05-15',
        phoneNumber: '',
        status: 'Active',
      }),
    ).toEqual({
      organization: 'Lendsqr',
      username: undefined,
      email: undefined,
      phoneNumber: undefined,
      status: 'Active',
      dateFrom: '2020-05-15',
      dateTo: '2020-05-15',
    });
  });
});
