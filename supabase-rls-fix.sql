-- Fix RLS policies for all tables used by the admin panel
-- Allow all operations with anon key (same pattern as other tables)

ALTER TABLE championships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON championships FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE player_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON player_submissions FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE media_gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON media_gallery FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;  
CREATE POLICY "Allow all" ON certificates FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE membership_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON membership_plans FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE membership_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON membership_submissions FOR ALL USING (true) WITH CHECK (true);
