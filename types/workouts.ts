export type WorkoutDetails = {
  id: string
  name: string
  exercises: WorkoutDetailsExercise[]
}

export type WorkoutDetailsExercise = {
  id: string
  inWorkoutIndex: number
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
  weight: number | null
  reps: number | null
  rir: number | null
  status: 'completed' | 'skipped'
}

export type sessionMeta = {
  id: string
  workout_id: string
  started_at: string
  ended_at: string
}
