'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GuestGuard } from '@/components/layout/GuestGuard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import styles from './page.module.scss';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const success = login(email.trim(), password);

    if (success) {
      router.push('/users');
      return;
    }

    setError('Invalid email or password');
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
              width={560}
              height={560}
              className={styles.illustration}
              priority
            />
          </div>
        </div>

        <div className={styles.formPanel}>
          <div className={styles.formCard}>
            <h1 className={styles.title}>Welcome!</h1>
            <p className={styles.subtitle}>Enter details to login.</p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <Input
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error ? <p className={styles.error}>{error}</p> : null}
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
