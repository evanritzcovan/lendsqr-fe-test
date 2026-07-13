import styles from './DetailSection.module.scss';

interface DetailItem {
  label: string;
  value: string;
}

interface DetailSectionProps {
  title: string;
  items: DetailItem[];
}

export function DetailSection({ title, items }: DetailSectionProps) {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{title}</h3>
      <dl className={styles.grid}>
        {items.map((item) => (
          <div key={item.label} className={styles.item}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
