-- Run this in Supabase Dashboard > SQL Editor

CREATE TABLE IF NOT EXISTS membership_plans (
  id BIGSERIAL PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  price_en TEXT NOT NULL,
  price_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  features_en TEXT[] NOT NULL,
  features_ar TEXT[] NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS membership_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  plan TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE membership_plans DISABLE ROW LEVEL SECURITY;
ALTER TABLE membership_submissions DISABLE ROW LEVEL SECURITY;

-- Seed default plans
INSERT INTO membership_plans (name_en, name_ar, price_en, price_ar, description_en, description_ar, features_en, features_ar, sort_order)
VALUES
  ('Warrior', 'محارب', '$49/mo', '$49/شهر', 'Essential access for emerging fighters and disciplined students.', 'الوصول الأساسي للرياضيين الصاعدين والطلاب المنضبطين.',
   ARRAY['Weekly technique lessons', 'Community training guides', 'Member newsletter'],
   ARRAY['دروس تقنية أسبوعية', 'أدلة تدريب المجتمع', 'نشرة الأعضاء'], 1),
  ('Champion', 'بطل', '$89/mo', '$89/شهر', 'Advanced support for competitors and serious martial artists.', 'دعم متقدم للمنافسين وفناني القتال الجادين.',
   ARRAY['Live coaching sessions', 'Event priority entry', 'Tactical fight analysis'],
   ARRAY['جلسات تدريب مباشرة', 'أولوية دخول الفعاليات', 'تحليل القتال التكتيكي'], 2),
  ('Elite', 'نخبة', '$149/mo', '$149/شهر', 'Full federation integration for elite athletes and trainers.', 'اندماج كامل في الاتحاد للرياضيين والمدربين النخبة.',
   ARRAY['One-on-one coaching', 'Access to elite mastermind', 'Custom training plans'],
   ARRAY['تدريب فردي', 'الوصول إلى مجموعة النخبة', 'خطط تدريب مخصصة'], 3);
