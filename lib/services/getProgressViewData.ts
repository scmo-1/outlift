import { getActiveProgramWithDetails } from '../DB/programs'
import {
  listCompletedSessionsWithExerciseHistory,
  listCompletedSessionsWithExerciseHistoryByWorkoutIds,
  type ProgressSessionRow,
} from '../DB/progression'
import type {
  ProgressExerciseOption,
  ProgressHistoryItem,
  ProgressScope,
  ProgressViewData,
} from '@/types/progression'

function buildExerciseOptionsFromActiveProgram(
  activeProgram: NonNullable<Awaited<ReturnType<typeof getActiveProgramWithDetails>>>,
): ProgressExerciseOption[] {
  const exerciseMap = new Map<string, ProgressExerciseOption>()

  const orderedWorkouts = [...activeProgram.workouts].sort((left, right) => {
    return left.order_index - right.order_index
  })

  for (const workout of orderedWorkouts) {
    const orderedExercises = [...workout.plannedExercises].sort((left, right) => {
      return left.in_workout_index - right.in_workout_index
    })

    for (const exercise of orderedExercises) {
      if (!exerciseMap.has(exercise.exercise_id)) {
        exerciseMap.set(exercise.exercise_id, {
          exerciseId: exercise.exercise_id,
          exerciseName: exercise.exercise.name,
        })
      }
    }
  }

  return Array.from(exerciseMap.values())
}

function buildExerciseOptionsFromHistory(history: ProgressHistoryItem[]): ProgressExerciseOption[] {
  const exerciseMap = new Map<string, ProgressExerciseOption>()

  for (const item of history) {
    if (!exerciseMap.has(item.exerciseId)) {
      exerciseMap.set(item.exerciseId, {
        exerciseId: item.exerciseId,
        exerciseName: item.exerciseName,
      })
    }
  }

  return Array.from(exerciseMap.values()).sort((left, right) => {
    return left.exerciseName.localeCompare(right.exerciseName)
  })
}

function buildHistoryFromSessions(sessions: ProgressSessionRow[]): ProgressHistoryItem[] {
  return sessions.flatMap((session) => {
    const endedAt = session.ended_at

    if (!endedAt) {
      return []
    }

    return (session.session_exercises ?? []).flatMap((sessionExercise) => {
      const exerciseId = sessionExercise.exercise_id

      if (!exerciseId) {
        return []
      }

      return (sessionExercise.sets ?? []).flatMap((set) => {
        const weight = set.weight
        const reps = set.reps
        const rir = set.rir
        const hasRequiredValues = weight !== null && reps !== null && rir !== null
        const isFirstLoggedSet = set.set_index === 1

        if (!hasRequiredValues || !isFirstLoggedSet || set.status === 'skipped') {
          return []
        }

        return [
          {
            sessionId: session.id,
            workoutId: session.workout_id,
            endedAt,
            exerciseId,
            exerciseName: sessionExercise.exercise_name,
            setIndex: set.set_index,
            weight,
            reps,
            rir,
            status: 'completed' as const,
          },
        ]
      })
    })
  })
}

export async function getProgressViewData(
  profileId: string,
  scope: ProgressScope = 'activeProgram',
): Promise<ProgressViewData> {
  if (scope === 'allTime') {
    const sessions = await listCompletedSessionsWithExerciseHistory(profileId)
    const history = buildHistoryFromSessions(sessions)

    return {
      scope,
      activeProgramId: null,
      exerciseOptions: buildExerciseOptionsFromHistory(history),
      history,
    }
  }

  const activeProgram = await getActiveProgramWithDetails(profileId)

  if (!activeProgram) {
    return {
      scope,
      activeProgramId: null,
      exerciseOptions: [],
      history: [],
    }
  }

  const workoutIds = activeProgram.workouts.map((workout) => workout.id)
  const sessions = await listCompletedSessionsWithExerciseHistoryByWorkoutIds(profileId, workoutIds)

  return {
    scope,
    activeProgramId: activeProgram.id,
    exerciseOptions: buildExerciseOptionsFromActiveProgram(activeProgram),
    history: buildHistoryFromSessions(sessions),
  }
}
