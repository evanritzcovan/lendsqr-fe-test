import { describe, expect, it } from 'vitest';
import { formatStatNumber } from '@/lib/format';

describe('formatStatNumber', () => {
  it('formats numbers with grouping separators', () => {
    expect(formatStatNumber(2453)).toBe('2,453');
  });

  it('formats zero', () => {
    expect(formatStatNumber(0)).toBe('0');
  });
});
