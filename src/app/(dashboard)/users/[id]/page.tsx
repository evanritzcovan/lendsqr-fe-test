import { Button } from '@/components/ui/Button';
import styles from './page.module.scss';

interface UserDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailsPage({ params }: UserDetailsPageProps) {
  const { id } = await params;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>User Details</h1>
        <div className={styles.actions}>
          <Button variant="outline-danger" type="button">
            Blacklist User
          </Button>
          <Button variant="outline-teal" type="button">
            Activate User
          </Button>
        </div>
      </div>
      <p className={styles.subtitle}>
        Phase 6 — full profile for user <strong>{id}</strong>.
      </p>
    </div>
  );
}
