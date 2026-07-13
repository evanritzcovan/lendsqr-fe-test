import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const defaults = {
  width: 20,
  height: 20,
  viewBox: '0 0 20 20',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true,
} as const;

export function IconMenu(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path
        d="M3 5H17M3 10H17M3 15H17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M13.5 13.5L17 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconBell(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path
        d="M10 3.5C7.5 3.5 6 5.5 6 7.5V11L4.5 12.5H15.5L14 11V7.5C14 5.5 12.5 3.5 10 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 14.5C8.8 15.3 9.3 16 10 16C10.7 16 11.2 15.3 11.5 14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconHome(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path
        d="M3.5 8.5L10 3L16.5 8.5V16C16.5 16.3 16.2 16.5 16 16.5H12.5V12H7.5V16.5H4C3.8 16.5 3.5 16.3 3.5 16V8.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconBriefcase(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <rect
        x="3.5"
        y="7"
        width="13"
        height="9"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 7V6C7 5.2 7.7 4.5 8.5 4.5H11.5C12.3 4.5 13 5.2 13 6V7"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="8" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 15.5C3.5 13.5 5.3 12 8 12C10.7 12 12.5 13.5 12.5 15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="13.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M15.5 15.5C15.5 13.8 14.2 12.5 12.5 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconUserCheck(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="8" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 15.5C3.5 13.5 5.3 12 8 12C9.2 12 10.2 12.4 11 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 12L15.5 13.5L18 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconFile(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path
        d="M6 3.5H11.5L14.5 6.5V16C14.5 16.3 14.2 16.5 14 16.5H6C5.8 16.5 5.5 16.3 5.5 16V4C5.5 3.7 5.8 3.5 6 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M11.5 3.5V6.5H14.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconCoins(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <ellipse cx="10" cy="6" rx="5" ry="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 6V10C5 11.1 7.2 12 10 12C12.8 12 15 11.1 15 10V6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5 10V14C5 15.1 7.2 16 10 16C12.8 16 15 15.1 15 14V10"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function IconBuilding(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <rect
        x="5"
        y="3.5"
        width="10"
        height="13"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M8 7H8.01M12 7H12.01M8 10H8.01M12 10H12.01M8 13H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconSettings(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 3.5V5M10 15V16.5M16.5 10H15M5 10H3.5M14.5 5.5L13.5 6.5M6.5 13.5L5.5 14.5M14.5 14.5L13.5 13.5M6.5 6.5L5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconLogout(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path
        d="M7.5 3.5H5.5C4.7 3.5 4 4.2 4 5V15C4 15.8 4.7 16.5 5.5 16.5H7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11 7.5L14.5 10L11 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.5 10H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconGrid(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <rect x="4" y="4" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="4" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="4" y="11" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="11" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconChart(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path
        d="M4 15.5V12M8 15.5V8M12 15.5V10M16 15.5V5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path
        d="M10 3.5L15.5 5.5V10C15.5 13 13.2 15.2 10 16.5C6.8 15.2 4.5 13 4.5 10V5.5L10 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMessage(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path
        d="M4 5.5H16V13.5H7L4 15.5V5.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconSavings(props: IconProps) {
  return <IconCoins {...props} />;
}

export function IconLoan(props: IconProps) {
  return <IconFile {...props} />;
}

export function IconHandshake(props: IconProps) {
  return <IconUserCheck {...props} />;
}

export function IconWhitelist(props: IconProps) {
  return <IconShield {...props} />;
}

export function IconKarma(props: IconProps) {
  return <IconChart {...props} />;
}

export function IconReports(props: IconProps) {
  return <IconChart {...props} />;
}

export function IconTransactions(props: IconProps) {
  return <IconGrid {...props} />;
}

export function IconServices(props: IconProps) {
  return <IconSettings {...props} />;
}

export function IconFees(props: IconProps) {
  return <IconCoins {...props} />;
}

export function IconProducts(props: IconProps) {
  return <IconBriefcase {...props} />;
}

export function IconOrganization(props: IconProps) {
  return <IconBuilding {...props} />;
}

export function IconAudit(props: IconProps) {
  return <IconFile {...props} />;
}

export function IconPricing(props: IconProps) {
  return <IconCoins {...props} />;
}

export function IconPreferences(props: IconProps) {
  return <IconSettings {...props} />;
}

export function IconDecision(props: IconProps) {
  return <IconChart {...props} />;
}

export function IconSettlements(props: IconProps) {
  return <IconCoins {...props} />;
}

export function IconServiceAccount(props: IconProps) {
  return <IconUsers {...props} />;
}

export function IconLoanRequest(props: IconProps) {
  return <IconFile {...props} />;
}

export function IconFilter(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M4 5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 10H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconMoreVertical(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="10" cy="5" r="1.25" fill="currentColor" />
      <circle cx="10" cy="10" r="1.25" fill="currentColor" />
      <circle cx="10" cy="15" r="1.25" fill="currentColor" />
    </svg>
  );
}

export function IconEye(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path
        d="M3.5 10C5.2 6.5 7.4 4.5 10 4.5C12.6 4.5 14.8 6.5 16.5 10C14.8 13.5 12.6 15.5 10 15.5C7.4 15.5 5.2 13.5 3.5 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconUserBlock(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="8" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 15C3.5 13.2 5.2 12 8 12C9.1 12 10.1 12.3 11 12.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 12L17 15M17 12L14 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconUserActivate(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="8" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 15C3.5 13.2 5.2 12 8 12C10.7 12 12.5 13.5 12.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.5 10.5L16 12L18.5 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconUserDeactivate(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="8" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 15C3.5 13.2 5.2 12 8 12C10.7 12 12.5 13.5 12.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 8H18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconChevronLeft(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path
        d="M12.5 5L7.5 10L12.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
