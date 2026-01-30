-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Create a table for party mode players
create table public.party_players (
  id uuid default uuid_generate_v4() primary key,
  room_id uuid references public.rooms(id) on delete cascade not null,
  player_id uuid not null,
  name text not null,
  avatar text not null,
  role text not null check (role in ('psychic', 'guesser')),
  score int default 0,
  guess_angle numeric, -- Stores their locked-in guess
  locked_in boolean default false,
  joined_at timestamptz default now()
);

-- Add a generic 'mode' column to rooms to distinguish between classic (1v1) and party (multi)
-- Alternatively, we can just infer it, but adding a column is cleaner.
-- For now, we will just use the existence of records in party_players to denote party mode,
-- OR we can add a 'game_mode' column to 'rooms'.
alter table public.rooms 
add column if not exists game_mode text default 'classic'; 
-- 'classic' or 'party'

-- Enable RLS (Row Level Security)
alter table public.party_players enable row level security;

-- Policy: Anyone can read players in a room they know the ID of (simplification)
create policy "Allow public read access"
  on public.party_players for select
  using (true);

-- Policy: Anyone can insert (create) themselves as a player
create policy "Allow public insert access"
  on public.party_players for insert
  with check (true);

-- Policy: Players can update their own record (matching player_id)
create policy "Allow update own record"
  on public.party_players for update
  using (auth.uid() = player_id);

-- Policy: Delete? maybe not needed for MVP
