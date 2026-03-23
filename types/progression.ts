export type ProgressScope = 'activeProgram' | 'allTime'

export type ProgressExerciseOption = {
  exerciseId: string
  exerciseName: string
}

export type ProgressHistoryItem = {
  sessionId: string
  workoutId: string | null
  endedAt: string
  exerciseId: string
  exerciseName: string
  setIndex: number
  weight: number
  reps: number
  rir: number
  e1rm: number
  status: 'completed'
}

export type ProgressViewData = {
  scope: ProgressScope
  activeProgramId: string | null
  exerciseOptions: ProgressExerciseOption[]
  history: ProgressHistoryItem[]
}
