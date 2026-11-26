-- Phase C: visitors (anon) keep only what the site needs. Run once.
-- Public tables: read-only for anon. membership_submissions: insert only (unchanged).
-- Nobody (anon or logged-in) needs TRUNCATE / REFERENCES / TRIGGER from the website.
revoke insert, update, delete, truncate, references, trigger on
  public.certificates, public.championships, public.countries, public.course_coaches,
  public.media_gallery, public.media_videos, public.membership_plans, public.news,
  public.rankings, public.trainers from anon;
revoke truncate, references, trigger on
  public.certificates, public.championships, public.countries, public.course_coaches,
  public.media_gallery, public.media_videos, public.membership_plans, public.news,
  public.rankings, public.trainers, public.membership_submissions, public.player_submissions from authenticated;
