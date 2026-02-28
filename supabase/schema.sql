-- visaAI Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (mirrors Supabase auth.users with extra fields)
create table if not exists public.users (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  created_at timestamp with time zone default now(),
  stripe_customer_id text
);

-- Screening sessions table
create table if not exists public.screening_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete set null,
  created_at timestamp with time zone default now(),
  status text not null default 'in_progress' check (status in ('in_progress', 'completed')),
  intake_responses jsonb,
  ai_report jsonb,
  destination_country text,
  purpose text,
  is_premium boolean default false
);

-- Visa database table
create table if not exists public.visa_database (
  id uuid default uuid_generate_v4() primary key,
  country text not null,
  visa_name text not null,
  visa_code text not null unique,
  category text not null,
  description text,
  requirements jsonb,
  processing_time text,
  cost_usd integer,
  official_url text,
  last_updated date default current_date
);

-- Payments table
create table if not exists public.payments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete set null,
  session_id uuid references public.screening_sessions(id) on delete cascade,
  stripe_payment_intent_id text not null unique,
  amount integer not null,
  status text not null,
  created_at timestamp with time zone default now()
);

-- Row Level Security
alter table public.users enable row level security;
alter table public.screening_sessions enable row level security;
alter table public.payments enable row level security;
alter table public.visa_database enable row level security;

-- RLS Policies
-- Users can read/update their own record
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

-- Sessions: users see their own; anonymous sessions are service-role only
create policy "Users can view own sessions" on public.screening_sessions
  for select using (auth.uid() = user_id);

create policy "Anyone can insert sessions" on public.screening_sessions
  for insert with check (true);

-- Visa database is public read
create policy "Visa database is public" on public.visa_database
  for select using (true);

-- Payments: users see their own
create policy "Users can view own payments" on public.payments
  for select using (auth.uid() = user_id);

-- Auto-create user profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
