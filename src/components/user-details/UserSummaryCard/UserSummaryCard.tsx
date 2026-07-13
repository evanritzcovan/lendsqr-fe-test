import { Avatar } from '@/components/ui/Avatar';
import type { UserDetail } from '@/types/user';
import styles from './UserSummaryCard.module.scss';

interface UserSummaryCardProps {
  user: UserDetail;
}

function TierStars({ tier }: { tier: UserDetail['tier'] }) {
  return (
    <div className={styles.stars} aria-label={`Tier ${tier}`}>
      {Array.from({ length: 3 }).map((_, index) => (
        <span
          key={index}
          className={index < tier ? styles.starFilled : styles.starEmpty}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function UserSummaryCard({ user }: UserSummaryCardProps) {
  return (
    <div className={styles.profileRow}>
      <Avatar src={user.avatarUrl} alt={user.fullName} size="xl" />

      <div className={styles.identity}>
        <p className={styles.name}>{user.fullName}</p>
        <p className={styles.userId}>{user.userId}</p>
      </div>

      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.tierBlock}>
        <p className={styles.blockLabel}>User&apos;s Tier</p>
        <TierStars tier={user.tier} />
      </div>

      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.accountBlock}>
        <p className={styles.balance}>{user.accountBalance}</p>
        <p className={styles.account}>{user.accountBank}</p>
      </div>
    </div>
  );
}
