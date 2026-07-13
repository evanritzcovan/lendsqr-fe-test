import { describe, expect, it } from 'vitest';
import {
  AUTH_SESSION_KEY,
  DEFAULT_PAGE_SIZE,
  TEST_CREDENTIALS,
} from '@/lib/constants';

describe('constants', () => {
  it('exposes test credentials for dummy auth', () => {
    expect(TEST_CREDENTIALS.email).toBe('test@example.com');
    expect(TEST_CREDENTIALS.password).toBeTruthy();
  });

  it('uses expected storage keys', () => {
    expect(AUTH_SESSION_KEY).toBe('lendsqr_auth_session');
  });

  it('defaults pagination to the Figma page size', () => {
    expect(DEFAULT_PAGE_SIZE).toBe(100);
  });
});
