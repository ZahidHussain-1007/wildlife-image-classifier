# Animal Species Prediction

A learning-focused deep learning and computer vision project for classifying animal
images into ten Animals-10 dataset categories.

The project was built as a hands-on exploration of Convolutional Neural Networks
(CNNs), EfficientNetB3 transfer learning, image preprocessing, and AI inference workflows.
It includes a React frontend, a NestJS backend scaffold, and a Python FastAPI worker
that serves the trained model.

## Animal Classes

- Dog
- Cat
- Horse
- Spider
- Butterfly
- Chicken
- Sheep
- Cow
- Squirrel
- Elephant

## Tech Stack

- React + Vite + TailwindCSS
- NestJS backend scaffold
- Python FastAPI inference worker
- TensorFlow and Keras
- EfficientNetB3 transfer learning
- Supabase authentication and prediction history storage
- Docker and nginx for containerized frontend deployment

## Repository Structure

```text
src/app      React application
src/server   NestJS backend scaffold
src/lib      Shared frontend clients
worker       FastAPI model inference service
```

## Environment Setup

Copy the example environment file and fill in local values:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Required frontend variables:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_WORKER_API_URL=http://127.0.0.1:8000
```

Optional backend variables:

```env
PORT=3000
FRONTEND_URL=http://localhost:5173
WORKER_API_URL=http://127.0.0.1:8000
```

Never commit `.env`, Supabase `service_role` keys, database passwords, or Google
OAuth client secrets. Only the Supabase anon public key belongs in frontend
environment variables, and it should be protected with Row Level Security policies.

## Local Development

Install JavaScript dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Run the NestJS backend scaffold:

```bash
npm run server:dev
```

Run the Python worker:

```bash
cd worker
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Build Checks

Useful checks before deployment:

```bash
npm run build
npm run server:build
python -m compileall worker
docker compose config
```

Generated folders such as `dist/`, `node_modules/`, and Python `__pycache__/`
directories should not be committed.

## Docker Deployment

The project includes Docker support for the React frontend and FastAPI worker:

```bash
docker compose up --build
```

Then open:

```text
http://localhost:8080
```

The frontend container serves the Vite build with nginx and proxies `/worker`
requests to the Python worker container. In Docker Compose, `VITE_WORKER_API_URL`
is set to `/worker` at build time.

## Supabase Notes

Supabase is used for:

- Google OAuth login
- browser session management
- prediction history storage per authenticated user

Configure Google OAuth in the Supabase Dashboard under Authentication Providers.
For local development, use:

```text
Site URL: http://localhost:5173
Redirect URL: http://localhost:5173/auth/callback
```

If wildcard redirect URLs are enabled for local development, include:

```text
http://localhost:5173/**
```

## Prediction History Table

Run this in the Supabase SQL Editor if prediction history is enabled:

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

## Model

The trained model file is stored in `worker/models/model.keras` with matching
labels and config files. It is required by the FastAPI worker for local inference.

The final EfficientNetB3 transfer learning model achieved 98.20% test accuracy
on the Animals-10 dataset.
