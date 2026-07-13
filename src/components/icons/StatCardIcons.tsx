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

export function StatUsersIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 15C3 13.2 4.8 12 7 12C9.2 12 11 13.2 11 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="13.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16 15C16 13.5 14.8 12.5 13.2 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StatActiveUsersIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="6" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M2.5 15C2.5 13.3 4 12.5 6 12.5M10 12.5C12 12.5 13.5 13.3 13.5 15M14 12.5C16 12.5 17.5 13.3 17.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StatLoansIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path
        d="M6 3.5H11.5L14.5 6.5V16C14.5 16.3 14.2 16.5 14 16.5H6C5.8 16.5 5.5 16.3 5.5 16V4C5.5 3.7 5.8 3.5 6 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8.5 10H11.5M8.5 12.5H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function StatSavingsIcon(props: IconProps) {
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
