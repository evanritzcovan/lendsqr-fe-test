import { TEST_CREDENTIALS } from '@/lib/constants';

export function authenticateUser(email: string, password: string): boolean {
  return (
    email.trim() === TEST_CREDENTIALS.email &&
    password === TEST_CREDENTIALS.password
  );
}
