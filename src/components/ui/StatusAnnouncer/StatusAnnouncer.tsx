'use client';

import { useEffect, useState } from 'react';
import { STATUS_CHANGED_EVENT } from '@/lib/storage';

export function StatusAnnouncer() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleStatusChanged = (event: Event) => {
      const detail = (event as CustomEvent<{ message?: string }>).detail;
      setMessage(detail?.message ?? 'User status updated');
    };

    window.addEventListener(STATUS_CHANGED_EVENT, handleStatusChanged);

    return () => {
      window.removeEventListener(STATUS_CHANGED_EVENT, handleStatusChanged);
    };
  }, []);

  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      {message}
    </div>
  );
}
