import users from '../../data/users.json';
import type { UserDetail } from '@/types/user';

const USER_DATA = users as UserDetail[];

export function getAllUsers(): UserDetail[] {
  return USER_DATA;
}
