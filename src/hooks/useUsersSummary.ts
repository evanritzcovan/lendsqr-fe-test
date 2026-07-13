'use client';

import { startTransition, useCallback, useEffect, useState } from 'react';
import type { UsersSummary } from '@/types/user';
import { ApiError, fetchUsersSummary } from '@/lib/api';

export function useUsersSummary() {
  const [summary, setSummary] = useState<UsersSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSummary = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchUsersSummary();
      setSummary(data);
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

  return {
    summary,
    isLoading,
    error,
    retry: loadSummary,
  };
}
