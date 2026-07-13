import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { UnavailableFeatureNotice } from '@/components/ui/UnavailableFeatureNotice';
import {
  notifyUnavailableFeature,
  UNAVAILABLE_FEATURE_MESSAGE,
} from '@/lib/unavailable-feature';

describe('UnavailableFeatureNotice', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows and clears unavailable feature messages', () => {
    vi.useFakeTimers();
    render(<UnavailableFeatureNotice />);

    act(() => {
      notifyUnavailableFeature();
    });

    expect(screen.getByRole('status')).toHaveTextContent(
      UNAVAILABLE_FEATURE_MESSAGE,
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
