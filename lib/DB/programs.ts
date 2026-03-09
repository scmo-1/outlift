import type { Program } from '@/types/programs'
import { getSupabase, throwError } from './utils'

export async function listAllPrograms(profileId: string): Promise<Program[]> {
  const supabase = await getSupabase()

  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('profile_id', profileId)
    .is('archived_at', null)

  throwError(error)

  return data ?? []
}

export async function getSingleProgram(
  profileId: string,
  programId: string,
): Promise<Program | null> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('id', programId)
    .eq('profile_id', profileId)
    .is('archived_at', null)
    .maybeSingle()

  throwError(error)

  return data ?? null
}
