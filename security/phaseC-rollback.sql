-- Undo Phase C: gives the old (wide) rights back. RLS policies still protect the data.
grant insert, update, delete, truncate, references, trigger on
  public.certificates, public.championships, public.countries, public.course_coaches,
  public.media_gallery, public.media_videos, public.membership_plans, public.news,
  public.rankings, public.trainers to anon;
grant truncate, references, trigger on
  public.certificates, public.championships, public.countries, public.course_coaches,
  public.media_gallery, public.media_videos, public.membership_plans, public.news,
  public.rankings, public.trainers, public.membership_submissions, public.player_submissions to authenticated;
