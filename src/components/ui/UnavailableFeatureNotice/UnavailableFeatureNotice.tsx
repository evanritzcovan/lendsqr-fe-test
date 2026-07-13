'use client';

import { useEffect, useRef, useState } from 'react';
import { UNAVAILABLE_FEATURE_EVENT } from '@/lib/unavailable-feature';
import styles from './UnavailableFeatureNotice.module.scss';

const NOTICE_DURATION_MS = 3000;

export function UnavailableFeatureNotice() {
  const [message, setMessage] = useState('');
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleUnavailableFeature = (event: Event) => {
      const detail = (event as CustomEvent<{ message?: string }>).detail;
      const nextMessage = detail?.message ?? '';

      if (!nextMessage) {
        return;
      }

      setMessage(nextMessage);

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setMessage('');
        timeoutRef.current = null;
      }, NOTICE_DURATION_MS);
    };

    window.addEventListener(UNAVAILABLE_FEATURE_EVENT, handleUnavailableFeature);

    return () => {
      window.removeEventListener(
        UNAVAILABLE_FEATURE_EVENT,
        handleUnavailableFeature,
      );

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!message) {
    return null;
  }

  return (
    <div className={styles.notice} role="status" aria-live="polite" aria-atomic="true">
      {message}
    </div>
  );
}
