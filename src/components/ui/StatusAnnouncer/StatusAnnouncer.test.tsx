import { act, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusAnnouncer } from '@/components/ui/StatusAnnouncer';
import { STATUS_CHANGED_EVENT } from '@/lib/storage';

describe('StatusAnnouncer', () => {
  it('announces status change messages', () => {
    render(<StatusAnnouncer />);

    act(() => {
      window.dispatchEvent(
        new CustomEvent(STATUS_CHANGED_EVENT, {
          detail: { message: 'Activate User applied' },
        }),
      );
    });

    expect(screen.getByText('Activate User applied')).toBeInTheDocument();
  });
});
