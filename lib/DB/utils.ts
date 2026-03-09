import { createClient } from '../supabase/server'
import type { PostgrestError } from '@supabase/supabase-js'

export async function getSupabase() {
  return createClient()
}

export function throwError(error: PostgrestError | null) {
  if (error) {
    throw new Error(error.message)
  }
}
