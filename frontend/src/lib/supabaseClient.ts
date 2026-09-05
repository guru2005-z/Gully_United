import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nijnyazwxluscfcpsymj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pam55YXp3eGx1c2NmY3BzeW1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyOTAxMzgsImV4cCI6MjA1Njg2NjEzOH0.dummy_anon_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
