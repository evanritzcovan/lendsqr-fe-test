import { describe, expect, it } from 'vitest';
import { buildPageNumbers } from '@/lib/pagination';

describe('buildPageNumbers', () => {
  it('returns all pages when total pages is small', () => {
    expect(buildPageNumbers(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('includes ellipsis for large page counts', () => {
    expect(buildPageNumbers(8, 16)).toEqual([1, 'ellipsis', 7, 8, 9, 'ellipsis', 16]);
  });
});
