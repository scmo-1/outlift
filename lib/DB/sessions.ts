import { getSupabase } from './utils'
import { WorkoutSessionRow } from '@/types/models'

export async function listCompletedSessions(profileId: string): Promise<WorkoutSessionRow[]> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('workout_sessions')
    .select('*')
    .eq('profile_id', profileId)
    .not('ended_at', 'is', null)
    .order('ended_at', { ascending: false })

  if (error) throw error

  return data ?? []
}

export async function getActiveSession(profileId: string): Promise<WorkoutSessionRow | null> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('workout_sessions')
    .select('*')
    .eq('profile_id', profileId)
    .is('ended_at', null)
    .maybeSingle()

  if (error) throw error

  return data ?? null
}

export async function listSessionDetailsByWorkout(workoutId: string) {
  const supabase = await getSupabase()

  const { data, error } = await supabase
    .from('workout_sessions')
    .select(
      `
      id,
      workout_id,
      profile_id,
      created_at,
      started_at,
      ended_at,
      session_exercises (
        id,
        session_id,
        exercise_id,
        exercise_name,
        in_session_index,
        planned_exercise_id,
        sets (
          id,
          session_exercise_id,
          set_index,
          weight,
          reps,
          rir,
          created_at
        )
      )
    `,
    )
    .eq('workout_id', workoutId)
    .not('ended_at', 'is', null)
    .order('ended_at', { ascending: false })

  if (error) throw error

  return data ?? []
}
