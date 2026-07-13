'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import styles from './PasswordInput.module.scss';

interface PasswordInputProps {
  name?: string;
  id?: string;
  label?: string;
  hideLabel?: boolean;
  placeholder?: string;
  autoComplete?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export function PasswordInput({
  name = 'password',
  id = 'password',
  label = 'Password',
  hideLabel = false,
  placeholder = 'Password',
  autoComplete = 'current-password',
  value,
  error,
  onChange,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Input
      id={id}
      name={name}
      label={label}
      hideLabel={hideLabel}
      type={isVisible ? 'text' : 'password'}
      placeholder={placeholder}
      autoComplete={autoComplete}
      value={value}
      error={error}
      onChange={(event) => onChange(event.target.value)}
      className={styles.input}
      trailing={
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setIsVisible((current) => !current)}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
        >
          {isVisible ? 'HIDE' : 'SHOW'}
        </button>
      }
    />
  );
}
