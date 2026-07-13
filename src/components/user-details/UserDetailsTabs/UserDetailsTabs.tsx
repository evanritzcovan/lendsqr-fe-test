'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { UserSummaryCard } from '@/components/user-details/UserSummaryCard';
import type { UserDetail } from '@/types/user';
import styles from './UserDetailsTabs.module.scss';

const TABS = [
  'General Details',
  'Documents',
  'Bank Details',
  'Loans',
  'Savings',
  'App and System',
] as const;

type TabName = (typeof TABS)[number];

interface UserDetailsTabsProps {
  user: UserDetail;
  generalDetails: ReactNode;
}

export function UserDetailsTabs({ user, generalDetails }: UserDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabName>('General Details');

  return (
    <>
      <div className={styles.topCard}>
        <UserSummaryCard user={user} />

        <div className={styles.tabList} role="tablist" aria-label="User details sections">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              className={activeTab === tab ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab(tab)}
              title={tab}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.bottomCard} role="tabpanel">
        {activeTab === 'General Details' ? (
          generalDetails
        ) : (
          <p className={styles.emptyState}>
            No {activeTab.toLowerCase()} available for this user yet.
          </p>
        )}
      </div>
    </>
  );
}
