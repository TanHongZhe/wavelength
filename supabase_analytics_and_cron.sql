-- ==========================================
-- WAVELENGTH ANALYTICS & MAINTENANCE SUITE
-- ==========================================

-- 1. ANALYTICS QUERY
-- Run this to get a comprehensive view of player activity over the last 3 days
-- It shows:
--   - Daily totals (Unique players, Games played)
--   - Top Players (by games joined)
--   - Total Rounds Played (sum of rounds across all rooms active in that period)

WITH DailyStats AS (
    SELECT 
        DATE(joined_at) as stat_date,
        COUNT(DISTINCT player_id) as daily_active_users,
        COUNT(DISTINCT room_id) as games_played
    FROM public.party_players
    WHERE joined_at > now() - interval '3 days'
    GROUP BY DATE(joined_at)
),
RoundsStats AS (
    SELECT 
        DATE(updated_at) as stat_date,
        SUM(round_number) as total_rounds_completed
    FROM public.rooms
    WHERE updated_at > now() - interval '3 days'
    GROUP BY DATE(updated_at)
)
SELECT 
    d.stat_date,
    d.daily_active_users,
    d.games_played,
    COALESCE(r.total_rounds_completed, 0) as total_rounds
FROM DailyStats d
LEFT JOIN RoundsStats r ON d.stat_date = r.stat_date
ORDER BY d.stat_date DESC;

-- Detailed Player Breakdown (Optional - Comment out if list is too long)

SELECT 
    p.name,
    COUNT(DISTINCT p.room_id) as games_joined,
    SUM(r.round_number) as estimated_rounds_played,
    MIN(p.joined_at) as first_seen_this_period
FROM public.party_players p
JOIN public.rooms r ON p.room_id = r.id
WHERE p.joined_at > now() - interval '3 days'
GROUP BY p.name
ORDER BY games_joined DESC
LIMIT 50;


-- ==========================================
-- 2. AUTOMATED CLEANUP (Requires pg_cron)
-- ==========================================

-- Enable the extension (Run this once)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule the cleanup function to run every night at 3:00 AM UTC
-- This function (cleanup_old_rooms) was defined in the previous step
-- It renames old room codes (ABCD -> ABCD_12345) so they can be reused
SELECT cron.schedule(
    'nightly-cleanup', -- Job name
    '0 3 * * *',       -- Cron schedule (3:00 AM daily)
    $$SELECT cleanup_old_rooms()$$
);

-- Check if the job is scheduled
-- SELECT * FROM cron.job;
