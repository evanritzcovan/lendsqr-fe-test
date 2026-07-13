import { Badge } from '@/components/ui/Badge';
import styles from './page.module.scss';

export default function UsersPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Users</h1>
      <p className={styles.subtitle}>
        Phase 5 — stat cards, table, filters, and pagination.
      </p>
      <div className={styles.preview}>
        <span className={styles.previewLabel}>UI preview</span>
        <div className={styles.badges}>
          <Badge status="Active" />
          <Badge status="Inactive" />
          <Badge status="Pending" />
          <Badge status="Blacklisted" />
        </div>
      </div>
    </div>
  );
}
