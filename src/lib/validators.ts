export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginFieldErrors {
  email?: string;
  password?: string;
  form?: string;
}

export interface LoginValidationResult {
  isValid: boolean;
  errors: LoginFieldErrors;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const PASSWORD_MIN_LENGTH = 8;

export function validateEmail(email: string): string | undefined {
  const trimmed = email.trim();

  if (!trimmed) {
    return 'Email is required';
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return 'Enter a valid email address';
  }

  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
  }

  return undefined;
}

export function validateLoginForm(
  values: LoginFormValues,
): LoginValidationResult {
  const emailError = validateEmail(values.email);
  const passwordError = validatePassword(values.password);

  const errors: LoginFieldErrors = {};

  if (emailError) {
    errors.email = emailError;
  }

  if (passwordError) {
    errors.password = passwordError;
  }

  return {
    isValid: !emailError && !passwordError,
    errors,
  };
}
