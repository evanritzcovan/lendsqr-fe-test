import type { ComponentType, SVGProps } from 'react';
import {
  IconAudit,
  IconBriefcase,
  IconDecision,
  IconFees,
  IconHandshake,
  IconHome,
  IconKarma,
  IconLoan,
  IconLoanRequest,
  IconLogout,
  IconOrganization,
  IconPreferences,
  IconPricing,
  IconProducts,
  IconReports,
  IconSavings,
  IconServiceAccount,
  IconServices,
  IconSettlements,
  IconShield,
  IconTransactions,
  IconUsers,
  IconWhitelist,
} from '@/components/icons/NavIcons';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface NavItem {
  label: string;
  href?: string;
  icon: IconComponent;
  disabled?: boolean;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export const SIDEBAR_TOP_ITEMS: NavItem[] = [
  {
    label: 'Switch Organization',
    icon: IconBriefcase,
    disabled: true,
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: IconHome,
  },
];

export const SIDEBAR_SECTIONS: NavSection[] = [
  {
    title: 'Customers',
    items: [
      { label: 'Users', href: '/users', icon: IconUsers },
      { label: 'Guarantors', icon: IconHandshake, disabled: true },
      { label: 'Loans', icon: IconLoan, disabled: true },
      { label: 'Decision Models', icon: IconDecision, disabled: true },
      { label: 'Savings', icon: IconSavings, disabled: true },
      { label: 'Loan Requests', icon: IconLoanRequest, disabled: true },
      { label: 'Whitelist', icon: IconWhitelist, disabled: true },
      { label: 'Karma', icon: IconKarma, disabled: true },
    ],
  },
  {
    title: 'Businesses',
    items: [
      { label: 'Organization', icon: IconOrganization, disabled: true },
      { label: 'Loan Products', icon: IconProducts, disabled: true },
      { label: 'Savings Products', icon: IconProducts, disabled: true },
      { label: 'Fees and Charges', icon: IconFees, disabled: true },
      { label: 'Transactions', icon: IconTransactions, disabled: true },
      { label: 'Services', icon: IconServices, disabled: true },
      { label: 'Service Account', icon: IconServiceAccount, disabled: true },
      { label: 'Settlements', icon: IconSettlements, disabled: true },
      { label: 'Reports', icon: IconReports, disabled: true },
    ],
  },
  {
    title: 'Settings',
    items: [
      { label: 'Preferences', icon: IconPreferences, disabled: true },
      { label: 'Fees and Pricing', icon: IconPricing, disabled: true },
      { label: 'Audit Logs', icon: IconAudit, disabled: true },
      { label: 'Systems Messages', icon: IconShield, disabled: true },
    ],
  },
];

export const SIDEBAR_FOOTER_ITEMS: NavItem[] = [
  { label: 'Logout', icon: IconLogout },
];

export const APP_VERSION = 'v1.2.0';

export const NAVBAR_USER = {
  name: 'Adedeji',
  avatarAlt: 'Adedeji profile photo',
};
