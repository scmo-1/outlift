import { getActiveProgram } from '../DB/programs'
import { getNextWorkout } from './getNextWorkout'
import { listCompletedSessions } from '../DB/sessions'
import { getWorkoutDetails } from './getWorkoutDetails'

export async function getStartPageData(profileId: string) {
  const activeProgram = await getActiveProgram(profileId)
  if (!activeProgram) throw new Error('No active program found')

  const completedSessions = listCompletedSessions(profileId)
  if (!completedSessions) throw new Error('Error fetching completed sessions')

  const nextWorkout = await getNextWorkout(profileId)
  if (!nextWorkout) throw new Error('Error fetching next workout')

  const nextWorkoutDetails = await getWorkoutDetails(nextWorkout.id)

  return {
    completedSessions,
    nextWorkoutDetails,
  }
}
