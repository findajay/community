-- Waitlist storage. Run once against your Postgres database (Neon free tier works).
create table if not exists waitlist_signups (
  id            bigint generated always as identity primary key,
  email         text not null unique,
  clubs         text,
  price_intent  text check (price_intent in ('founding_30_year', 'monthly_5', 'free_only')),
  locale        text not null default 'de' check (locale in ('de', 'en', 'fr', 'es', 'it')),
  confirm_token uuid not null default gen_random_uuid(),
  confirmed_at  timestamptz,
  created_at    timestamptz not null default now()
);

-- The numbers you'll actually look at every week:
-- select price_intent, count(*) filter (where confirmed_at is not null) as confirmed, count(*) as total
-- from waitlist_signups group by price_intent;
