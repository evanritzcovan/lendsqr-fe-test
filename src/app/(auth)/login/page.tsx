import Image from 'next/image';
import styles from './page.module.scss';

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.placeholder}>
        <Image
          src="/Group.svg"
          alt="lendsqr"
          width={174}
          height={36}
          className={styles.logo}
          priority
        />
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subtitle}>Phase 1+ — full login UI coming next.</p>
      </div>
    </div>
  );
}
