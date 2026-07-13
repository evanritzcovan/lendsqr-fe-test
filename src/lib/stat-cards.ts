import type { ComponentType, SVGProps } from 'react';
import type { UsersSummary } from '@/types/user';
import {
  StatActiveUsersIcon,
  StatLoansIcon,
  StatSavingsIcon,
  StatUsersIcon,
} from '@/components/icons/StatCardIcons';

export interface StatCardConfig {
  label: string;
  key: keyof UsersSummary;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconBackground: string;
  iconColor: string;
}

export const STAT_CARD_CONFIG: StatCardConfig[] = [
  {
    label: 'Users',
    key: 'totalUsers',
    icon: StatUsersIcon,
    iconBackground: '#fce9ff',
    iconColor: '#df18ff',
  },
  {
    label: 'Active Users',
    key: 'activeUsers',
    icon: StatActiveUsersIcon,
    iconBackground: '#f0e9ff',
    iconColor: '#5718ff',
  },
  {
    label: 'Users with Loans',
    key: 'usersWithLoans',
    icon: StatLoansIcon,
    iconBackground: '#feefec',
    iconColor: '#f55f44',
  },
  {
    label: 'Users with Savings',
    key: 'usersWithSavings',
    icon: StatSavingsIcon,
    iconBackground: '#ffe9ef',
    iconColor: '#ff3366',
  },
];
