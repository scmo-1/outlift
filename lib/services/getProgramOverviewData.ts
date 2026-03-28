import { getProgramWithDetails } from '@/lib/DB/programs'
import type { ProgramWithDetails } from '@/types/programs'

export async function getProgramOverviewData(
  profileId: string,
  programId: string,
): Promise<ProgramWithDetails | null> {
  const program = await getProgramWithDetails(profileId, programId)

  if (!program) {
    return null
  }

  return {
    ...program,
    workouts: [...program.workouts]
      .sort((left, right) => left.order_index - right.order_index)
      .map((workout) => ({
        ...workout,
        plannedExercises: [...workout.plannedExercises].sort(
          (left, right) => left.in_workout_index - right.in_workout_index,
        ),
      })),
  }
}
