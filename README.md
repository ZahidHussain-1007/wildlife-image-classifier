# Animal Species Prediction

A student-friendly wildlife image classifier project with:

- React + Vite frontend
- NestJS backend scaffold
- Python FastAPI worker for model inference
- Supabase authentication and prediction history storage

## Project Architecture

### Frontend

The frontend lives in `src/app`.

It handles:

- Google login with Supabase
- protected pages
- image upload UI
- wildlife prediction requests to the Python worker
- saving prediction history to Supabase

Run it with:

```bash
npm run dev
```

### NestJS Backend

The backend scaffold lives in `src/server`.

It currently contains simple modules for:

- health checks
- auth placeholder routes
- users placeholder routes
- prediction placeholder routes

Run it with:

```bash
npm run server:dev
```

### Python Worker

The worker lives in `worker`.

It handles Python model inference:

- loading the trained model
- preprocessing uploaded images
- returning real predictions

Run it with:

```bash
cd worker
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Do not put frontend authentication logic in the worker.

### Supabase

Supabase is used for:

- Google OAuth login
- storing authenticated user sessions in the browser
- saving prediction history per logged-in user

The Supabase client is configured in:

```text
src/lib/supabase.ts
```

## Environment Variables

Create a local `.env` file in the project root:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_WORKER_API_URL=http://127.0.0.1:8000
```

You can copy `.env.example`:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### Where To Get Supabase Credentials

In your Supabase project:

1. Open Supabase Dashboard.
2. Go to Project Settings.
3. Open API.
4. Copy:
   - Project URL into `VITE_SUPABASE_URL`
   - anon public key into `VITE_SUPABASE_ANON_KEY`

The anon public key is safe to use in frontend code. It is still protected by Supabase Row Level Security policies.

NEVER commit `.env`.

Never share or commit:

- `.env`
- Supabase `service_role` key
- database passwords
- Google OAuth client secret

Important: the `service_role` key bypasses Row Level Security. It must NEVER be used in the frontend.

## Setup For Teammates

1. Clone the repo:

```bash
git clone <repo-url>
cd wildlife-image-classifier
```

2. Install dependencies:

```bash
npm install
```

3. Create your local `.env` file:

```bash
cp .env.example .env
```

4. Add your Supabase values to `.env`.

5. Run the frontend:

```bash
npm run dev
```

6. Run the NestJS backend in another terminal:

```bash
npm run server:dev
```

## Supabase Google OAuth Setup

In Supabase Dashboard:

1. Go to Authentication.
2. Open Providers.
3. Enable Google.
4. Add your Google OAuth Client ID and Client Secret.

In Google Cloud Console, make sure the authorized redirect URI includes your Supabase callback URL. Supabase shows this URL inside the Google provider setup page.

In Supabase Authentication URL Configuration:

Site URL:

```text
http://localhost:5173
```

Redirect URLs:

```text
http://localhost:5173/**
```

At minimum, include:

```text
http://localhost:5173/auth/callback
```

## Prediction History SQL

Run this in Supabase Dashboard -> SQL Editor -> New query:

```sql
create table if not exists public.prediction_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  image text,
  predicted_animal text not null,
  confidence numeric not null check (confidence >= 0 and confidence <= 100),
  created_at timestamptz not null default now()
);

alter table public.prediction_history enable row level security;

create policy "Users can read their own predictions"
on public.prediction_history
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own predictions"
on public.prediction_history
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can delete their own predictions"
on public.prediction_history
for delete
to authenticated
using (auth.uid() = user_id);
```

## Troubleshooting

### Google Provider Not Enabled

If Google login does not open or Supabase reports that the provider is disabled, check:

- Supabase Dashboard -> Authentication -> Providers
- Google is enabled
- Client ID and Client Secret are saved

### `redirect_uri_mismatch`

This usually means Google Cloud or Supabase redirect URLs do not match.

Check:

- Google Cloud authorized redirect URI matches the callback URL shown by Supabase
- Supabase Site URL is `http://localhost:5173`
- Supabase Redirect URLs include `http://localhost:5173/**`

### Missing Environment Variables

If the app shows a missing Supabase environment error:

- confirm `.env` exists in the project root
- confirm variables start with `VITE_`
- restart the Vite dev server after editing `.env`

Correct names:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_WORKER_API_URL=http://127.0.0.1:8000
```

## Docker Deployment

The project includes Docker support for the React frontend and the Python FastAPI worker.

For local Docker deployment:

```bash
docker compose up --build
```

Then open:

```text
http://localhost:8080
```

The frontend container serves the built Vite app with nginx and proxies prediction requests from `/worker` to the Python worker container. The worker stays on Docker's internal network, so it will not conflict with a local process already using port `8000`.

Before building, make sure `.env` contains your Supabase values. In Docker Compose, `VITE_WORKER_API_URL` is set to `/worker` at build time so browser requests go through nginx.

Useful checks:

```bash
npm run build
npx tsc --noEmit
npm run server:build
python -m compileall worker
docker compose config
```

### Auth Session Issues

If login succeeds but the app does not continue:

- confirm `/auth/callback` is allowed in Supabase Redirect URLs
- clear browser site data for `localhost:5173`
- restart the dev server
- check the browser console for Supabase errors

The app restores sessions using `supabase.auth.getSession()` and listens for auth changes with `supabase.auth.onAuthStateChange(...)`.
