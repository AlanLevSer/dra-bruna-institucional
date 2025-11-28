import { createClient, SupabaseClient } from '@supabase/supabase-js';

const EXTERNAL_SUPABASE_URL = import.meta.env.VITE_EXTERNAL_SUPABASE_URL;
const EXTERNAL_SUPABASE_ANON_KEY = import.meta.env.VITE_EXTERNAL_SUPABASE_ANON_KEY;

// Graceful degradation: only create client if env vars are present
let externalSupabaseInstance: SupabaseClient | null = null;

if (EXTERNAL_SUPABASE_URL && EXTERNAL_SUPABASE_ANON_KEY) {
  externalSupabaseInstance = createClient(
    EXTERNAL_SUPABASE_URL,
    EXTERNAL_SUPABASE_ANON_KEY,
    {
      auth: {
        storage: localStorage,
        persistSession: true,
        autoRefreshToken: true,
      },
    }
  );
} else {
  console.warn('External Supabase not configured - tracking will be disabled');
}

export const externalSupabase = externalSupabaseInstance;
