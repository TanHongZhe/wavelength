-- ============================================
-- WAVELENGTH FEEDBACK TABLE SETUP
-- Run this SQL in your Supabase SQL Editor
-- ============================================

-- Create the feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  category TEXT NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_hash TEXT -- Optional: For rate limiting (hashed for privacy)
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_category ON feedback(category);

-- Enable Row Level Security (RLS)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous users to insert feedback
-- (This is safe because we're only allowing inserts, not reads)
CREATE POLICY "Allow anonymous feedback submissions" 
  ON feedback
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated service role can read/manage feedback
-- (You can view feedback in Supabase dashboard or via service role key)
CREATE POLICY "Service role can read feedback" 
  ON feedback
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can delete feedback" 
  ON feedback
  FOR DELETE
  TO service_role
  USING (true);

-- ============================================
-- OPTIONAL: Additional Rate Limiting Function
-- ============================================
-- This function can be used server-side for additional protection
-- Currently, client-side rate limiting is implemented

CREATE OR REPLACE FUNCTION check_feedback_rate_limit(p_ip_hash TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO recent_count
  FROM feedback
  WHERE ip_hash = p_ip_hash
    AND created_at > NOW() - INTERVAL '1 hour';
  
  -- Max 5 submissions per hour per IP
  RETURN recent_count < 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- USEFUL QUERIES FOR REVIEWING FEEDBACK
-- ============================================

-- View all feedback (run in Supabase SQL Editor):
-- SELECT * FROM feedback ORDER BY created_at DESC;

-- View feedback by category:
-- SELECT * FROM feedback WHERE category = 'bug' ORDER BY created_at DESC;

-- Count feedback by category:
-- SELECT category, COUNT(*) as count FROM feedback GROUP BY category;

-- Average rating:
-- SELECT AVG(rating) as avg_rating FROM feedback WHERE rating IS NOT NULL;

-- Recent feedback (last 7 days):
-- SELECT * FROM feedback WHERE created_at > NOW() - INTERVAL '7 days' ORDER BY created_at DESC;
