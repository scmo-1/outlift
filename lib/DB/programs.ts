import type { ProgramRow } from '@/types/models'
import type { ProgramWithDetails } from '@/types/programs'
import type { ProgramDraft } from '@/types/createProgram'
import { getSupabase } from './utils'

export async function getActiveProgram(profileId: string): Promise<ProgramRow | null> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('profile_id', profileId)
    .is('is_active', true)
    .limit(1)

  if (error) throw error

  return data?.[0] ?? null
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
    .limit(1)

  if (error) throw error

  return data?.[0] ?? null
}

export async function getProgramWithDetails(
  profileId: string,
  programId: string,
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
    .eq('id', programId)
    .limit(1)

  if (error) throw error

  return data?.[0] ?? null
}

export async function createProgram(profileId: string, programDraft: ProgramDraft): Promise<ProgramRow> {
  const supabase = await getSupabase()
  const programName = programDraft.name.trim()

  if (!programName) {
    throw new Error('Program name is required')
  }

  for (const workout of programDraft.workouts) {
    if (!workout.name.trim()) {
      throw new Error('Workout name is required')
    }

    for (const exercise of workout.exercises) {
      if (!exercise.exerciseId) {
        throw new Error('Exercise is required')
      }

      if (exercise.sets.length === 0) {
        throw new Error('Exercise sets are required')
      }
    }
  }

  const { data: programId, error: createProgramError } = await supabase.rpc(
    'create_program_with_workouts',
    {
      p_profile_id: profileId,
      p_program_name: programName,
      p_workouts: programDraft.workouts,
    },
  )

  if (createProgramError) throw createProgramError

  if (!programId) {
    throw new Error('Program could not be created')
  }

  const { data: program, error: programError } = await supabase
    .from('programs')
    .select('*')
    .eq('id', programId)
    .eq('profile_id', profileId)
    .single()

  if (programError) throw programError

  return program
}

export async function activateProgram(profileId: string, programId: string): Promise<void> {
  const supabase = await getSupabase()

  const { data: matchingProgram, error: programLookupError } = await supabase
    .from('programs')
    .select('id')
    .eq('id', programId)
    .eq('profile_id', profileId)
    .maybeSingle()

  if (programLookupError) throw programLookupError

  if (!matchingProgram) {
    throw new Error('Program not found')
  }

  const { error: deactivateError } = await supabase
    .from('programs')
    .update({ is_active: false })
    .eq('profile_id', profileId)

  if (deactivateError) throw deactivateError

  const { error: activateError } = await supabase
    .from('programs')
    .update({ is_active: true })
    .eq('id', programId)
    .eq('profile_id', profileId)

  if (activateError) throw activateError
}
