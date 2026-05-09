-- Smart Creation Group — Supabase schema
-- Run once in: Supabase Dashboard → SQL Editor → New query → paste → Run.
-- Idempotent: safe to re-run.

-- ─────────────────────────────────────────────────────────────────────
-- Tables
-- ─────────────────────────────────────────────────────────────────────

create table if not exists public.sc_centres (
  id              bigserial primary key,
  key             text        not null unique,
  name            text        not null,
  tagline         text,
  description     text,
  hero_image      text,
  building        text        not null default '',
  location        text        not null default '',
  address_line    text,
  emirate         text        not null default 'Dubai, U.A.E.',
  google_maps_url text,
  phone           text,
  email           text,
  display_order   integer     not null default 100,
  advantages      jsonb       not null default '[]'::jsonb,
  nearby          jsonb       not null default '[]'::jsonb,
  gallery         jsonb       not null default '[]'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists sc_centres_display_order_idx
  on public.sc_centres (display_order);

create table if not exists public.sc_properties (
  id                   bigserial primary key,
  slug                 text        not null unique,
  title                text        not null,
  hero_image           text,
  centre_id            bigint      references public.sc_centres(id) on delete set null,
  office_no            text        not null default '',
  category             text        not null default 'Private office',
  accent               text        not null default 'blue',
  description          text        not null default '',
  highlights           jsonb       not null default '[]'::jsonb,
  featured             boolean     not null default false,
  show_on_home         boolean     not null default false,
  floor                text,
  sqft                 text,
  capacity             text        not null default '',
  view                 text,
  features             jsonb       not null default '[]'::jsonb,
  price_amount         text        not null default '',
  price_period         text,
  price_note           text,
  payment_terms        text,
  payment_options      jsonb       not null default '[]'::jsonb,
  fees                 jsonb       not null default '{}'::jsonb,
  availability         text        not null default 'Available now',
  availability_accent  text        not null default 'live',
  available_from       text,
  gallery              jsonb       not null default '[]'::jsonb,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create index if not exists sc_properties_centre_id_idx
  on public.sc_properties (centre_id);
create index if not exists sc_properties_featured_idx
  on public.sc_properties (featured);

-- ─────────────────────────────────────────────────────────────────────
-- Team
-- ─────────────────────────────────────────────────────────────────────

create table if not exists public.sc_team (
  id            bigserial   primary key,
  name          text        not null,
  role          text        not null default '',
  photo         text,
  linkedin      text,
  display_order integer     not null default 100,
  visible       boolean     not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists sc_team_display_order_idx
  on public.sc_team (display_order);

-- ─────────────────────────────────────────────────────────────────────
-- updated_at trigger
-- ─────────────────────────────────────────────────────────────────────

create or replace function public.sc_set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists sc_centres_updated_at on public.sc_centres;
create trigger sc_centres_updated_at
  before update on public.sc_centres
  for each row execute function public.sc_set_updated_at();

drop trigger if exists sc_properties_updated_at on public.sc_properties;
create trigger sc_properties_updated_at
  before update on public.sc_properties
  for each row execute function public.sc_set_updated_at();

drop trigger if exists sc_team_updated_at on public.sc_team;
create trigger sc_team_updated_at
  before update on public.sc_team
  for each row execute function public.sc_set_updated_at();

-- ─────────────────────────────────────────────────────────────────────
-- Row Level Security — anon can read everything, only service role writes
-- ─────────────────────────────────────────────────────────────────────

alter table public.sc_centres    enable row level security;
alter table public.sc_properties enable row level security;
alter table public.sc_team       enable row level security;

drop policy if exists "sc_centres anon read"    on public.sc_centres;
drop policy if exists "sc_properties anon read" on public.sc_properties;
drop policy if exists "sc_team anon read"       on public.sc_team;

create policy "sc_centres anon read"
  on public.sc_centres for select
  to anon, authenticated
  using (true);

create policy "sc_properties anon read"
  on public.sc_properties for select
  to anon, authenticated
  using (true);

create policy "sc_team anon read"
  on public.sc_team for select
  to anon, authenticated
  using (visible = true);

-- ─────────────────────────────────────────────────────────────────────
-- Storage bucket — sc-media (public)
-- ─────────────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('sc-media', 'sc-media', true)
on conflict (id) do update set public = excluded.public;

-- Public read policy for the sc-media bucket
drop policy if exists "sc-media public read" on storage.objects;
create policy "sc-media public read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'sc-media');
