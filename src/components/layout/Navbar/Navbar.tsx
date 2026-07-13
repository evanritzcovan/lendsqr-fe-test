'use client';

import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  IconBell,
  IconChevronDown,
  IconMenu,
  IconSearch,
} from '@/components/icons/NavIcons';
import { Avatar } from '@/components/ui/Avatar';
import { NAVBAR_USER } from '@/lib/navigation';
import { buildUsersUrl, mergeUsersParams } from '@/lib/users-url';
import { parseUsersQueryParams } from '@/lib/users-query';
import styles from './Navbar.module.scss';

interface NavbarProps {
  onMenuClick: () => void;
}

function NavbarSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('search') ?? '';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get('search') ?? '').trim();

    if (pathname === '/users') {
      const params = mergeUsersParams(parseUsersQueryParams(searchParams), {
        search: query || undefined,
      });
      router.push(buildUsersUrl(params));
      return;
    }

    const params = query ? `?search=${encodeURIComponent(query)}` : '';
    router.push(`/users${params}`);
  };

  return (
    <form
      key={searchValue}
      className={styles.searchForm}
      role="search"
      onSubmit={handleSubmit}
    >
      <label htmlFor="navbar-search" className="sr-only">
        Search for anything
      </label>
      <input
        id="navbar-search"
        name="search"
        className={styles.searchInput}
        type="search"
        placeholder="Search for anything"
        defaultValue={searchValue}
      />
      <button type="submit" className={styles.searchButton} aria-label="Search">
        <IconSearch />
      </button>
    </form>
  );
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

      <Suspense fallback={<div className={styles.searchForm} />}>
        <NavbarSearch />
      </Suspense>

      <div className={styles.actions}>
        <span className={styles.docsLink} aria-disabled="true" title="Coming soon">
          Docs
        </span>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="Notifications (coming soon)"
          disabled
        >
          <IconBell />
        </button>
        <button
          type="button"
          className={styles.profile}
          aria-label="User menu (coming soon)"
          disabled
        >
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
