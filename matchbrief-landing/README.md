# MatchBrief — waitlist landing page

Validation landing page for a personalized football briefing product:
weekly email digest + ticket on-sale alerts + calendar sync + match passport.

Everything runs on free tiers — total cost €0 until well past validation.

## Stack

- **Next.js 15** (App Router) — one page, two API routes
- **Postgres** for signups (Neon free tier, EU region)
- **Resend** for double opt-in confirmation emails (free tier: 3,000/month)
- Deployable to **Vercel** free tier (hobby)

## What it does

1. Visitor signs up: email + clubs they follow + **price intent**
   (€30/year founding / €5 month / free only) — this is the validation signal.
2. Honeypot field filters bots; duplicate emails are merged, not errored.
3. A double opt-in confirmation email is sent (legally required practice for
   marketing email in Germany). Unconfirmed rows can be purged after 30 days.
4. `/api/confirm?token=…` marks the signup confirmed → `/confirmed`.

Without `RESEND_API_KEY` (local dev) the confirm link is printed to the
server console so the full flow is testable offline.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL (and later RESEND_API_KEY)
psql "$DATABASE_URL" -f schema.sql
npm run dev
```

## Deploy (Vercel)

1. Create a free Postgres DB at neon.tech (EU region), run `schema.sql` against it.
2. `vercel` from this directory (or import the repo in the Vercel dashboard,
   set the project root to `matchbrief-landing/`).
3. Set env vars in Vercel: `DATABASE_URL`, `RESEND_API_KEY`, `EMAIL_FROM`,
   `PUBLIC_BASE_URL` (your production URL).
4. Verify your sending domain in Resend so confirmation emails don't land in spam.

## Before going live — checklist

- [ ] Fill in the `TODO` placeholders in `app/impressum/page.tsx`
      (Impressum is legally required in Germany) and name your actual
      providers in `app/datenschutz/page.tsx`.
- [ ] Decide the real product name + domain ("MatchBrief" is a working title —
      check trademark/domain availability first).
- [ ] Point `PUBLIC_BASE_URL` and `EMAIL_FROM` at the real domain.

## Reading the results

```sql
select price_intent,
       count(*) filter (where confirmed_at is not null) as confirmed,
       count(*) as total
from waitlist_signups
group by price_intent;
```

Decision rule agreed for validation: **100 confirmed signups** from organic
posts (r/Groundhopping, r/Bundesliga, fan forums) before building the MVP;
founding-member payment links go out by email **after** that — no payment is
taken on this page.
