'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
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

function toTabId(label: TabName) {
  return label.toLowerCase().replace(/\s+/g, '-');
}

interface UserDetailsTabsProps {
  user: UserDetail;
  generalDetails: ReactNode;
}

export function UserDetailsTabs({ user, generalDetails }: UserDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<TabName>('General Details');
  const panelId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusTab = (index: number) => {
    tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index;

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % TABS.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + TABS.length) % TABS.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = TABS.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveTab(TABS[nextIndex]);
    focusTab(nextIndex);
  };

  const activePanelId = `${panelId}-${toTabId(activeTab)}`;

  return (
    <>
      <div className={styles.topCard}>
        <UserSummaryCard user={user} />

        <div className={styles.tabList} role="tablist" aria-label="User details sections">
          {TABS.map((tab, index) => {
            const tabId = `${panelId}-${toTabId(tab)}`;
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                id={tabId}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={activePanelId}
                tabIndex={isActive ? 0 : -1}
                className={isActive ? styles.tabActive : styles.tab}
                onClick={() => setActiveTab(tab)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                title={tab}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={activePanelId}
        className={styles.bottomCard}
        role="tabpanel"
        aria-labelledby={`${panelId}-${toTabId(activeTab)}`}
      >
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
