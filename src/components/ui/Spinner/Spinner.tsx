import styles from './Spinner.module.scss';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
  label?: string;
}

const SIZE_CLASS = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export function Spinner({
  size = 'md',
  fullPage = false,
  label = 'Loading',
}: SpinnerProps) {
  const spinner = (
    <div
      className={`${styles.spinner} ${SIZE_CLASS[size]}`}
      role="status"
      aria-label={label}
    />
  );

  if (fullPage) {
    return <div className={styles.fullPage}>{spinner}</div>;
  }

  return spinner;
}
