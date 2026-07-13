import type { ComponentType, SVGProps } from 'react';
import { formatStatNumber } from '@/lib/format';
import styles from './StatCard.module.scss';

interface StatCardProps {
  label: string;
  value: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconBackground: string;
  iconColor: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  iconBackground,
  iconColor,
}: StatCardProps) {
  return (
    <article className={styles.card}>
      <div
        className={styles.iconWrap}
        style={{ backgroundColor: iconBackground, color: iconColor }}
      >
        <Icon />
      </div>
      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>{formatStatNumber(value)}</p>
      </div>
    </article>
  );
}
