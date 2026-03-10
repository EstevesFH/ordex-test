import { createClient } from '@supabase/supabase-js'

const fallbackUrl = 'https://example.supabase.co'
const fallbackAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || fallbackUrl
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || fallbackAnonKey

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase env não configurado. Usando cliente fallback para ambiente local.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
