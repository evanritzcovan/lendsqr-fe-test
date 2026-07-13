'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { StatusAnnouncer } from '@/components/ui/StatusAnnouncer';
import { UnavailableFeatureNotice } from '@/components/ui/UnavailableFeatureNotice';
import styles from './DashboardShell.module.scss';

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <StatusAnnouncer />
      <UnavailableFeatureNotice />
      <Sidebar
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
        <div className={styles.main}>
        <Navbar onMenuClick={() => setIsMobileNavOpen(true)} />
        <main id="main-content" className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
