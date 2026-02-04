-- 1. Prevent Name Spam
-- Limit names to 20 characters and restrict roles
alter table public.party_players 
add constraint name_length_check check (char_length(name) <= 20);

-- 2. Clean Up and Recycle Room Codes (while keeping analytics data)
-- This function frees up the 4-letter code but keeps the data for analytics using a UUID suffix
create or replace function cleanup_old_rooms()
returns void as $$
begin
  -- 'Archive' rooms that haven't been updated in 24 hours
  -- We append the timestamp to the code so the original 4-letter code is free to be reused
  update public.rooms
  set 
    room_code = room_code || '_' || extract(epoch from now())::text,
    phase = 'archived'
  where 
    updated_at < now() - interval '24 hours' 
    and phase != 'archived'
    and length(room_code) = 4; -- Only archive valid 4-letter codes
end;
$$ language plpgsql security definer;

-- 3. Fix Security Policy (Strict RLS)
-- Drop the overly permissive "allow public read"
drop policy if exists "Allow public read access" on public.party_players;

-- New Policy: You can only see players if...
-- A) You are checking your own record (needed for 'join' check)
-- B) You are IN the room yourself (needed for lobby view)
create policy "Allow read players in my rooms"
  on public.party_players for select
  using (
    -- Case A: It's me
    auth.uid() = player_id 
    or 
    -- Case B: I am present in this room
    exists (
      select 1 from public.party_players as presence 
      where presence.room_id = party_players.room_id 
      and presence.player_id = auth.uid()
    )
  );

-- 4. Analytics Query (Run this manually in Supabase SQL Editor whenever you want stats)
/*
  SELECT 
    DATE(joined_at) as game_date,
    COUNT(DISTINCT player_id) as total_players,
    COUNT(DISTINCT room_id) as total_games_played
  FROM public.party_players
  WHERE joined_at > now() - interval '3 days'
  GROUP BY DATE(joined_at)
  ORDER BY DATE(joined_at) DESC;
*/
