import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hideLabel?: boolean;
  error?: string;
  trailing?: ReactNode;
  suppressHydrationWarning?: boolean;
}

export function Input({
  label,
  hideLabel = false,
  error,
  trailing,
  id,
  className,
  suppressHydrationWarning = false,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className={styles.field}>
      {label ? (
        <label
          className={[styles.label, hideLabel ? 'sr-only' : ''].filter(Boolean).join(' ')}
          htmlFor={inputId}
        >
          {label}
        </label>
      ) : null}
      <div className={styles.control} suppressHydrationWarning={suppressHydrationWarning}>
        <input
          id={inputId}
          className={[styles.input, error ? styles.hasError : '', className]
            .filter(Boolean)
            .join(' ')}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          suppressHydrationWarning={suppressHydrationWarning}
          {...props}
        />
        {trailing ? <div className={styles.trailing}>{trailing}</div> : null}
      </div>
      {error ? (
        <p id={`${inputId}-error`} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
