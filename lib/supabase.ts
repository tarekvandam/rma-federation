import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

// Headers for admin-only storage uploads: uses the logged-in admin's session
// (the public key alone is no longer allowed to write to the news-images bucket).
export async function adminHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token || supabaseKey;
  return { apikey: supabaseKey, Authorization: `Bearer ${token}` };
}
