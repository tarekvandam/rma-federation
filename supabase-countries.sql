CREATE TABLE countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL,
  trainer_name text NOT NULL,
  flag text,
  landline text DEFAULT '',
  mobile text DEFAULT '',
  email text DEFAULT '',
  address text DEFAULT '',
  fax text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON countries FOR SELECT USING (true);
CREATE POLICY "Admin insert" ON countries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin update" ON countries FOR UPDATE USING (true);
CREATE POLICY "Admin delete" ON countries FOR DELETE USING (true);
