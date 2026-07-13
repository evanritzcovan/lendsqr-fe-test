import { Suspense } from 'react';
import { Spinner } from '@/components/ui/Spinner';
import { UsersSummaryCards } from '@/components/users/UsersSummaryCards';
import { UsersTable } from '@/components/users/UsersTable';
import styles from './page.module.scss';

function UsersPageContent() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Users</h1>
      <UsersSummaryCards />
      <Suspense fallback={<Spinner fullPage label="Loading users" />}>
        <UsersTable />
      </Suspense>
    </div>
  );
}

export default function UsersPage() {
  return (
    <Suspense fallback={<Spinner fullPage label="Loading page" />}>
      <UsersPageContent />
    </Suspense>
  );
}
