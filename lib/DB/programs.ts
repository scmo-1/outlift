import type { ProgramRow } from '@/types/models'
import type { ProgramWithDetails } from '@/types/programs'
import { getSupabase } from './utils'

export async function getActiveProgram(profileId: string): Promise<ProgramRow | null> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('profile_id', profileId)
    .is('is_active', true)
    .single()

  if (error) throw error

  return data ?? null
}

export async function listAllInactivePrograms(profileId: string): Promise<ProgramRow[]> {
  const supabase = await getSupabase()

  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('profile_id', profileId)
    .is('archived_at', null)
    .is('is_active', false)

  if (error) throw error

  return data ?? []
}

export async function getActiveProgramWithDetails(
  profileId: string,
): Promise<ProgramWithDetails | null> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('programs')
    .select(
      `
  *,
  workouts:program_workouts (
    *,
    plannedExercises:program_workout_exercises (
      *,
      exercise:exercises (*)
    )
  )
`,
    )
    .eq('profile_id', profileId)
    .is('is_active', true)
    .single()

  if (error) throw error

  return data ?? null
}
