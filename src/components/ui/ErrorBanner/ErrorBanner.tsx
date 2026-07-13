import { Button } from '@/components/ui/Button';
import styles from './ErrorBanner.module.scss';

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div className={styles.banner} role="alert">
      <p className={styles.message}>{message}</p>
      {onRetry ? (
        <Button variant="outline" size="md" type="button" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
}
