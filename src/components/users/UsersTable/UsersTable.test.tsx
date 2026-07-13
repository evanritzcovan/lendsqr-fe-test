import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { UsersTable } from '@/components/users/UsersTable';

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('@/hooks/useUsers', () => ({
  useUsers: () => ({
    params: {},
    response: {
      data: [],
      total: 0,
      page: 1,
      limit: 100,
      totalPages: 1,
    },
    isLoading: false,
    error: null,
    updateParams: vi.fn(),
    refresh: vi.fn(),
  }),
}));

describe('UsersTable', () => {
  it('renders an empty state when no users match', () => {
    render(<UsersTable />);
    expect(screen.getAllByText('No users match your filters.').length).toBeGreaterThan(0);
  });
});
