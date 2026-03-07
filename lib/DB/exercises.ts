import { createClient } from '@/lib/supabase/server'
import type { Exercise } from '@/types/exercises'

const supabase = await createClient()

export async function listAllExercises(): Promise<Exercise[]> {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .is('created_by', null)
    .is('archived_at', null)
    .order('name')

  if (error) throw error

  return data ?? []
}

export async function listExercisesByBodypart(bodypart: string): Promise<Exercise[]> {
  const { data, error } = await supabase
    .from('exercise')
    .select('*')
    .eq('bodypart', bodypart.toLowerCase())
    .is('archived_at', null)

  if (error) throw error
  return data ?? []
}
