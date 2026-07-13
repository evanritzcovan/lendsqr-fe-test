'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { IconChevronLeft } from '@/components/icons/NavIcons';
import { Button } from '@/components/ui/Button';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Skeleton } from '@/components/ui/Skeleton';
import { GeneralDetailsTab } from '@/components/user-details/GeneralDetailsTab';
import { UserDetailsTabs } from '@/components/user-details/UserDetailsTabs';
import { useUserStorage } from '@/hooks/useUserStorage';
import {
  getStatusForAction,
  getUserActionLabel,
  getUserRowActions,
} from '@/lib/user-actions';
import { setUserStatusOverride } from '@/lib/storage';
import { getUsersBackUrl } from '@/lib/users-url';
import styles from './UserDetailsView.module.scss';

interface UserDetailsViewProps {
  userId: string;
}

function UserDetailsSkeleton() {
  return (
    <div className={styles.page}>
      <Skeleton width={140} height={16} />
      <div className={styles.header}>
        <Skeleton width={180} height={28} />
        <div className={styles.actions}>
          <Skeleton width={150} height={48} />
          <Skeleton width={150} height={48} />
        </div>
      </div>
      <div className={styles.summarySkeleton}>
        <Skeleton width={100} height={100} className={styles.summaryAvatar} />
        <div className={styles.summaryContent}>
          <Skeleton width="40%" height={24} />
          <Skeleton width="30%" height={14} />
        </div>
      </div>
      <Skeleton height={48} />
      <Skeleton height={320} />
    </div>
  );
}

export function UserDetailsView({ userId }: UserDetailsViewProps) {
  const searchParams = useSearchParams();
  const backHref = getUsersBackUrl(searchParams.toString());
  const { user, isLoading, error, refresh, updateUser } = useUserStorage(userId);

  if (isLoading) {
    return <UserDetailsSkeleton />;
  }

  if (error || !user) {
    return (
      <div className={styles.page}>
        <Link href={backHref} className={styles.backLink}>
          <IconChevronLeft />
          <span>Back to Users</span>
        </Link>
        <ErrorBanner
          message={error ?? 'User not found'}
          onRetry={refresh}
        />
      </div>
    );
  }

  const actions = getUserRowActions(user.status);

  const handleListAction = () => {
    const status = getStatusForAction(actions.listAction);
    setUserStatusOverride(user.id, status, user.status);
    updateUser({ ...user, status });
  };

  const handleStatusAction = () => {
    const status = getStatusForAction(actions.statusAction);
    setUserStatusOverride(user.id, status, user.status);
    updateUser({ ...user, status });
  };

  return (
    <div className={styles.page}>
      <Link href={backHref} className={styles.backLink}>
        <IconChevronLeft />
        <span>Back to Users</span>
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>User Details</h1>
        <div className={styles.actions}>
          <Button variant="outline-danger" type="button" onClick={handleListAction}>
            {getUserActionLabel(actions.listAction)}
          </Button>
          <Button variant="outline-teal" type="button" onClick={handleStatusAction}>
            {getUserActionLabel(actions.statusAction)}
          </Button>
        </div>
      </div>

      <UserDetailsTabs
        user={user}
        generalDetails={<GeneralDetailsTab user={user} />}
      />
    </div>
  );
}
