'use client';

import { startTransition, useCallback, useEffect, useState } from 'react';
import { ApiError, fetchUserById } from '@/lib/api';
import {
  getCachedUserDetail,
  mergeUserStatus,
  saveUserDetail,
} from '@/lib/storage';
import type { UserDetail } from '@/types/user';

export function useUserStorage(userId: string) {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const cached = getCachedUserDetail(userId);
    if (cached) {
      const merged = mergeUserStatus(cached);
      setUser(merged);
      setIsLoading(false);
      return;
    }

    try {
      const data = await fetchUserById(userId);
      const merged = mergeUserStatus(data);
      saveUserDetail(merged);
      setUser(merged);
    } catch (err) {
      setUser(null);
      setError(
        err instanceof ApiError ? err.message : 'Failed to load user details',
      );
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    startTransition(() => {
      void loadUser();
    });
  }, [loadUser]);

  const refresh = useCallback(() => {
    void loadUser();
  }, [loadUser]);

  const updateUser = useCallback((next: UserDetail) => {
    const merged = mergeUserStatus(next);
    saveUserDetail(merged);
    setUser(merged);
  }, []);

  return {
    user,
    isLoading,
    error,
    refresh,
    updateUser,
  };
}
