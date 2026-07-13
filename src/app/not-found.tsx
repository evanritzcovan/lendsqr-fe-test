import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.message}>
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link href="/users" className={styles.link}>
        Back to Users
      </Link>
    </div>
  );
}
