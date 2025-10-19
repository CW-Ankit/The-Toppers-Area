# The Toppers' Area

A calm, minimal self-study platform built with Next.js 14, TypeScript, Tailwind CSS, Supabase, and shadcn/ui.

## Quick start

1. Create a Supabase project and copy the Project URL and anon public key.
2. In the project root, create `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Install deps and run dev

```
yarn
yarn dev
```

## Database tables (SQL)

Recommended minimal tables:

```sql
-- Enable pgcrypto for gen_random_uuid
create extension if not exists pgcrypto;

-- Todos
create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  done boolean not null default false,
  created_at timestamp with time zone default now()
);

-- Notes
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now()
);

-- Progress (one row per user)
create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  percent int not null default 0,
  created_at timestamp with time zone default now()
);

-- Unique index to allow upsert on user_id
create unique index if not exists progress_user_idx on public.progress(user_id);

-- RLS policies
alter table public.todos enable row level security;
alter table public.notes enable row level security;
alter table public.progress enable row level security;

create policy "Users can manage their todos" on public.todos
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can manage their notes" on public.notes
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage their progress" on public.progress
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

## Theme

- Light: white/zinc with accents of light blue (#60A5FA) and subtle gold (#F59E0B)
- Dark: zinc 900 background with blue/gold accents

## Routes

- / : Landing page
- /(auth)/sign-in, /(auth)/sign-up
- /protected and tools under it: /protected/todo, /protected/pomodoro, /protected/progress, /protected/notes
