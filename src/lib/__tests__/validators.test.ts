import { describe, expect, it } from 'vitest';
import { authenticateUser } from '@/lib/auth';
import { TEST_CREDENTIALS } from '@/lib/constants';
import {
  validateEmail,
  validateLoginForm,
  validatePassword,
} from '@/lib/validators';

describe('validators', () => {
  describe('validateEmail', () => {
    it('accepts a valid email address', () => {
      expect(validateEmail('test@example.com')).toBeUndefined();
    });

    it('rejects an empty email', () => {
      expect(validateEmail('')).toBe('Email is required');
    });

    it('rejects an invalid email format', () => {
      expect(validateEmail('not-an-email')).toBe('Enter a valid email address');
    });
  });

  describe('validatePassword', () => {
    it('accepts a valid password', () => {
      expect(validatePassword(TEST_CREDENTIALS.password)).toBeUndefined();
    });

    it('rejects an empty password', () => {
      expect(validatePassword('')).toBe('Password is required');
    });

    it('rejects a password that is too short', () => {
      expect(validatePassword('short')).toBe(
        'Password must be at least 8 characters',
      );
    });
  });

  describe('validateLoginForm', () => {
    it('returns no errors for valid input', () => {
      const result = validateLoginForm({
        email: TEST_CREDENTIALS.email,
        password: TEST_CREDENTIALS.password,
      });

      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('returns field errors for invalid input', () => {
      const result = validateLoginForm({
        email: 'bad-email',
        password: '123',
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeTruthy();
      expect(result.errors.password).toBeTruthy();
    });
  });
});

describe('authenticateUser', () => {
  it('returns true for valid credentials', () => {
    expect(
      authenticateUser(TEST_CREDENTIALS.email, TEST_CREDENTIALS.password),
    ).toBe(true);
  });

  it('returns false for an invalid email', () => {
    expect(authenticateUser('wrong@example.com', TEST_CREDENTIALS.password)).toBe(
      false,
    );
  });

  it('returns false for an invalid password', () => {
    expect(authenticateUser(TEST_CREDENTIALS.email, 'wrong-password')).toBe(
      false,
    );
  });
});
