import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { GuestGuard } from '@/components/layout/GuestGuard';

const replace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace }),
}));

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from '@/contexts/AuthContext';

describe('GuestGuard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects authenticated users to the users page', () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <GuestGuard>
        <p>Login form</p>
      </GuestGuard>,
    );

    expect(replace).toHaveBeenCalledWith('/users');
    expect(screen.queryByText('Login form')).not.toBeInTheDocument();
  });

  it('renders children for guests', () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <GuestGuard>
        <p>Login form</p>
      </GuestGuard>,
    );

    expect(screen.getByText('Login form')).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();
  });
});
