# lendsqr-fe-test

Lendsqr Frontend Engineering Assessment — admin console built with Next.js, TypeScript, and SCSS.

## Stack

- **Next.js** (App Router)
- **TypeScript**
- **SCSS Modules** + global design tokens
- **Vitest** + React Testing Library

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

## Routes (Phase 0 shell)

| Route | Page |
|-------|------|
| `/` | Redirects to `/login` |
| `/login` | Login |
| `/dashboard` | Redirects to `/users` |
| `/users` | Users (dashboard + table) |
| `/users/[id]` | User details |

## Assets

| File | Description |
|------|-------------|
| `public/Group.svg` | Lendsqr logo |
| `public/login-illustration.svg` | Login page illustration |

## Deploy

Target: `https://evan-ritzcovan-lendsqr-fe-test.vercel.app`
