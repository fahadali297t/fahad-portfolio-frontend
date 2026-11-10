
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

// Keep public pages renderable in preview/development environments where the
// optional guestbook credentials have not been supplied yet.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-anon-key',
  isSupabaseConfigured ? undefined : { auth: { persistSession: false, autoRefreshToken: false } },
);
