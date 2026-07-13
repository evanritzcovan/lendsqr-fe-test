'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GuestGuard } from '@/components/layout/GuestGuard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { useAuth } from '@/contexts/AuthContext';
import type { LoginFieldErrors } from '@/lib/validators';
import { validateLoginForm } from '@/lib/validators';
import styles from './page.module.scss';

const LOGIN_DELAY_MS = 400;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [formError, setFormError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setFieldErrors((current) => ({ ...current, email: undefined }));
    setFormError('');
    setInfoMessage('');
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setFieldErrors((current) => ({ ...current, password: undefined }));
    setFormError('');
    setInfoMessage('');
  };

  const handleForgotPassword = () => {
    setInfoMessage('Please contact your administrator to reset your password.');
    setFormError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');
    setInfoMessage('');

    const validation = validateLoginForm({ email, password });

    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      return;
    }

    setFieldErrors({});
    setIsLoading(true);

    await new Promise((resolve) => {
      window.setTimeout(resolve, LOGIN_DELAY_MS);
    });

    const success = login(email, password);

    if (success) {
      router.push('/users');
      return;
    }

    setFormError('Invalid email or password');
    setIsLoading(false);
  };

  return (
    <GuestGuard>
      <div className={styles.page}>
        <div className={styles.brandPanel}>
          <Image
            src="/Group.svg"
            alt="lendsqr"
            width={174}
            height={36}
            className={styles.logo}
            priority
          />
          <div className={styles.illustrationWrap}>
            <Image
              src="/login-illustration.svg"
              alt=""
              width={600}
              height={338}
              className={styles.illustration}
              priority
            />
          </div>
        </div>

        <div className={styles.formPanel}>
          <div className={styles.formCard}>
            <Image
              src="/Group.svg"
              alt="lendsqr"
              width={145}
              height={30}
              className={styles.mobileLogo}
              priority
            />

            <h1 className={styles.title}>Welcome!</h1>
            <p className={styles.subtitle}>Enter details to login.</p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                hideLabel
                placeholder="Email"
                autoComplete="email"
                value={email}
                error={fieldErrors.email}
                onChange={(event) => handleEmailChange(event.target.value)}
                suppressHydrationWarning
              />

              <div className={styles.passwordSection}>
                <PasswordInput
                  hideLabel
                  value={password}
                  error={fieldErrors.password}
                  onChange={handlePasswordChange}
                  suppressHydrationWarning
                />
                <button
                  type="button"
                  className={styles.forgotPassword}
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>

              {formError ? (
                <p className={styles.formError} role="alert">
                  {formError}
                </p>
              ) : null}

              {infoMessage ? (
                <p className={styles.infoMessage} role="status">
                  {infoMessage}
                </p>
              ) : null}

              <Button type="submit" fullWidth isLoading={isLoading}>
                Log In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </GuestGuard>
  );
}
