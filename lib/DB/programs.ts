import { createClient } from '../supabase/server'
import type { Program } from '@/types/programs'

export async function listAllPrograms(profileId: string): Promise<Program[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('profile_id', profileId)
    .is('archived_at', null)

  if (error) throw new Error(error.message)

  return data ?? []
}
