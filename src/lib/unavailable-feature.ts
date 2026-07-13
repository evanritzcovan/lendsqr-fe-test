export const UNAVAILABLE_FEATURE_MESSAGE =
  "This section isn't included in the assessment build.";

export const UNAVAILABLE_FEATURE_EVENT = 'lendsqr_unavailable_feature';

export function notifyUnavailableFeature(
  message = UNAVAILABLE_FEATURE_MESSAGE,
) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(UNAVAILABLE_FEATURE_EVENT, { detail: { message } }),
    );
  }
}
