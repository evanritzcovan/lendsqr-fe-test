import { PAGE_SIZE_OPTIONS } from '@/lib/constants';
import { buildPageNumbers } from '@/lib/pagination';
import { IconChevronLeft, IconChevronRight } from '@/components/icons/NavIcons';
import styles from './Pagination.module.scss';

interface PaginationProps {
  page: number;
  totalPages: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function Pagination({
  page,
  totalPages,
  limit,
  total,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const pages = buildPageNumbers(page, totalPages);

  return (
    <div className={styles.pagination}>
      <div className={styles.summary}>
        <span>Showing</span>
        <label className="sr-only" htmlFor="page-size">
          Results per page
        </label>
        <select
          id="page-size"
          className={styles.select}
          value={limit}
          onChange={(event) => onLimitChange(Number(event.target.value))}
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>
          out of <strong>{total.toLocaleString('en-NG')}</strong>
        </span>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <IconChevronLeft />
        </button>

        {pages.map((item, index) =>
          item === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              className={`${styles.pageButton} ${
                item === page ? styles.activePage : ''
              }`}
              onClick={() => onPageChange(item)}
              aria-current={item === page ? 'page' : undefined}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          className={styles.arrow}
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          <IconChevronRight />
        </button>
      </div>
    </div>
  );
}
