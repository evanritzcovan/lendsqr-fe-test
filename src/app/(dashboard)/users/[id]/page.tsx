import styles from '../../layout.module.scss';

interface UserDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailsPage({ params }: UserDetailsPageProps) {
  const { id } = await params;

  return (
    <div className={styles.placeholder}>
      <h1 className={styles.title}>User Details</h1>
      <p className={styles.subtitle}>
        Phase 6 — profile for user <strong>{id}</strong>.
      </p>
    </div>
  );
}
