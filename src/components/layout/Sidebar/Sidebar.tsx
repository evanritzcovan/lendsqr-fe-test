'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { IconChevronDown, IconClose } from '@/components/icons/NavIcons';
import { useAuth } from '@/contexts/AuthContext';
import {
  APP_VERSION,
  SIDEBAR_FOOTER_ITEMS,
  SIDEBAR_SECTIONS,
  SIDEBAR_TOP_ITEMS,
  type NavItem,
} from '@/lib/navigation';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function isActive(pathname: string, href?: string) {
  if (!href) {
    return false;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleItemClick = (item: NavItem) => {
    if (item.label === 'Logout') {
      logout();
      router.push('/login');
      onClose();
      return;
    }

    if (item.disabled) {
      return;
    }

    onClose();
  };

  const renderItem = (item: NavItem) => {
    const Icon = item.icon;
    const active = isActive(pathname, item.href);
    const className = [
      styles.item,
      active ? styles.active : '',
      item.disabled ? styles.disabled : '',
      item.label === 'Switch Organization' ? styles.switchOrg : '',
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <>
        <span className={styles.icon}>
          <Icon />
        </span>
        <span className={styles.label}>{item.label}</span>
        {item.label === 'Switch Organization' ? (
          <span className={styles.chevron}>
            <IconChevronDown />
          </span>
        ) : null}
      </>
    );

    if (item.href && !item.disabled) {
      return (
        <Link
          key={item.label}
          href={item.href}
          className={className}
          onClick={() => handleItemClick(item)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        key={item.label}
        type="button"
        className={className}
        onClick={() => handleItemClick(item)}
        disabled={item.disabled && item.label !== 'Logout'}
        aria-disabled={item.disabled || undefined}
      >
        {content}
      </button>
    );
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
        aria-label="Main navigation"
      >
        <div className={styles.header}>
          <Link href="/users" className={styles.logo} onClick={onClose}>
            <Image src="/Group.svg" alt="lendsqr" width={144} height={30} priority />
          </Link>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <IconClose />
          </button>
        </div>

        <nav className={styles.nav}>
          <div className={styles.topItems}>
            {SIDEBAR_TOP_ITEMS.map(renderItem)}
          </div>

          {SIDEBAR_SECTIONS.map((section) => (
            <div key={section.title} className={styles.section}>
              {section.title ? (
                <p className={styles.sectionTitle}>{section.title}</p>
              ) : null}
              <div className={styles.sectionItems}>
                {section.items.map(renderItem)}
              </div>
            </div>
          ))}
        </nav>

        <div className={styles.footer}>
          {SIDEBAR_FOOTER_ITEMS.map(renderItem)}
          <p className={styles.version}>{APP_VERSION}</p>
        </div>
      </aside>
      {isOpen ? (
        <button
          type="button"
          className={styles.backdrop}
          onClick={onClose}
          aria-label="Close navigation menu"
        />
      ) : null}
    </>
  );
}
