-- Safely create RLS policies (drop if exists first)
DO $$
DECLARE
  tables text[] := ARRAY['championships','player_submissions','media_gallery','certificates','rankings','trainers','countries','news'];
  t text;
BEGIN
  FOREACH t IN ARRAY tables
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', t);
    BEGIN
      EXECUTE format('DROP POLICY IF EXISTS "Allow all" ON %I;', t);
      EXECUTE format('CREATE POLICY "Allow all" ON %I FOR ALL USING (true) WITH CHECK (true);', t);
    EXCEPTION WHEN undefined_table THEN
      RAISE NOTICE 'Table % does not exist, skipping', t;
    END;
  END LOOP;
END;
$$;
