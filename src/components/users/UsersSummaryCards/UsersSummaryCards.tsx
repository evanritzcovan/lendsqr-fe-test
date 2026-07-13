'use client';

import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Skeleton } from '@/components/ui/Skeleton';
import { StatCard } from '@/components/users/StatCard';
import { useUsersSummary } from '@/hooks/useUsersSummary';
import { STAT_CARD_CONFIG } from '@/lib/stat-cards';
import styles from './UsersSummaryCards.module.scss';

function StatCardSkeleton() {
  return (
    <div className={styles.skeletonCard}>
      <Skeleton width={48} height={48} className={styles.skeletonCircle} />
      <div className={styles.skeletonContent}>
        <Skeleton width="60%" height={12} />
        <Skeleton width="45%" height={24} />
      </div>
    </div>
  );
}

export function UsersSummaryCards() {
  const { summary, isLoading, error, retry } = useUsersSummary();

  if (isLoading) {
    return (
      <div className={styles.grid} aria-busy="true" aria-label="Loading summary">
        {STAT_CARD_CONFIG.map((card) => (
          <StatCardSkeleton key={card.key} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <ErrorBanner message={error} onRetry={() => void retry()} />
    );
  }

  if (!summary) {
    return (
      <ErrorBanner
        message="No summary data available"
        onRetry={() => void retry()}
      />
    );
  }

  return (
    <div className={styles.grid}>
      {STAT_CARD_CONFIG.map((card) => (
        <StatCard
          key={card.key}
          label={card.label}
          value={summary[card.key]}
          icon={card.icon}
          iconBackground={card.iconBackground}
          iconColor={card.iconColor}
        />
      ))}
    </div>
  );
}
