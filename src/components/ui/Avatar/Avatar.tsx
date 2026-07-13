import Image from 'next/image';
import styles from './Avatar.module.scss';

const SIZE_MAP = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 100,
} as const;

type AvatarSize = keyof typeof SIZE_MAP;

interface AvatarProps {
  src?: string;
  alt: string;
  size?: AvatarSize;
}

export function Avatar({ src = '/avatar.png', alt, size = 'md' }: AvatarProps) {
  const dimension = SIZE_MAP[size];

  return (
    <div className={`${styles.avatar} ${styles[size]}`}>
      <Image
        src={src}
        alt={alt}
        width={dimension}
        height={dimension}
        className={styles.image}
      />
    </div>
  );
}
