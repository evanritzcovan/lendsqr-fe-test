'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import styles from '../not-found.module.scss';

interface DashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Something went wrong</h1>
      <p className={styles.message}>
        We could not load this page. Please try again or return to the users list.
      </p>
      <Button type="button" variant="outline" onClick={reset}>
        Try again
      </Button>
      <Link href="/users" className={styles.link}>
        Back to Users
      </Link>
    </div>
  );
}
