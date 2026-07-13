import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PasswordInput } from '@/components/ui/PasswordInput';

describe('PasswordInput', () => {
  it('toggles password visibility', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <PasswordInput value="secret" onChange={handleChange} />,
    );

    const input = screen.getByPlaceholderText('Password');
    expect(input).toHaveAttribute('type', 'password');

    await user.click(screen.getByRole('button', { name: 'Show password' }));

    expect(input).toHaveAttribute('type', 'text');
    expect(
      screen.getByRole('button', { name: 'Hide password' }),
    ).toBeInTheDocument();
  });
});
