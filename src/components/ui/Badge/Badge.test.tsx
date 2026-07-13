import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from '@/components/ui/Badge';

describe('Badge', () => {
  it('renders the status label', () => {
    render(<Badge status="Active" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders blacklisted status', () => {
    render(<Badge status="Blacklisted" />);
    expect(screen.getByText('Blacklisted')).toBeInTheDocument();
  });
});
