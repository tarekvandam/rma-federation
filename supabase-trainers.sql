-- Add columns for full trainer profile data
ALTER TABLE trainers ADD COLUMN IF NOT EXISTS years_experience INTEGER DEFAULT 0;
ALTER TABLE trainers ADD COLUMN IF NOT EXISTS certifications JSONB DEFAULT '[]'::jsonb;
