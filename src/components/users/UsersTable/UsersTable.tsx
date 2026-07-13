'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { IconFilter, IconMoreVertical } from '@/components/icons/NavIcons';
import { Badge } from '@/components/ui/Badge';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Skeleton } from '@/components/ui/Skeleton';
import { FilterPopover } from '@/components/users/FilterPopover';
import { Pagination } from '@/components/users/Pagination';
import { RowActionsMenu } from '@/components/users/RowActionsMenu';
import { useUsers } from '@/hooks/useUsers';
import { formatUserDate } from '@/lib/format';
import {
  filtersToQueryParams,
  queryParamsToFilters,
  buildUserDetailsUrl,
} from '@/lib/users-url';
import type { User } from '@/types/user';
import styles from './UsersTable.module.scss';

const TABLE_COLUMNS = [
  'Organization',
  'Username',
  'Email',
  'Phone Number',
  'Date Joined',
  'Status',
] as const;

function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <tr key={index}>
          {Array.from({ length: 7 }).map((__, cellIndex) => (
            <td key={cellIndex}>
              <Skeleton height={14} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function MobileCard({
  user,
  queryString,
  onStatusChange,
}: {
  user: User;
  queryString: string;
  onStatusChange: () => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <article className={styles.mobileCard}>
      <div className={styles.mobileHeader}>
        <div>
          <p className={styles.mobileName}>{user.username}</p>
          <p className={styles.mobileOrg}>{user.organization}</p>
        </div>
        <div className={styles.actionsCell}>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={`Actions for ${user.username}`}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
          >
            <IconMoreVertical />
          </button>
          <RowActionsMenu
            user={user}
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onStatusChange={onStatusChange}
          />
        </div>
      </div>
      <div className={styles.mobileDetails}>
        <p>
          <span>Email</span>
          <Link href={buildUserDetailsUrl(user.id, queryString)}>{user.email}</Link>
        </p>
        <p>
          <span>Phone</span>
          {user.phoneNumber}
        </p>
        <p>
          <span>Date joined</span>
          {formatUserDate(user.dateJoined)}
        </p>
        <p>
          <span>Status</span>
          <Badge status={user.status} />
        </p>
      </div>
    </article>
  );
}

export function UsersTable() {
  const { response, isLoading, error, params, updateParams, refresh } =
    useUsers();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openMenuUserId, setOpenMenuUserId] = useState<string | null>(null);

  const hasActiveFilters = Boolean(
    params.organization ||
      params.username ||
      params.email ||
      params.phoneNumber ||
      params.status ||
      params.dateFrom ||
      params.search,
  );

  if (error) {
    return <ErrorBanner message={error} onRetry={refresh} />;
  }

  return (
    <section className={styles.tableSection}>
      {isFilterOpen ? (
        <div className={styles.filterPanel}>
          <FilterPopover
            isOpen={isFilterOpen}
            initialValues={queryParamsToFilters(params)}
            onClose={() => setIsFilterOpen(false)}
            onApply={(values) =>
              updateParams(filtersToQueryParams(values), { resetPage: true })
            }
            onReset={() =>
              updateParams(
                {
                  organization: undefined,
                  username: undefined,
                  email: undefined,
                  phoneNumber: undefined,
                  status: undefined,
                  dateFrom: undefined,
                  dateTo: undefined,
                },
                { resetPage: true },
              )
            }
          />
        </div>
      ) : null}

      <div className={styles.tableHeader}>
        <button
          type="button"
          className={styles.filterButton}
          data-filter-trigger
          onClick={() => setIsFilterOpen(true)}
          aria-expanded={isFilterOpen}
          aria-haspopup="dialog"
        >
          <IconFilter />
          <span>Filter</span>
        </button>
      </div>

      <div className={styles.desktopTableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {TABLE_COLUMNS.map((column) => (
                <th key={column}>
                  <div className={styles.columnHeader}>
                    <span className={styles.headerLabel}>{column}</span>
                    <button
                      type="button"
                      className={styles.headerFilter}
                      data-filter-trigger
                      onClick={() => setIsFilterOpen(true)}
                      aria-label={`Filter by ${column}`}
                    >
                      <IconFilter />
                    </button>
                  </div>
                </th>
              ))}
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <TableSkeleton />
            ) : response?.data.length ? (
              response.data.map((user) => (
                <tr key={user.id}>
                  <td>{user.organization}</td>
                  <td>{user.username}</td>
                  <td>
                    <Link
                      className={styles.emailLink}
                      href={buildUserDetailsUrl(user.id, queryString)}
                    >
                      {user.email}
                    </Link>
                  </td>
                  <td>{user.phoneNumber}</td>
                  <td>{formatUserDate(user.dateJoined)}</td>
                  <td>
                    <Badge status={user.status} />
                  </td>
                  <td className={styles.actionsCell}>
                    <button
                      type="button"
                      className={styles.menuButton}
                      onClick={() =>
                        setOpenMenuUserId((current) =>
                          current === user.id ? null : user.id,
                        )
                      }
                      aria-label={`Actions for ${user.username}`}
                      aria-haspopup="menu"
                      aria-expanded={openMenuUserId === user.id}
                    >
                      <IconMoreVertical />
                    </button>
                    <RowActionsMenu
                      user={user}
                      isOpen={openMenuUserId === user.id}
                      onClose={() => setOpenMenuUserId(null)}
                      onStatusChange={refresh}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className={styles.emptyState}>
                  <p>No users match your filters.</p>
                  {hasActiveFilters ? (
                    <button
                      type="button"
                      className={styles.clearFilters}
                      onClick={() =>
                        updateParams(
                          {
                            search: undefined,
                            organization: undefined,
                            username: undefined,
                            email: undefined,
                            phoneNumber: undefined,
                            status: undefined,
                            dateFrom: undefined,
                            dateTo: undefined,
                          },
                          { resetPage: true },
                        )
                      }
                    >
                      Clear filters
                    </button>
                  ) : null}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.mobileList}>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={styles.mobileCard}>
              <Skeleton height={18} width="40%" />
              <Skeleton height={14} width="70%" />
              <Skeleton height={14} />
              <Skeleton height={14} />
            </div>
          ))
        ) : response?.data.length ? (
          response.data.map((user) => (
            <MobileCard
              key={user.id}
              user={user}
              queryString={queryString}
              onStatusChange={refresh}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>No users match your filters.</p>
            {hasActiveFilters ? (
              <button
                type="button"
                className={styles.clearFilters}
                onClick={() =>
                  updateParams(
                    {
                      search: undefined,
                      organization: undefined,
                      username: undefined,
                      email: undefined,
                      phoneNumber: undefined,
                      status: undefined,
                      dateFrom: undefined,
                      dateTo: undefined,
                    },
                    { resetPage: true },
                  )
                }
              >
                Clear filters
              </button>
            ) : null}
          </div>
        )}
      </div>

      {response && response.total > 0 ? (
        <Pagination
          page={response.page}
          totalPages={response.totalPages}
          limit={response.limit}
          total={response.total}
          onPageChange={(page) => updateParams({ page })}
          onLimitChange={(limit) =>
            updateParams({ limit, page: 1 }, { resetPage: false })
          }
        />
      ) : null}
    </section>
  );
}
