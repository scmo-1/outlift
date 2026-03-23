import { getSupabase } from './utils'

type ProgressSetRow = {
  set_index: number
  weight: number | null
  reps: number | null
  rir: number | null
  status: string
}

type ProgressSessionExerciseRow = {
  exercise_id: string | null
  exercise_name: string
  sets: ProgressSetRow[] | null
}

export type ProgressSessionRow = {
  id: string
  workout_id: string | null
  ended_at: string | null
  session_exercises: ProgressSessionExerciseRow[] | null
}

export async function listCompletedSessionsWithExerciseHistory(
  profileId: string,
): Promise<ProgressSessionRow[]> {
  const supabase = await getSupabase()

  const { data, error } = await supabase
    .from('workout_sessions')
    .select(
      `
      id,
      workout_id,
      ended_at,
      session_exercises (
        exercise_id,
        exercise_name,
        sets (
          set_index,
          weight,
          reps,
          rir,
          status
        )
      )
      `,
    )
    .eq('profile_id', profileId)
    .not('ended_at', 'is', null)
    .order('ended_at', { ascending: true })

  if (error) throw error

  return (data ?? []) as ProgressSessionRow[]
}

export async function listCompletedSessionsWithExerciseHistoryByWorkoutIds(
  profileId: string,
  workoutIds: string[],
): Promise<ProgressSessionRow[]> {
  if (workoutIds.length === 0) {
    return []
  }

  const supabase = await getSupabase()

  const { data, error } = await supabase
    .from('workout_sessions')
    .select(
      `
      id,
      workout_id,
      ended_at,
      session_exercises (
        exercise_id,
        exercise_name,
        sets (
          set_index,
          weight,
          reps,
          rir,
          status
        )
      )
      `,
    )
    .eq('profile_id', profileId)
    .in('workout_id', workoutIds)
    .not('ended_at', 'is', null)
    .order('ended_at', { ascending: true })

  if (error) throw error

  return (data ?? []) as ProgressSessionRow[]
}
