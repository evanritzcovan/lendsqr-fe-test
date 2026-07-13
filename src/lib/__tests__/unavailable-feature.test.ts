import { describe, expect, it, vi } from 'vitest';
import {
  notifyUnavailableFeature,
  UNAVAILABLE_FEATURE_EVENT,
  UNAVAILABLE_FEATURE_MESSAGE,
} from '@/lib/unavailable-feature';

describe('unavailable-feature', () => {
  it('dispatches the default unavailable feature message', () => {
    const handler = vi.fn();
    window.addEventListener(UNAVAILABLE_FEATURE_EVENT, handler);

    notifyUnavailableFeature();

    expect(handler).toHaveBeenCalledTimes(1);
    expect(
      (handler.mock.calls[0]?.[0] as CustomEvent<{ message: string }>).detail
        .message,
    ).toBe(UNAVAILABLE_FEATURE_MESSAGE);

    window.removeEventListener(UNAVAILABLE_FEATURE_EVENT, handler);
  });

  it('dispatches a custom message when provided', () => {
    const handler = vi.fn();
    window.addEventListener(UNAVAILABLE_FEATURE_EVENT, handler);

    notifyUnavailableFeature('Custom unavailable message');

    expect(
      (handler.mock.calls[0]?.[0] as CustomEvent<{ message: string }>).detail
        .message,
    ).toBe('Custom unavailable message');

    window.removeEventListener(UNAVAILABLE_FEATURE_EVENT, handler);
  });
});
