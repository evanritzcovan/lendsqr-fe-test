'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './not-found.module.scss';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className={styles.page}>
          <h1 className={styles.title}>Something went wrong</h1>
          <p className={styles.message}>
            An unexpected error occurred. Please try again.
          </p>
          <Button type="button" variant="outline" onClick={reset}>
            Try again
          </Button>
          <Link href="/login" className={styles.link}>
            Back to Login
          </Link>
        </div>
      </body>
    </html>
  );
}
