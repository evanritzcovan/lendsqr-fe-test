import type { UserStatus } from '@/types/user';
import styles from './Badge.module.scss';

interface BadgeProps {
  status: UserStatus;
}

const STATUS_CLASS: Record<UserStatus, string> = {
  Active: styles.active,
  Inactive: styles.inactive,
  Pending: styles.pending,
  Blacklisted: styles.blacklisted,
};

export function Badge({ status }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${STATUS_CLASS[status]}`}>{status}</span>
  );
}
