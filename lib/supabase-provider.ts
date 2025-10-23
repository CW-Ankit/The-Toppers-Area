// lib/supabase-provider.ts
// Deprecated. Using direct supabase client imports from utils.
export function useSupabase() {
  console.warn('useSupabase is deprecated. Use createClient from utils/supabase/client')
  return { session: null }
}