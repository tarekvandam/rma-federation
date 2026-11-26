-- Undo Phase D: removes the gallery table (and the links stored in it; the images on Cloudinary are untouched).
drop table if exists public.gallery_images;
