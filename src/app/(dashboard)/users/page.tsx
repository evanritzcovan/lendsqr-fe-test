import { UsersSummaryCards } from '@/components/users/UsersSummaryCards';
import styles from './page.module.scss';

export default function UsersPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Users</h1>
      <UsersSummaryCards />
    </div>
  );
}
