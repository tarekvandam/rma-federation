CREATE TABLE player_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image text DEFAULT '',
  belt_color text NOT NULL,
  date_obtained text DEFAULT '',
  promotions jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE player_submissions DISABLE ROW LEVEL SECURITY;
