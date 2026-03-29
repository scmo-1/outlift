import type { WorkoutModel } from '@/types/models'
import { getSupabase } from './utils'

async function verifyProgramOwnership(programId: string, profileId: string): Promise<boolean> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('programs')
    .select('id')
    .eq('id', programId)
    .eq('profile_id', profileId)
    .maybeSingle()

  if (error) throw error

  return Boolean(data)
}

export async function listAllWorkouts(programId: string, profileId: string): Promise<WorkoutModel[]> {
  const hasAccess = await verifyProgramOwnership(programId, profileId)

  if (!hasAccess) {
    return []
  }

  const supabase = await getSupabase()

  const { data, error } = await supabase
    .from('program_workouts')
    .select('*')
    .eq('program_id', programId)
    .is('archived_at', null)

  if (error) throw error

  return data ?? []
}

export async function getWorkout(workoutId: string, profileId: string): Promise<WorkoutModel | null> {
  const supabase = await getSupabase()

  const { data, error } = await supabase
    .from('program_workouts')
    .select(
      `
      *,
      plannedExercises:program_workout_exercises (
        *,
        exercise:exercises (*)
      )
    `,
    )
    .eq('id', workoutId)
    .is('archived_at', null)
    .order('in_workout_index', { referencedTable: 'program_workout_exercises' })
    .maybeSingle()

  if (error) throw error

  if (!data) {
    return null
  }

  const hasAccess = await verifyProgramOwnership(data.program_id, profileId)

  if (!hasAccess) {
    return null
  }

  return data
}
