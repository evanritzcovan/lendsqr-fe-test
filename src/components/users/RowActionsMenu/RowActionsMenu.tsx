'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  IconEye,
  IconUserActivate,
  IconUserBlock,
  IconUserDeactivate,
} from '@/components/icons/NavIcons';
import { setUserStatusOverride } from '@/lib/storage';
import {
  getStatusForAction,
  getUserActionLabel,
  getUserRowActions,
} from '@/lib/user-actions';
import { buildUserDetailsUrl } from '@/lib/users-url';
import type { User } from '@/types/user';
import styles from './RowActionsMenu.module.scss';

interface RowActionsMenuProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: () => void;
}

export function RowActionsMenu({
  user,
  isOpen,
  onClose,
  onStatusChange,
}: RowActionsMenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const menuRef = useRef<HTMLDivElement>(null);
  const actions = getUserRowActions(user.status);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleViewDetails = () => {
    router.push(buildUserDetailsUrl(user.id, searchParams.toString()));
    onClose();
  };

  const handleStatusAction = () => {
    setUserStatusOverride(
      user.id,
      getStatusForAction(actions.statusAction),
      user.status,
    );
    onStatusChange();
    onClose();
  };

  const handleListAction = () => {
    setUserStatusOverride(
      user.id,
      getStatusForAction(actions.listAction),
      user.status,
    );
    onStatusChange();
    onClose();
  };

  const StatusIcon =
    actions.statusAction === 'deactivate' ? IconUserDeactivate : IconUserActivate;

  return (
    <div className={styles.menu} ref={menuRef} role="menu">
      <button type="button" className={styles.item} role="menuitem" onClick={handleViewDetails}>
        <IconEye />
        <span>View Details</span>
      </button>
      <button type="button" className={styles.item} role="menuitem" onClick={handleListAction}>
        <IconUserBlock />
        <span>{getUserActionLabel(actions.listAction)}</span>
      </button>
      <button type="button" className={styles.item} role="menuitem" onClick={handleStatusAction}>
        <StatusIcon />
        <span>{getUserActionLabel(actions.statusAction)}</span>
      </button>
    </div>
  );
}
