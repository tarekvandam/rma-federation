-- Phase D: photo gallery table (images hosted on Cloudinary, only the link is stored).
-- Same pattern as course_coaches: everyone reads, only the admin writes.
create table if not exists public.gallery_images (
  id bigint generated always as identity primary key,
  image_url text not null check (image_url ~ '^https://' and char_length(image_url) <= 1000),
  caption text not null default '' check (char_length(caption) <= 200),
  created_at timestamptz not null default now()
);
alter table public.gallery_images enable row level security;
create policy "public read" on public.gallery_images for select to anon, authenticated using (true);
create policy "admin write" on public.gallery_images for all to authenticated
  using (lower(auth.jwt() ->> 'email') = 'eng.tarek.sayed@gmail.com')
  with check (lower(auth.jwt() ->> 'email') = 'eng.tarek.sayed@gmail.com');
revoke all on public.gallery_images from anon;
grant select on public.gallery_images to anon;
revoke truncate, references, trigger on public.gallery_images from authenticated;
