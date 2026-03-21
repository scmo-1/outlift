type SessionPageSetHistory = {
  sessionId: string
  endedAt: string | null
  weight: number
  reps: number
  rir: number
}

type SessionPageSet = {
  setIndex: number
  history: SessionPageSetHistory[]
}

type SessionPageExercise = {
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
