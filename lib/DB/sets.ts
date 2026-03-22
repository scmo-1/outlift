import { getSupabase } from './utils'
import type { SetRow } from '@/types/models'

type SaveSetInput = {
  sessionExerciseId: string
  setIndex: number
  status: 'completed' | 'skipped'
  weight: number | null
  reps: number | null
  rir: number | null
}

export async function getLatestSetBySessionExerciseAndIndex(
  sessionExerciseId: string,
  setIndex: number,
): Promise<SetRow | null> {
  const supabase = await getSupabase()

  const { data, error } = await supabase
    .from('sets')
    .select('*')
    .eq('session_exercise_id', sessionExerciseId)
    .eq('set_index', setIndex)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw error

  return data
}

export async function saveSet(input: SaveSetInput): Promise<SetRow> {
  const supabase = await getSupabase()
  const existingSet = await getLatestSetBySessionExerciseAndIndex(
    input.sessionExerciseId,
    input.setIndex,
  )

  if (existingSet) {
    const { data, error } = await supabase
      .from('sets')
      .update({
        status: input.status,
        weight: input.weight,
        reps: input.reps,
        rir: input.rir,
      })
      .eq('id', existingSet.id)
      .select('*')
      .single()

    if (error) throw error

    return data
  }

  const { data, error } = await supabase
    .from('sets')
    .insert({
      session_exercise_id: input.sessionExerciseId,
      set_index: input.setIndex,
      status: input.status,
      weight: input.weight,
      reps: input.reps,
      rir: input.rir,
    })
    .select('*')
    .single()

  if (error) throw error

  return data
}
