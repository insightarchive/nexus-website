# NEXUS Website

The public marketing / early-access site for **NEXUS**, a native Windows productivity suite (system tools, security, automation, and productivity utilities in one app). This repo is separate from the main NEXUS app codebase, which is private.

> **বাংলায় সংক্ষেপে:** এটা NEXUS অ্যাপের জন্য public ওয়েবসাইট — Next.js (frontend + backend একসাথে) আর PostgreSQL ডেটাবেস দিয়ে বানানো, সম্পূর্ণ ready-to-run। যেহেতু NEXUS-এর এখনো কোনো public release/installer নেই (`nexus` রিপোর নিজের `doc/website/পরিকল্পনা.md`-তেও এটা স্পষ্ট লেখা আছে), তাই "Download" বাটনের জায়গায় সততার সাথে **"Early Access — waitlist"** রাখা হয়েছে — real ইমেইল, real ডেটাবেসে সেভ হয়। Release আসলে এটা আসল download বাটনে বদলে দেওয়া কয়েক মিনিটের কাজ (নিচে "Flipping on the real download" অংশ দেখুন)। চালানোর নিয়ম নিচে ইংরেজিতে ধাপে ধাপে লেখা আছে — মূলত: `.env` বানান, `docker compose up --build`, ব্যস়।

## Why there's no "Download" button yet

NEXUS is still under active development — there is no public installer, no tagged GitHub release, and the project's own website plan explicitly rules out fake or non-functional download buttons. So this site:

- Lists **only** features that are actually built and verified in the real app (see `src/content/features.ts`).
- Replaces the download flow with a real early-access waitlist (email → Postgres, via a real API route).
- Will get a real "Download for Windows" section the moment a tagged release exists — the plumbing (API routes, database, admin view) is already there; only the content needs to change. See **Flipping on the real download** below.

## Tech stack

- **Next.js 16** (App Router) — frontend (React 19) and backend (Route Handlers) in one codebase.
- **PostgreSQL** via **Prisma** — the SQL database, used for waitlist signups and contact messages.
- Hand-written CSS using design tokens copied from the real NEXUS app (same accent blue, same light theme, same "no resting shadow on cards" rule) — no CSS framework, kept deliberately light.
- Simple bilingual (English/Bangla) toggle, no i18n library — see `src/components/LanguageProvider.tsx`.
- Cookie-based admin session (HMAC-signed, no server-side session store) protecting `/admin/dashboard`.

## Project structure

```
src/
  app/
    page.tsx                 Home (hero + waitlist + feature teaser)
    features/page.tsx        Full, verified feature list
    changelog/page.tsx        Development log (pre-launch progress, not versioned releases)
    faq/page.tsx              FAQ
    about/page.tsx            About + contact form
    admin/page.tsx             Admin login
    admin/dashboard/page.tsx   Admin dashboard (waitlist + contact messages)
    api/waitlist/route.ts      POST — join the waitlist
    api/contact/route.ts       POST — send a contact message
    api/admin/*                Admin login/logout/data routes
  components/                 Header, Footer, forms, feature cards, language provider
  content/                    Bilingual copy + the verified feature/changelog/FAQ data
  lib/                        Prisma client, admin auth, validation, rate limiting
  middleware.ts               Protects /admin/dashboard and the admin API routes
prisma/schema.prisma          WaitlistSignup + ContactMessage models
docker-compose.yml            Postgres + migration job + the app, one command to run everything
Dockerfile                    Multi-stage build (deps / migrator / builder / runner)
```

## Getting started (local development)

Prerequisites: Node.js 20+, npm, and a PostgreSQL server (or Docker).

1. Copy the env file and fill in real values:
   ```bash
   cp .env.example .env
   openssl rand -hex 32          # use the output as SESSION_SECRET
   npm run hash-password -- "your-admin-password"   # use the output as ADMIN_PASSWORD_HASH
   ```
2. Start Postgres (skip if you already have one running locally):
   ```bash
   docker run -d --name nexus-db -e POSTGRES_USER=nexus -e POSTGRES_PASSWORD=nexus_dev_password \
     -e POSTGRES_DB=nexus_website -p 5432:5432 postgres:16-alpine
   ```
3. Install dependencies and run the database migration:
   ```bash
   npm install
   npm run db:migrate:dev
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`. The admin dashboard is at `/admin` (log in with the password you hashed in step 1).

## Running everything with Docker (recommended for a real deploy)

This is the "one command, ready to launch" path — it starts Postgres, runs migrations, and starts the site:

```bash
cp .env.example .env
openssl rand -hex 32                              # -> SESSION_SECRET in .env
npm run hash-password -- "your-admin-password"     # -> ADMIN_PASSWORD_HASH in .env
docker compose up --build
```

The site is then live on port 3000 (put it behind a reverse proxy like Caddy or nginx for a real domain + HTTPS). This works on any VPS with Docker installed.

## Deploying to Vercel + a hosted Postgres

Vercel doesn't host databases, so pair it with a free Postgres host (e.g. Neon or Supabase):

1. Create a free Postgres database on Neon/Supabase and copy its connection string.
2. Run `npm run db:migrate:deploy` once locally (or from CI) pointed at that `DATABASE_URL` to create the tables.
3. Import this repo into Vercel, and set the `DATABASE_URL`, `SESSION_SECRET`, and `ADMIN_PASSWORD_HASH` environment variables in the Vercel project settings.
4. Deploy. Vercel builds with `npm run build`, which already runs `prisma generate` first.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string used by Prisma. |
| `SESSION_SECRET` | Long random string signing the admin session cookie. Generate with `openssl rand -hex 32`. |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of the admin dashboard password. Generate with `npm run hash-password -- "..."` and paste its output **exactly as printed** — Next.js's env loader expands unescaped `$name` sequences in `.env` values, which silently corrupts a raw bcrypt hash (they start with `$2a$12$...`) and makes login fail with no clear error. The script's output is already escaped correctly. Never store the plain password. |
| `POSTGRES_PASSWORD` | Only used by `docker-compose.yml` to set the Postgres container's password. |

## Flipping on the real download

Once there's a real, tagged Windows installer:

1. Add the download links/version/system requirements to `src/content/site.ts` (or wherever you'd like — the structure is intentionally simple) and update the hero badge/copy in the same file.
2. Replace the waitlist CTA on the home page (`src/app/page.tsx`) and header (`src/components/Header.tsx`) with an actual "Download for Windows" button.
3. Leave the waitlist API/database in place — it's useful afterwards too, e.g. for a "notify me for macOS/Linux" signup.

## A note on `npm audit`

`npm audit` flags a high-severity advisory in `deepmerge-ts`, pulled in transitively by the `prisma` CLI's config loader. It only affects the `prisma` command-line tool at build/migration time (parsing our own local config), not any code that runs in the deployed website or touches user input — there is no real exposure here. It'll clear itself on Prisma's next patch release; re-run `npm audit` after upgrading `prisma`/`@prisma/client` periodically.

## Keeping this site honest

This project intentionally only advertises what's real. Before adding anything to `src/content/features.ts` or turning on a "Download" button, confirm it's actually shipped and verified in the real NEXUS app — not just planned or in progress. That rule is what this site's credibility rests on.
