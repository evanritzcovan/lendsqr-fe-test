'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ORGANIZATIONS, USER_STATUSES } from '@/lib/constants';
import type { UsersFilterFormValues } from '@/lib/users-url';
import styles from './FilterPopover.module.scss';

interface FilterPopoverProps {
  isOpen: boolean;
  initialValues: UsersFilterFormValues;
  onClose: () => void;
  onApply: (values: UsersFilterFormValues) => void;
  onReset: () => void;
}

function FilterPopoverForm({
  initialValues,
  onClose,
  onApply,
  onReset,
}: Omit<FilterPopoverProps, 'isOpen'>) {
  const [values, setValues] = useState(initialValues);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (panelRef.current?.contains(target)) {
        return;
      }

      if ((target as Element).closest?.('[data-filter-trigger]')) {
        return;
      }

      onClose();
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
  }, [onClose]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApply(values);
    onClose();
  };

  const handleReset = () => {
    const emptyValues: UsersFilterFormValues = {
      organization: '',
      username: '',
      email: '',
      date: '',
      phoneNumber: '',
      status: '',
    };

    setValues(emptyValues);
    onReset();
    onClose();
  };

  return (
    <div className={styles.popover} ref={panelRef} role="dialog" aria-label="Filter users">
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span className={styles.label}>Organization</span>
          <select
            className={styles.select}
            value={values.organization}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                organization: event.target.value,
              }))
            }
          >
            <option value="">Select</option>
            {ORGANIZATIONS.map((organization) => (
              <option key={organization} value={organization}>
                {organization}
              </option>
            ))}
          </select>
        </label>

        <Input
          label="Username"
          name="username"
          placeholder="User"
          value={values.username}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              username: event.target.value,
            }))
          }
        />

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              email: event.target.value,
            }))
          }
        />

        <Input
          label="Date"
          name="date"
          type="date"
          value={values.date}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              date: event.target.value,
            }))
          }
        />

        <Input
          label="Phone Number"
          name="phoneNumber"
          placeholder="Phone Number"
          value={values.phoneNumber}
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              phoneNumber: event.target.value,
            }))
          }
        />

        <label className={styles.field}>
          <span className={styles.label}>Status</span>
          <select
            className={styles.select}
            value={values.status}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                status: event.target.value,
              }))
            }
          >
            <option value="">Select</option>
            {USER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <div className={styles.actions}>
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit">Filter</Button>
        </div>
      </form>
    </div>
  );
}

export function FilterPopover({
  isOpen,
  initialValues,
  onClose,
  onApply,
  onReset,
}: FilterPopoverProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <FilterPopoverForm
      key={JSON.stringify(initialValues)}
      initialValues={initialValues}
      onClose={onClose}
      onApply={onApply}
      onReset={onReset}
    />
  );
}
