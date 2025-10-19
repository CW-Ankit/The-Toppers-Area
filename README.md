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
  user_id uuid references auth.users(id) on delete cascade,
  percent int not null default 0,
  created_at timestamp with time zone default now()
);

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

Note: When inserting from the client, include `user_id: (await supabase.auth.getUser()).data.user?.id` via database triggers or Row Level Security with `auth.uid()` default. Simplest is to create Postgres function/trigger to fill `user_id`.

## Theme

- Light: white/zinc with accents of light blue (#60A5FA) and subtle gold for highlights
- Dark: zinc 900 background with blue/gold accents

## Routes

- / : Landing page
- /(auth)/sign-in, /(auth)/sign-up
- /(protected) and tools under it: /todo, /pomodoro, /progress, /notes
