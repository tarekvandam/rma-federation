-- Rollback of Phase B: puts back exactly the policies that existed before (open access).
drop policy if exists "public insert" on public.membership_submissions;
drop policy if exists "admin all" on public.membership_submissions;
create policy "Allow all" on public.membership_submissions for all to public using (true) with check (true);
grant all on public.membership_submissions to anon;
drop trigger if exists membership_rate_brake on public.membership_submissions;

drop policy if exists "public read" on public.player_submissions;
drop policy if exists "admin write" on public.player_submissions;
create policy "Allow all" on public.player_submissions for all to public using (true) with check (true);
grant all on public.player_submissions to anon;

drop policy if exists "admin all news-images" on storage.objects;
drop policy if exists "visitors upload player photos" on storage.objects;
create policy "anon_insert_news_images" on storage.objects for insert to anon with check (bucket_id = 'news-images');
create policy "anon_select_news_images" on storage.objects for select to anon using (bucket_id = 'news-images');
create policy "anon_upload_news_images" on storage.objects for insert to anon with check (bucket_id = 'news-images');
create policy "anon_view_news_images" on storage.objects for select to anon using (bucket_id = 'news-images');
create policy "anon_all" on storage.objects for all to anon using (bucket_id = 'news-images') with check (bucket_id = 'news-images');
create policy "allow_all_news_images" on storage.objects for all to public using (bucket_id = 'news-images') with check (bucket_id = 'news-images');
create policy "anon_upload_news 1wjj44y_0" on storage.objects for insert to anon with check (bucket_id = 'news-images');
create policy "anon_view_news 1wjj44y_0" on storage.objects for select to anon using (bucket_id = 'news-images');
update storage.buckets set file_size_limit = null, allowed_mime_types = null where id = 'news-images';
-- the new functions can stay (harmless); to remove: drop function public.create_player_submission(text,text,text,text,jsonb); drop function public.get_player_for_edit(uuid); drop function public.update_player_public(uuid,text,text,text,text,jsonb); drop function public.membership_rate_brake();
