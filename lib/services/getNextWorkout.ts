import { getActiveProgram } from '../DB/programs'
import { listAllWorkouts } from '../DB/workouts'
import { listCompletedSessions } from '../DB/sessions'
import type { ProgramWorkoutRow } from '@/types/models'

export async function getNextWorkout(profileId: string): Promise<ProgramWorkoutRow | null> {
  const activeProgram = await getActiveProgram(profileId)
  if (!activeProgram) return null

  const workouts = await listAllWorkouts(activeProgram.id, profileId)
  if (workouts.length === 0) return null

  const completedSessions = await listCompletedSessions(profileId)
  const latestSession = completedSessions[0]

  if (!latestSession?.workout_id) {
    return workouts.find((w) => w.order_index === 1) ?? workouts[0] ?? null
  }

  const latestWorkout = workouts.find((w) => w.id === latestSession.workout_id)
  const latestOrderIndex = latestWorkout?.order_index

  if (!latestOrderIndex) {
    return workouts.find((w) => w.order_index === 1) ?? workouts[0] ?? null
  }

  if (latestOrderIndex === workouts.length) {
    return workouts.find((w) => w.order_index === 1) ?? workouts[0] ?? null
  }

  return (
    workouts.find((w) => w.order_index === latestOrderIndex + 1) ??
    workouts.find((w) => w.order_index === 1) ??
    workouts[0] ??
    null
  )
}
