import { getSupabase } from './utils'
import { WorkoutSessionRow } from '@/types/models'
import type { sessionMeta } from '@/types/workouts'

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

export async function getSessionMetaById(sessionId: string): Promise<sessionMeta> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('workout_sessions')
    .select(`id, workout_id, started_at, ended_at`)
    .eq('id', sessionId)
    .single()

  if (error) throw error
  return {
    id: data.id,
    workout_id: data.workout_id,
    started_at: data.started_at,
    ended_at: data.ended_at,
  }
}

export async function getSessionDetailsById(sessionId: string, profileId: string) {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('workout_sessions')
    .select(
      `
      id, workout_id, profile_id, created_at, started_at, ended_at,
      session_exercises (
        id,
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
    .eq('id', sessionId)
    .eq('profile_id', profileId)
    .single()

  if (error) throw error

  return data
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
