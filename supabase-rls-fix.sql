-- Fix RLS policies for existing tables
ALTER TABLE championships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON championships FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE player_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON player_submissions FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE media_gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON media_gallery FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;  
CREATE POLICY "Allow all" ON certificates FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE rankings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON rankings FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON trainers FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON countries FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON news FOR ALL USING (true) WITH CHECK (true);
