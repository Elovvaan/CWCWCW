# Christian Women Connecting with Other Women Network

Production-ready, mobile-first Next.js ministry platform blending public ministry presence and lightweight operations.

## Stack
- Next.js App Router + TypeScript + Tailwind
- Prisma + Postgres
- API routes for forms, prayer requests, reminders, and registrations

## Route map
### Public
- `/`
- `/about`
- `/events`
- `/events/[slug]`
- `/upper-room`
- `/prayer-requests`
- `/join-us`
- `/gallery`
- `/donate`
- `/contact`

### Admin
- `/admin/dashboard`
- `/admin/members`
- `/admin/events`
- `/admin/upper-room`
- `/admin/prayer-requests`
- `/admin/donations`
- `/admin/funding`
- `/admin/gallery`
- `/admin/reminders`
- `/admin/forms`
- `/admin/settings`

## Agent modules
- Grace Guide: public next-step recommendations
- Prayer Companion: scripture comfort + prayer framing
- Provision Agent: admin funding recommendations
- Grace Reminder: admin reminder automation panel

## Core workflows implemented
- Event creation + registration endpoint + reminders endpoint
- Prayer request capture with urgent/follow-up flags
- Join, volunteer, mentor, and contact lead capture
- Donation and campaign data models with admin surface
- Reminders Center model + API endpoint with automation keys

## Setup
1. `npm install`
2. `cp .env.example .env` and fill `DATABASE_URL`
3. `npm run prisma:generate`
4. `npm run prisma:migrate`
5. `npm run prisma:seed`
6. `npm run dev`

## Railway deployment (Next.js + Prisma)
1. Create a new Railway project and connect this GitHub repository.
2. Add a **Postgres** plugin in Railway.
3. Set environment variables in Railway:
   - `DATABASE_URL` (from the Railway Postgres service)
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your Railway public app URL)
   - any optional links (`VENMO_URL`, `CASHAPP_URL`, `FACEBOOK_URL`) and admin credentials.
4. Deploy from GitHub (Railway will use `railway.toml` + `npm run start`).
5. Run Prisma deployment command after deploy:
   - Standard (when migrations exist): `npm run prisma:deploy`
   - First launch with no migrations yet: `npm run prisma:deploy:safe` (falls back to `db push`).

### Notes
- Runtime binds to `0.0.0.0` and respects Railway's `PORT` variable via the start script.
- Prisma is configured for PostgreSQL and reads `DATABASE_URL` from environment variables.

