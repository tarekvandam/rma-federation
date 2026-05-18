CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id TEXT UNIQUE NOT NULL,
  holder_name TEXT NOT NULL,
  belt TEXT NOT NULL,
  issue_date DATE NOT NULL,
  trainer TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_certificates_certificate_id ON certificates (certificate_id);
