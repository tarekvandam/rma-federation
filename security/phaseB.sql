-- ============================================================
-- RMA Phase B lock-down (membership_submissions, player_submissions,
-- news-images storage bucket).  Admin = eng.tarek.sayed@gmail.com
-- Safe order: STEP 1 (functions) -> deploy new site code -> STEP 2 (lock-down)
-- ============================================================

-- ---------- STEP 1: new functions (additive, change nothing by themselves) ----------
create or replace function public.create_player_submission(
  p_name text, p_image text, p_belt text, p_date text, p_promos jsonb)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_promos jsonb := '[]'::jsonb; e jsonb;
begin
  if p_name is null or char_length(btrim(p_name)) not between 1 and 100 then raise exception 'invalid name'; end if;
  if p_belt is null or char_length(p_belt) not between 1 and 40 then raise exception 'invalid belt'; end if;
  if char_length(coalesce(p_date,'')) > 30 then raise exception 'invalid date'; end if;
  if coalesce(p_image,'') <> '' and p_image not like 'https://bqedictvigmpxscbjboq.supabase.co/storage/v1/object/public/news-images/%' then raise exception 'invalid image'; end if;
  if (select count(*) from player_submissions where created_at > now() - interval '1 minute') >= 20 then raise exception 'too many submissions, try again later'; end if;
  if p_promos is not null and jsonb_typeof(p_promos) = 'array' then
    if jsonb_array_length(p_promos) > 40 then raise exception 'too many promotions'; end if;
    for e in select * from jsonb_array_elements(p_promos) loop
      v_promos := v_promos || jsonb_build_array(jsonb_build_object('belt', left(e->>'belt',40), 'date', left(coalesce(e->>'date',''),30)));
    end loop;
  end if;
  insert into player_submissions(name, image, belt_color, date_obtained, promotions)
  values (btrim(p_name), coalesce(p_image,''), p_belt, coalesce(p_date,''), v_promos)
  returning id into v_id;
  return v_id;
end $$;

create or replace function public.get_player_for_edit(p_id uuid)
returns table(name text, belt_color text, date_obtained text, image text, promotions jsonb)
language sql security definer set search_path = public as $$
  select name, belt_color, date_obtained, image, promotions from player_submissions where id = p_id;
$$;

create or replace function public.update_player_public(
  p_id uuid, p_name text, p_belt text, p_date text, p_image text, p_promos jsonb)
returns boolean language plpgsql security definer set search_path = public as $$
declare v_old jsonb; v_new jsonb := '[]'::jsonb; e jsonb; o jsonb; v_flag boolean; v_found boolean;
begin
  select promotions into v_old from player_submissions where id = p_id;
  if not found then raise exception 'not found'; end if;
  if p_name is null or char_length(btrim(p_name)) not between 1 and 100 then raise exception 'invalid name'; end if;
  if p_belt is null or char_length(p_belt) not between 1 and 40 then raise exception 'invalid belt'; end if;
  if char_length(coalesce(p_date,'')) > 30 then raise exception 'invalid date'; end if;
  if coalesce(p_image,'') <> '' and p_image not like 'https://bqedictvigmpxscbjboq.supabase.co/storage/v1/object/public/news-images/%' then raise exception 'invalid image'; end if;
  if p_promos is not null and jsonb_typeof(p_promos) = 'array' then
    if jsonb_array_length(p_promos) > 40 then raise exception 'too many promotions'; end if;
    for e in select * from jsonb_array_elements(p_promos) loop
      v_found := false; v_flag := false;
      for o in select * from jsonb_array_elements(coalesce(v_old,'[]'::jsonb)) loop
        if o->>'belt' = e->>'belt' and coalesce(o->>'date','') = coalesce(e->>'date','') then
          v_found := true;
          v_flag := coalesce((o->>'approved')::boolean, true);   -- keep the admin's decision
          exit;
        end if;
      end loop;
      v_new := v_new || jsonb_build_array(jsonb_build_object('belt', left(e->>'belt',40), 'date', left(coalesce(e->>'date',''),30), 'approved', case when v_found then v_flag else false end));
    end loop;
  end if;
  update player_submissions set name = btrim(p_name), belt_color = p_belt, date_obtained = coalesce(p_date,''),
         image = coalesce(p_image,''), promotions = v_new where id = p_id;
  return true;
