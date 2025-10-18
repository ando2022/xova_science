-- XOVA Landing Page Database Setup
-- Run this in Supabase SQL Editor

-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    source VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create votes table
CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    blend VARCHAR(100) NOT NULL,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_source ON waitlist(source);
CREATE INDEX IF NOT EXISTS idx_votes_email ON votes(email);
CREATE INDEX IF NOT EXISTS idx_votes_blend ON votes(blend);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public inserts (for the landing page)
CREATE POLICY "Allow public inserts on waitlist" ON waitlist
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public inserts on votes" ON votes
    FOR INSERT WITH CHECK (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON waitlist TO anon;
GRANT ALL ON votes TO anon;
GRANT ALL ON waitlist TO authenticated;
GRANT ALL ON votes TO authenticated;

-- Grant sequence permissions
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;