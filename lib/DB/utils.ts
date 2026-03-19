import { createClient } from '../supabase/server'

export async function getSupabase() {
  return createClient()
}
