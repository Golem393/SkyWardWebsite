-- Skyward — extend the existing `profiles` table with subscription state,
-- lock it down with row-level security, and auto-create a profile row on signup.
--
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query).
-- Safe to re-run: every statement is guarded.

-- 1. Subscription columns -----------------------------------------------------
alter table public.profiles
  add column if not exists plan text,                       -- 'monthly' | 'yearly'
  add column if not exists subscription_status text not null default 'inactive', -- inactive | active | canceled | past_due
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_subscription_id text,
  add column if not exists current_period_end timestamptz;

-- 2. Row-level security -------------------------------------------------------
-- The frontend uses the anon key, so users may only read/update their own row.
-- The backend webhook uses the service-role key, which bypasses RLS entirely.
alter table public.profiles enable row level security;

drop policy if exists "own profile read" on public.profiles;
create policy "own profile read"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "own profile write" on public.profiles;
create policy "own profile write"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 3. Auto-create a profile row on signup -------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
