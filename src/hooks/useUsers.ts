'use client';

import { startTransition, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { PaginatedUsersResponse } from '@/types/user';
import { ApiError, fetchUsers } from '@/lib/api';
import { mergeUsersStatus, STATUS_CHANGED_EVENT } from '@/lib/storage';
import {
  buildUsersUrl,
  mergeUsersParams,
} from '@/lib/users-url';
import {
  parseUsersQueryParams,
  queryUsersByEffectiveStatus,
  type UsersQueryParams,
  usesClientStatusFilter,
} from '@/lib/users-query';
import { STATUS_FILTER_FETCH_LIMIT } from '@/lib/constants';

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
      if (usesClientStatusFilter(params)) {
        const data = await fetchUsers({
          ...params,
          status: undefined,
          page: 1,
          limit: STATUS_FILTER_FETCH_LIMIT,
        });
        setResponse(
          queryUsersByEffectiveStatus(mergeUsersStatus(data.data), params),
        );
        return;
      }

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

  useEffect(() => {
    const handleStatusChanged = () => {
      void loadUsers();
    };

    window.addEventListener(STATUS_CHANGED_EVENT, handleStatusChanged);

    return () => {
      window.removeEventListener(STATUS_CHANGED_EVENT, handleStatusChanged);
    };
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
