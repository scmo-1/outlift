import { getNextWorkout } from './getNextWorkout'
import { getWorkoutDetails } from './getWorkoutDetails'
import { type WorkoutDetails } from '@/types/workouts'
import { getSessionMetaById } from '../DB/sessions'

type GetStartPageParams = {
  profileId: string
  sessionId?: string
}

type StartPageData = {
  mode: 'default' | 'completed'
  workout: WorkoutDetails | null
}

export async function getStartPageData({
  profileId,
  sessionId,
}: GetStartPageParams): Promise<StartPageData> {
  if (sessionId) {
    const session = await getSessionMetaById(sessionId, profileId)
    if (!session) throw new Error('No session found')

    const workoutDetails = await getWorkoutDetails(session.workout_id)
    if (!workoutDetails) throw new Error('Details not found')

    const filteredWorkout = {
      ...workoutDetails,
      exercises: workoutDetails.exercises.map((exercise) => ({
        ...exercise,
        previous: exercise.previous.filter((session) => session.sessionId === sessionId),
      })),
    }

    return {
      mode: 'completed',
      workout: filteredWorkout,
    }
  } else {
    const nextWorkout = await getNextWorkout(profileId)
    if (!nextWorkout) {
      return {
        mode: 'default',
        workout: null,
      }
    }

    const nextWorkoutDetails = await getWorkoutDetails(nextWorkout.id)

    return {
      mode: 'default',
      workout: nextWorkoutDetails,
    }
  }
}
