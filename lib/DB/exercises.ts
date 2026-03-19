import type { ExerciseRow, PlannedExercise, SessionExerciseRow } from '@/types/models'
import { getSupabase } from './utils'

export async function listAllExercises(): Promise<ExerciseRow[]> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .is('created_by', null)
    .is('archived_at', null)
    .order('name')

  if (error) throw error

  return data ?? []
}

export async function getSingleExercise(exerciseId: string): Promise<ExerciseRow | null> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('id', exerciseId)
    .maybeSingle()

  if (error) throw error

  return data ?? null
}

export async function listExercisesByBodypart(bodypart: string): Promise<ExerciseRow[]> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('exercise')
    .select('*')
    .eq('bodypart', bodypart.toLowerCase())
    .is('archived_at', null)

  if (error) throw error
  return data ?? []
}

export async function listPlannedExercises(workoutId: string): Promise<PlannedExercise[]> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('program_workout_exercises')
    .select('*')
    .eq('workout_id', workoutId)

  if (error) throw error

  return data ?? []
}

export async function listSessionExercises(sessionId: string): Promise<SessionExerciseRow[]> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('session_exercises')
    .select('*')
    .eq('session_id', sessionId)

  if (error) throw error

  return data ?? []
}
