import { getWorkout } from '../DB/workouts'
import { listSessionDetailsByWorkout } from '../DB/sessions'
import type {
  WorkoutDetails,
  WorkoutDetailsExercise,
  WorkoutDetailsSession,
  WorkoutDetailsSet,
} from '@/types/workouts'

export async function getWorkoutDetails(workoutId: string): Promise<WorkoutDetails> {
  const workout = await getWorkout(workoutId)
  const sessionDetails = await listSessionDetailsByWorkout(workoutId)

  if (!workout) {
    throw new Error('Workout not found')
  }

  const exercises: WorkoutDetailsExercise[] = workout.plannedExercises.map((planned) => {
    const previous: WorkoutDetailsSession[] = sessionDetails.flatMap((session) => {
      const matchingExercises =
        session.session_exercises?.filter((sessionExercise) => {
          return (
            sessionExercise.exercise_id === planned.exercise_id ||
            sessionExercise.planned_exercise_id === planned.id
          )
        }) ?? []

      return matchingExercises.map((sessionExercise) => {
        const sets: WorkoutDetailsSet[] = (sessionExercise.sets ?? []).map((set) => ({
          setIndex: set.set_index,
          weight: set.weight,
          reps: set.reps,
          rir: set.rir,
        }))

        return {
          sessionId: session.id,
          endedAt: session.ended_at,
          substitutedExerciseName: sessionExercise.planned_exercise_id
            ? sessionExercise.exercise_name
            : undefined,
          sets,
        }
      })
    })

    return {
      id: planned.id,
      name: planned.exercise.name,
      sets: planned.sets,
      repGoal: planned.rep_goal,
      previous,
    }
  })

  return {
    id: workout.id,
    name: workout.name,
    exercises,
  }
}
