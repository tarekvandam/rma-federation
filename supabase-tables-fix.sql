-- Create missing tables
CREATE TABLE IF NOT EXISTS membership_plans (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  price_en TEXT NOT NULL,
  price_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  features_en JSONB DEFAULT '[]'::jsonb,
  features_ar JSONB DEFAULT '[]'::jsonb,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS membership_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  plan TEXT NOT NULL,
  message TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on new tables
ALTER TABLE membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies before creating (safe re-run)
DROP POLICY IF EXISTS "Allow all" ON membership_plans;
CREATE POLICY "Allow all" ON membership_plans FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all" ON membership_submissions;
CREATE POLICY "Allow all" ON membership_submissions FOR ALL USING (true) WITH CHECK (true);

-- Ensure RLS policies exist on all other tables (safe re-run)
DO $$
DECLARE
  tables text[] := ARRAY['news','media_gallery','media_videos','championships','player_submissions','certificates','countries','trainers','rankings'];
  t text;
BEGIN
  FOREACH t IN ARRAY tables
  LOOP
    BEGIN
      EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', t);
      EXECUTE format('DROP POLICY IF EXISTS "Allow all" ON %I;', t);
      EXECUTE format('CREATE POLICY "Allow all" ON %I FOR ALL USING (true) WITH CHECK (true);', t);
    EXCEPTION WHEN undefined_table THEN
      RAISE NOTICE 'Table % does not exist, skipping', t;
    END;
  END LOOP;
END;
$$;
