export type WorkoutDetails = {
  id: string
  name: string
  exercises: WorkoutDetailsExercise[]
}

export type WorkoutDetailsExercise = {
  id: string
  name: string
  sets: number
  repGoal: number
  previous: WorkoutDetailsSession[]
}

export type WorkoutDetailsSession = {
  sessionId: string
  endedAt: string | null
  substitutedExerciseName?: string
  sets: WorkoutDetailsSet[]
}

export type WorkoutDetailsSet = {
  setIndex: number
  weight: number
  reps: number
  rir: number
}
