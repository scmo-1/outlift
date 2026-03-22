export type SessionPageSetHistory = {
  sessionId: string
  endedAt: string | null
  weight: number | null
  reps: number | null
  rir: number | null
  status: 'completed' | 'skipped'
}

export type SessionPageCurrentSet = {
  weight: number | null
  reps: number | null
  rir: number | null
  status: 'completed' | 'skipped'
}

export type SessionPageSet = {
  setIndex: number
  history: SessionPageSetHistory[]
  current: SessionPageCurrentSet | null
}

export type SessionPageExercise = {
  sessionExerciseId: string
  exerciseId: string | null
  name: string
  inSessionIndex: number
  sets: SessionPageSet[]
}

export type SessionPageData = {
  sessionId: string
  workoutId: string
  workoutName: string
  exercises: SessionPageExercise[]
}
