export const APP_NAME = 'lendsqr';

export const TEST_CREDENTIALS = {
  email: 'test@example.com',
  password: 'LENDsqr3215?',
} as const;

export const AUTH_SESSION_KEY = 'lendsqr_auth_session';

export const USER_DETAILS_STORAGE_KEY = 'lendsqr_user_details';

export const DEFAULT_PAGE_SIZE = 100;

export const PAGE_SIZE_OPTIONS = [25, 50, 100] as const;

export const USER_STATUSES = [
  'Active',
  'Inactive',
  'Pending',
  'Blacklisted',
] as const;

export const ORGANIZATIONS = [
  'Lendsqr',
  'Irorun',
  'Lendstar',
  'Aggressive',
  'Adedeji',
  'Flutterwave',
  'Paystack',
] as const;

export const STATUS_OVERRIDES_STORAGE_KEY = 'lendsqr_status_overrides';
