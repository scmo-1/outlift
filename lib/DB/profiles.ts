import { getSupabase } from './utils'
import type { ProfileRow } from '@/types/models'

export async function getProfileById(userId: string): Promise<ProfileRow | null> {
  const supabase = await getSupabase()
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle()

  if (error) throw error

  return data ?? null
}
