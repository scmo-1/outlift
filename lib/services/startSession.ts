import { getActiveSession } from '../DB/sessions'
import { getNextWorkout } from './getNextWorkout'
import { createWorkoutSession, createSessionExercises } from '../DB/sessions'

type newSessionMeta = {
  workoutId: string
  sessionId: string
}

export async function startSession(profileId: string): Promise<newSessionMeta> {
  const activeSession = await getActiveSession(profileId)
  if (activeSession) {
    if (activeSession.workout_id && activeSession.id) {
      return {
        workoutId: activeSession.workout_id,
        sessionId: activeSession.id,
      }
    }
  }
  const nextWorkout = await getNextWorkout(profileId)
  if (!nextWorkout) throw new Error('No workout available to start')

  const session = await createWorkoutSession(profileId, nextWorkout.id)
  if (!session) {
    throw new Error('Session could not start')
  }
  const sessionExercises = await createSessionExercises(session.id, nextWorkout.id)
  if (!sessionExercises) {
    throw new Error('Session exercises could not be created')
  }

  if (session.workout_id && session.id) {
    return {
      workoutId: session.workout_id,
      sessionId: session.id,
    }
  } else {
    throw new Error('start session error')
  }
}
