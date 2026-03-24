import type { ExerciseRow } from './models'

export type ExerciseItem = Omit<ExerciseRow, 'archived_at' | 'created_at' | 'updated_at'>

export type ExerciseDraftSet = {
  setIndex: number
  repGoal: number
}

export type ExerciseDraft = {
  id: string
  exerciseId: string
  inWorkoutIndex: number
  sets: ExerciseDraftSet[]
  isSaved: boolean
}

export type WorkoutDraft = {
  id: string
  inProgramIndex: number
  name: string
  exercises: ExerciseDraft[]
}

export type ProgramDraft = {
  name: string
  workouts: WorkoutDraft[]
}
