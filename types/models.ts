import type { Database } from './database'

export type ProgramWorkoutRow = Database['public']['Tables']['program_workouts']['Row']

export type ProgramWorkoutExerciseRow =
  Database['public']['Tables']['program_workout_exercises']['Row']

export type ExerciseRow = Database['public']['Tables']['exercises']['Row']

export type WorkoutSessionRow = Database['public']['Tables']['workout_sessions']['Row']

export type SessionExerciseRow = Database['public']['Tables']['session_exercises']['Row']

export type SetRow = Database['public']['Tables']['sets']['Row']

export type ProfileRow = Database['public']['Tables']['profiles']['Row']

export type PlannedExercise = ProgramWorkoutExerciseRow & {
  exercise: ExerciseRow
}

export type WorkoutModel = ProgramWorkoutRow & {
  plannedExercises: PlannedExercise[]
}
