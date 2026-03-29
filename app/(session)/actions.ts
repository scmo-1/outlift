'use server'

import { getProfile } from '@/lib/auth/getProfile'
import { endWorkoutSession, getActiveSession, getSessionDetailsById } from '@/lib/DB/sessions'
import { saveSet } from '@/lib/DB/sets'
import { getWorkoutDetails } from '@/lib/services/getWorkoutDetails'

type LogSetActionInput = {
  sessionId: string
  sessionExerciseId: string
  setIndex: number
  status: 'completed' | 'skipped'
  weight: number | null
  reps: number | null
  rir: number | null
}

export async function logSetAction(input: LogSetActionInput) {
  const profile = await getProfile()
  const session = await getSessionDetailsById(input.sessionId, profile.id)

  if (!session) {
    throw new Error('Session not found')
  }

  const sessionExercise = session.session_exercises.find(
    (exercise) => exercise.id === input.sessionExerciseId,
  )

  if (!sessionExercise) {
    throw new Error('Session exercise not found')
  }

  return saveSet({
    sessionExerciseId: input.sessionExerciseId,
    setIndex: input.setIndex,
    status: input.status,
    weight: input.weight,
    reps: input.reps,
    rir: input.rir,
  })
}

export async function endSessionAction(sessionId: string) {
  const profile = await getProfile()
  const activeSession = await getActiveSession(profile.id)

  if (!activeSession || activeSession.id !== sessionId) {
    throw new Error('Active session not found')
  }

  const session = await getSessionDetailsById(sessionId, profile.id)
  if (!session) {
    throw new Error('Session not found')
  }

  if (!activeSession.workout_id) {
    throw new Error('Session workout not found')
  }

  const workoutDetails = await getWorkoutDetails(activeSession.workout_id, profile.id)

  for (const sessionExercise of session.session_exercises) {
    const workoutExercise = workoutDetails.exercises.find((exercise) => {
      return exercise.name === sessionExercise.exercise_name
    })

    if (!workoutExercise) {
      continue
    }

    for (let index = 1; index <= workoutExercise.sets; index += 1) {
      const existingSet = sessionExercise.sets.find((set) => set.set_index === index)

      if (existingSet) {
        continue
      }

      await saveSet({
        sessionExerciseId: sessionExercise.id,
        setIndex: index,
        status: 'skipped',
        weight: null,
        reps: null,
        rir: null,
      })
    }
  }

  return endWorkoutSession(sessionId, profile.id)
}
