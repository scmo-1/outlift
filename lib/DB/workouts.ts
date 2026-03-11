import type { WorkoutModel } from '@/types/models'
import { getSupabase } from './utils'

export async function listAllWorkouts(programId: string): Promise<WorkoutModel[]> {
  const supabase = await getSupabase()

  const { data, error } = await supabase
    .from('program_workouts')
    .select('*')
    .eq('program_id', programId)
    .is('archived_at', null)

  if (error) throw error

  return data ?? []
}

export async function getWorkout(workoutId: string): Promise<WorkoutModel | null> {
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

  return data ?? null
}
