'use client';

import { startTransition, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { PaginatedUsersResponse } from '@/types/user';
import { ApiError, fetchUsers } from '@/lib/api';
import { mergeUsersStatus } from '@/lib/storage';
import {
  buildUsersUrl,
  mergeUsersParams,
} from '@/lib/users-url';
import {
  parseUsersQueryParams,
  type UsersQueryParams,
} from '@/lib/users-query';

export function useUsers() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useMemo(
    () => parseUsersQueryParams(searchParams),
    [searchParams],
  );

  const [response, setResponse] = useState<PaginatedUsersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchUsers(params);
      setResponse({
        ...data,
        data: mergeUsersStatus(data.data),
      });
    } catch (err) {
      setResponse(null);
      setError(
        err instanceof ApiError ? err.message : 'Failed to load users',
      );
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    startTransition(() => {
      void loadUsers();
    });
  }, [loadUsers]);

  const updateParams = useCallback(
    (updates: Partial<UsersQueryParams>, options?: { resetPage?: boolean }) => {
      const next = mergeUsersParams(params, updates, options);
      router.push(buildUsersUrl(next));
    },
    [params, router],
  );

  const refresh = useCallback(() => {
    void loadUsers();
  }, [loadUsers]);

  return {
    params,
    response,
    isLoading,
    error,
    updateParams,
    refresh,
  };
}
