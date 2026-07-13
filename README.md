# lendsqr-fe-test

Lendsqr Frontend Engineering Assessment — a responsive admin console for browsing and managing users.

**Live app:** [https://evan-ritzcovan-lendsqr-fe-test.vercel.app](https://evan-ritzcovan-lendsqr-fe-test.vercel.app)  
**Repository:** [https://github.com/evanritzcovan/lendsqr-fe-test](https://github.com/evanritzcovan/lendsqr-fe-test)

## Demo credentials

| Field | Value |
|-------|-------|
| Email | `test@example.com` |
| Password | `password123` |

## Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **SCSS Modules** with shared design tokens
- **Vitest** + React Testing Library
- **Vercel** deployment

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests (watch) |
| `npm run test:run` | Run unit tests once |
| `npm run format` | Format with Prettier |
| `npm run generate:users` | Regenerate `data/users.json` (500 users) |

## Features

- **Login** — client-side validation, SHOW password toggle, dummy auth via `sessionStorage`
- **Users dashboard** — four summary cards + searchable, filterable, paginated user table
- **Filters** — organization, username, email, date joined, phone, status (URL-synced)
- **Row actions** — View Details, Blacklist User, Activate User
- **User details** — profile summary, tabbed sections, Blacklist / Activate, back navigation that preserves list filters
- **Persistence** — user detail cache + status overrides in `localStorage`
- **Responsive layout** — desktop sidebar/table, mobile drawer + card list
- **States** — loading, empty, and error UI across critical views

## Routes

| Route | Page |
|-------|------|
| `/` | Redirects to `/login` |
| `/login` | Login |
| `/dashboard` | Redirects to `/users` |
| `/users` | Users list + summary cards |
| `/users/[id]` | User details |

## Mock API

Self-hosted Next.js Route Handlers over a generated `data/users.json` dataset (500 records). Unique to this submission — no shared third-party mock endpoint.

| Endpoint | Description |
|----------|-------------|
| `GET /api/users` | Paginated list with search, filter, and sort query params |
| `GET /api/users/summary` | Aggregate stats for the summary cards |
| `GET /api/users/[id]` | Single user detail |

Default page size is **100** (options: 25 / 50 / 100).

## Architecture notes

| Decision | Choice | Why |
|----------|--------|-----|
| Mock API | Next.js Route Handlers | Unique endpoint, no third-party dependency |
| Auth | React context + `sessionStorage` | Simple client gate; matches assessment scope |
| Pagination / filters | Server-side via query params | Keeps payloads small across 500 records |
| List UI state | URL search params | Shareable links and back-button friendly |
| User details persistence | `localStorage` | Spec requires client persistence; survives refresh |
| Status changes | `localStorage` overrides merged onto API data | No writable API required |
| Status filter + overrides | Client-side filter/paginate when a status filter is active | Ensures blacklisted/activated users appear correctly across pages |
| Virtualization | None | Page size ≤ 100 is enough for this dataset |
| Dashboard vs Users | Single `/users` view | Matches Figma (stats + table together) |

### Status persistence flow

1. Blacklist / Activate updates `lendsqr_status_overrides` in `localStorage` (keeps original status for summary sync).
2. Users table merges overrides onto each fetched page.
3. When filtering by status, the client fetches without the status param (up to 500 rows), merges overrides, then filters and paginates locally so results match effective status.
4. User details read/write `lendsqr_user_details` cache with API fallback.

## Testing

```bash
npm run test:run
```

Coverage focuses on core logic and UI critical paths: validation, query/filter helpers, storage merge, auth guards, and key empty/error states.

## Assets

| File | Description |
|------|-------------|
| `public/Group.svg` | Lendsqr logo |
| `public/login-illustration.svg` | Login page illustration |
| `public/Union.png` | Favicon / app icon source |
| `public/avatar.png` | Default avatar fallback |

## Deploy

Hosted on Vercel: [https://evan-ritzcovan-lendsqr-fe-test.vercel.app](https://evan-ritzcovan-lendsqr-fe-test.vercel.app)
