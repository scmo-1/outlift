import { getSupabase } from './utils'
import { WorkoutSessionRow, SessionExerciseRow } from '@/types/models'
import type { sessionMeta } from '@/types/workouts'
import { getWorkout } from './workouts'

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
    .limit(1)

  if (error) throw error

  return data?.[0] ?? null
}

export async function getSessionMetaById(sessionId: string, profileId: string): Promise<sessionMeta> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('workout_sessions')
    .select(`id, workout_id, started_at, ended_at`)
    .eq('id', sessionId)
    .eq('profile_id', profileId)
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
          status,
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

export async function listSessionDetailsByWorkout(workoutId: string, profileId: string) {
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
          status,
          weight,
          reps,
          rir,
          created_at
        )
      )
    `,
    )
    .eq('workout_id', workoutId)
    .eq('profile_id', profileId)
    .not('ended_at', 'is', null)
    .order('ended_at', { ascending: false })

  if (error) throw error

  return data ?? []
}

export async function listCompletedSessionsByMonth(profileId: string, from: string, to: string) {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('workout_sessions')
    .select('id, ended_at')
    .eq('profile_id', profileId)
    .gte('ended_at', from)
    .lt('ended_at', to)
    .order('ended_at', { ascending: true })

  if (error) throw error

  return data ?? []
}

export async function createWorkoutSession(
  profileId: string,
  workoutId: string,
): Promise<WorkoutSessionRow> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('workout_sessions')
    .insert({
      profile_id: profileId,
      workout_id: workoutId,
    })
    .select('*')
    .single()

  if (error) throw error

  return data
}

export async function endWorkoutSession(
  sessionId: string,
  profileId: string,
): Promise<WorkoutSessionRow> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('workout_sessions')
    .update({
      ended_at: new Date().toISOString(),
    })
    .eq('id', sessionId)
    .eq('profile_id', profileId)
    .select('*')
    .single()

  if (error) throw error

  return data
}

export async function createSessionExercises(
  sessionId: string,
  workoutId: string,
  profileId: string,
): Promise<SessionExerciseRow[]> {
  const supabase = await getSupabase()
  const workout = await getWorkout(workoutId, profileId)

  if (!workout) {
    throw new Error('Workout not found')
  }

  const rows = workout.plannedExercises.map((planned) => ({
    session_id: sessionId,
    exercise_id: planned.exercise_id,
    exercise_name: planned.exercise.name,
    in_session_index: planned.in_workout_index,
    planned_exercise_id: null,
  }))

  const { data, error } = await supabase.from('session_exercises').insert(rows).select('*')

  if (error) throw error

  return data ?? []
}

export async function listRecentCompletedSessionsByWorkout(
  profileId: string,
  workoutId: string,
  limit = 3,
) {
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
          status,
          weight,
          reps,
          rir,
          created_at
        )
      )
      `,
    )
    .eq('profile_id', profileId)
    .eq('workout_id', workoutId)
    .not('ended_at', 'is', null)
    .order('ended_at', { ascending: false })
    .limit(limit)

  if (error) throw error

  return data ?? []
}
