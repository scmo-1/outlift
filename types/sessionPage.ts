export type SessionPageExercise = {
  sessionExerciseId: string
  plannedExerciseId: string | null
  name: string
  sets: {
    setIndex: number
    current?: {
      weight?: number
      reps?: number
      rir?: number
    }
    history: {
      sessionId: string
      endedAt: string | null
      weight: number
      reps: number
      rir: number
    }[]
  }[]
}
