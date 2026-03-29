import { getActiveSession, getSessionDetailsById } from '../DB/sessions'
import { getWorkoutDetails } from './getWorkoutDetails'
import type { SessionPageData } from '@/types/sessionPage'

export async function getSessionPageData(profileId: string): Promise<SessionPageData> {
  const activeSession = await getActiveSession(profileId)
  if (!activeSession) throw new Error('Active session not found')

  const sessionDetails = await getSessionDetailsById(activeSession.id, profileId)
  if (!sessionDetails) throw new Error('No session details found')

  if (!activeSession.workout_id) throw new Error('No workout id found')

  const workoutDetails = await getWorkoutDetails(activeSession.workout_id, profileId)
  if (!workoutDetails) throw new Error('No workout details found')

  const filteredExercises = sessionDetails.session_exercises.map((sessionExercise) => {
    const workoutExercise = workoutDetails.exercises.find((exercise) => {
      if (sessionExercise.planned_exercise_id) {
        return exercise.id === sessionExercise.planned_exercise_id
      }

      return exercise.inWorkoutIndex === sessionExercise.in_session_index
    })

    if (!workoutExercise) {
      throw new Error('Matching workout exercise not found')
    }

    const sets = Array.from({ length: workoutExercise.sets }, (_, index) => {
      const setIndex = index + 1
      const currentSet = sessionExercise.sets.find((set) => set.set_index === setIndex)

      const history = workoutExercise.previous.slice(0, 3).flatMap((previousSession) => {
        const matchingSet = previousSession.sets.find((set) => set.setIndex === setIndex)

        if (!matchingSet) return []

        return [
          {
            sessionId: previousSession.sessionId,
            endedAt: previousSession.endedAt,
            weight: matchingSet.weight,
            reps: matchingSet.reps,
            rir: matchingSet.rir,
            status: matchingSet.status,
          },
        ]
      })

      return {
        setIndex,
        history,
        current: currentSet
          ? {
              weight: currentSet.weight,
              reps: currentSet.reps,
              rir: currentSet.rir,
              status:
                currentSet.status === 'skipped'
                  ? ('skipped' as const)
                  : ('completed' as const),
            }
          : null,
      }
    })

    return {
      sessionExerciseId: sessionExercise.id,
      exerciseId: sessionExercise.exercise_id,
      name: sessionExercise.exercise_name,
      inSessionIndex: sessionExercise.in_session_index,
      sets,
    }
  })

  return {
    sessionId: activeSession.id,
    workoutId: activeSession.workout_id,
    workoutName: workoutDetails.name,
    exercises: filteredExercises,
  }
}
