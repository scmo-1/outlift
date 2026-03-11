import type { Program } from '@/types/programs'
import { getSupabase } from './utils'

export async function listAllPrograms(profileId: string): Promise<Program[]> {
  const supabase = await getSupabase()

  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('profile_id', profileId)
    .is('archived_at', null)

  if (error) throw error

  return data ?? []
}

export async function getActiveProgram(
  profileId: string,
  programId: string,
): Promise<Program | null> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('id', programId)
    .eq('profile_id', profileId)
    .is('is_active', true)
    .maybeSingle()

  if (error) throw error

  return data ?? null
}
