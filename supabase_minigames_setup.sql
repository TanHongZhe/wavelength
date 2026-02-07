-- Mini Games Database Setup for Supabase
-- Run this SQL in your Supabase SQL Editor

-- The mini games reuse the existing 'rooms' table structure
-- This works because the rooms table already has all required fields:
-- - room_code: 4-letter code
-- - psychic_id: Used as player1_id
-- - guesser_id: Used as player2_id  
-- - player1_name, player1_avatar, player2_name, player2_avatar
-- - phase: waiting/clue/ended
-- - game_mode: Used to mark mini games (e.g., 'mini_rapid_fire')

-- Add game_mode column if it doesn't exist (allows us to differentiate mini games from main game)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'rooms' AND column_name = 'game_mode'
    ) THEN
        ALTER TABLE rooms ADD COLUMN game_mode text DEFAULT 'classic';
    END IF;
END $$;

-- Ensure RLS policies allow the operations needed for mini games
-- The existing policies for 'rooms' should work, but here's what's needed:

-- 1. Allow users to create rooms (INSERT)
-- 2. Allow users to join rooms (UPDATE when adding guesser_id)
-- 3. Allow reading room data (SELECT for polling)
-- 4. Allow updating phase (UPDATE for starting/ending game)

-- Check existing policies
-- SELECT * FROM pg_policies WHERE tablename = 'rooms';

-- If you need to add/update policies, the existing ones should work.
-- The mini games use the same authentication pattern as the main game.

-- That's it! The mini games are now ready to use with your existing table structure.
