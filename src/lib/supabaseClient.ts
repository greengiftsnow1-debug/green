import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,         // Do NOT persist session between reloads
    autoRefreshToken: false,       // DO NOT auto-refresh access token
    detectSessionInUrl: false,     // Prevents Supabase from checking for token in URL
  },
});
