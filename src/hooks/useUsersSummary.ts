'use client';

import { startTransition, useCallback, useEffect, useState } from 'react';
import type { UsersSummary } from '@/types/user';
import { ApiError, fetchUsersSummary } from '@/lib/api';
import { applySummaryOverrides, STATUS_CHANGED_EVENT } from '@/lib/storage';

export function useUsersSummary() {
  const [summary, setSummary] = useState<UsersSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSummary = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchUsersSummary();
      setSummary(applySummaryOverrides(data));
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Failed to load dashboard summary';

      setSummary(null);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    startTransition(() => {
      void loadSummary();
    });
  }, [loadSummary]);

  useEffect(() => {
    const handleStatusChanged = () => {
      void loadSummary();
    };

    window.addEventListener(STATUS_CHANGED_EVENT, handleStatusChanged);

    return () => {
      window.removeEventListener(STATUS_CHANGED_EVENT, handleStatusChanged);
    };
  }, [loadSummary]);

  return {
    summary,
    isLoading,
    error,
    retry: loadSummary,
  };
}