end $$;

revoke all on function public.create_player_submission(text,text,text,text,jsonb) from public;
revoke all on function public.get_player_for_edit(uuid) from public;
revoke all on function public.update_player_public(uuid,text,text,text,text,jsonb) from public;
grant execute on function public.create_player_submission(text,text,text,text,jsonb) to anon, authenticated;
grant execute on function public.get_player_for_edit(uuid) to anon, authenticated;
grant execute on function public.update_player_public(uuid,text,text,text,text,jsonb) to anon, authenticated;

-- spam brake for the membership form (max 30 rows per minute, whole site)
create or replace function public.membership_rate_brake() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from membership_submissions where created_at > now() - interval '1 minute') >= 30 then
    raise exception 'too many submissions, try again later';
  end if;
  return new;
end $$;
drop trigger if exists membership_rate_brake on public.membership_submissions;
create trigger membership_rate_brake before insert on public.membership_submissions
  for each row execute function public.membership_rate_brake();

-- ---------- STEP 2: lock-down ----------
-- membership_submissions: visitors may only INSERT (size-checked). Only admin reads/edits/deletes.
drop policy if exists "Allow all" on public.membership_submissions;
create policy "public insert" on public.membership_submissions for insert to anon, authenticated
  with check (char_length(btrim(name)) between 1 and 120 and char_length(email) between 3 and 200
              and email like '%@%' and char_length(coalesce(message,'')) <= 3000 and char_length(coalesce(plan,'')) <= 200);
create policy "admin all" on public.membership_submissions for all to authenticated
  using (lower(auth.jwt() ->> 'email') = 'eng.tarek.sayed@gmail.com')
  with check (lower(auth.jwt() ->> 'email') = 'eng.tarek.sayed@gmail.com');
revoke all on public.membership_submissions from anon;
grant insert on public.membership_submissions to anon;

-- player_submissions: visitors can only read the public columns (NOT the id), no direct write.
drop policy if exists "Allow all" on public.player_submissions;
create policy "public read" on public.player_submissions for select to anon, authenticated using (true);
create policy "admin write" on public.player_submissions for all to authenticated
  using (lower(auth.jwt() ->> 'email') = 'eng.tarek.sayed@gmail.com')
  with check (lower(auth.jwt() ->> 'email') = 'eng.tarek.sayed@gmail.com');
revoke all on public.player_submissions from anon;
grant select (name, image, belt_color, date_obtained, promotions, status, created_at) on public.player_submissions to anon;

-- storage: news-images
drop policy if exists "anon_insert_news_images" on storage.objects;
drop policy if exists "anon_select_news_images" on storage.objects;
drop policy if exists "anon_upload_news_images" on storage.objects;
drop policy if exists "anon_view_news_images" on storage.objects;
drop policy if exists "anon_all" on storage.objects;
drop policy if exists "allow_all_news_images" on storage.objects;
drop policy if exists "anon_upload_news 1wjj44y_0" on storage.objects;
drop policy if exists "anon_view_news 1wjj44y_0" on storage.objects;
create policy "admin all news-images" on storage.objects for all to authenticated
  using (bucket_id = 'news-images' and lower(auth.jwt() ->> 'email') = 'eng.tarek.sayed@gmail.com')
  with check (bucket_id = 'news-images' and lower(auth.jwt() ->> 'email') = 'eng.tarek.sayed@gmail.com');
create policy "visitors upload player photos" on storage.objects for insert to anon
  with check (bucket_id = 'news-images' and name ~ '^player_[0-9]{10,16}\.(jpg|jpeg|png|webp)$');
update storage.buckets set file_size_limit = 8388608,
  allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif','image/avif'] where id = 'news-images';
