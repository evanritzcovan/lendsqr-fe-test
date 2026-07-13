'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IconBell, IconChevronDown, IconMenu, IconSearch } from '@/components/icons/NavIcons';
import { Avatar } from '@/components/ui/Avatar';
import { NAVBAR_USER } from '@/lib/navigation';
import styles from './Navbar.module.scss';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <IconMenu />
        </button>
        <Link href="/users" className={styles.mobileLogo}>
          <Image src="/Group.svg" alt="lendsqr" width={120} height={24} priority />
        </Link>
      </div>

      <form className={styles.searchForm} role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="navbar-search" className="sr-only">
          Search for anything
        </label>
        <input
          id="navbar-search"
          className={styles.searchInput}
          type="search"
          placeholder="Search for anything"
          disabled
        />
        <button type="submit" className={styles.searchButton} aria-label="Search" disabled>
          <IconSearch />
        </button>
      </form>

      <div className={styles.actions}>
        <a href="#" className={styles.docsLink} onClick={(e) => e.preventDefault()}>
          Docs
        </a>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Notifications"
          disabled
        >
          <IconBell />
        </button>
        <button type="button" className={styles.profile} aria-label="User menu" disabled>
          <Avatar alt={NAVBAR_USER.avatarAlt} size="sm" />
          <span className={styles.profileName}>{NAVBAR_USER.name}</span>
          <span className={styles.chevron}>
            <IconChevronDown />
          </span>
        </button>
      </div>
    </header>
  );
}
