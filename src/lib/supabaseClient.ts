// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Kredensial Supabase tidak ditemukan. Pastikan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY sudah diisi di file .env.local'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;