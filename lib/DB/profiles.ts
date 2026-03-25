import { getSupabase } from './utils'
import type { ProfileRow } from '@/types/models'

export async function getProfileById(userId: string): Promise<ProfileRow | null> {
  const supabase = await getSupabase()
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).limit(1)

  if (error) throw error

  return data?.[0] ?? null
}
