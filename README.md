# Photo Album

Photo album app built with React + Vite.

## Shared sync across users

By default, the app stores photos in local browser storage (`localStorage`).

To let multiple users open the same deployed link and see newly added/removed photos in real time, configure Supabase Realtime.

### 1. Create Supabase project

Create a project at https://supabase.com and copy:

- `Project URL`
- `anon public key`

### 2. Create `photos` table

Run this SQL in Supabase SQL Editor:

```sql
create table if not exists public.photos (
	id text primary key,
	src text not null,
	created_at bigint not null
);

alter table public.photos enable row level security;

create policy "Allow read photos"
on public.photos
for select
to anon
using (true);

create policy "Allow insert photos"
on public.photos
for insert
to anon
with check (true);

create policy "Allow delete photos"
on public.photos
for delete
to anon
using (true);
```

Then enable Realtime for this table in Supabase dashboard.

### 3. Configure environment

Copy `.env.example` to `.env` and fill values:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run app

```bash
npm install
npm run dev
```

If env vars are missing, app still works in local-only mode.
