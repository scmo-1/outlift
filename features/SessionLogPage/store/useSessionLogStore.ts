'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { SessionPageData } from '@/types/sessionPage'

type MetricName = 'weight' | 'reps' | 'rir'

type LoggedSetDraft = {
  setIndex: number
  weight: number
  reps: number
  rir: number
  status: 'unlogged' | 'completed' | 'skipped'
}

type SessionExerciseDraft = {
  sessionExerciseId: string
  name: string
  sets: LoggedSetDraft[]
}

type SessionDraft = {
  sessionId: string
  workoutId: string
  workoutName: string
  exercises: SessionExerciseDraft[]
}

type SessionLogState = {
  draftsBySessionId: Record<string, SessionDraft>
  initializeSessionDraft: (data: SessionPageData) => void
  setMetricValue: (
    sessionId: string,
    sessionExerciseId: string,
    setIndex: number,
    metric: MetricName,
    value: number,
  ) => void
  adjustMetricValue: (
    sessionId: string,
    sessionExerciseId: string,
    setIndex: number,
    metric: MetricName,
    delta: number,
  ) => void
  markSetStatus: (
    sessionId: string,
    sessionExerciseId: string,
    setIndex: number,
    status: 'completed' | 'skipped',
  ) => void
  clearSessionDraft: (sessionId: string) => void
}

function buildDraftFromSession(data: SessionPageData): SessionDraft {
  return {
    sessionId: data.sessionId,
    workoutId: data.workoutId,
    workoutName: data.workoutName,
    exercises: data.exercises.map((exercise) => ({
      sessionExerciseId: exercise.sessionExerciseId,
      name: exercise.name,
      sets: exercise.sets.map((set) => ({
        setIndex: set.setIndex,
        weight:
          set.current?.status === 'completed'
            ? (set.current.weight ?? 0)
            : (set.history.find((historyItem) => historyItem.status === 'completed')?.weight ?? 0),
        reps:
          set.current?.status === 'completed'
            ? (set.current.reps ?? 0)
            : (set.history.find((historyItem) => historyItem.status === 'completed')?.reps ?? 0),
        rir:
          set.current?.status === 'completed'
            ? (set.current.rir ?? 0)
            : (set.history.find((historyItem) => historyItem.status === 'completed')?.rir ?? 0),
        status: set.current?.status ?? 'unlogged',
      })),
    })),
  }
}

function mergeDraftWithInitialValues(
  existingDraft: SessionDraft,
  initialDraft: SessionDraft,
): SessionDraft {
  return {
    ...existingDraft,
    workoutId: initialDraft.workoutId,
    workoutName: initialDraft.workoutName,
    exercises: initialDraft.exercises.map((initialExercise) => {
      const existingExercise = existingDraft.exercises.find(
        (exercise) => exercise.sessionExerciseId === initialExercise.sessionExerciseId,
      )

      if (!existingExercise) {
        return initialExercise
      }

      return {
        ...existingExercise,
        name: initialExercise.name,
        sets: initialExercise.sets.map((initialSet) => {
          const existingSet = existingExercise.sets.find(
            (loggedSet) => loggedSet.setIndex === initialSet.setIndex,
          )

          if (!existingSet) {
            return initialSet
          }

          return {
            ...existingSet,
            weight: existingSet.weight === 0 ? initialSet.weight : existingSet.weight,
            reps: existingSet.reps === 0 ? initialSet.reps : existingSet.reps,
            rir: existingSet.rir === 0 ? initialSet.rir : existingSet.rir,
            status: existingSet.status === 'unlogged' ? initialSet.status : existingSet.status,
          }
        }),
      }
    }),
  }
}

function clampMetricValue(metric: MetricName, value: number) {
  if (metric === 'weight') {
    return Math.max(0, Number(value.toFixed(1)))
  }

  return Math.max(0, Math.trunc(value))
}

export const useSessionLogStore = create<SessionLogState>()(
  persist(
    (set, get) => ({
      draftsBySessionId: {},

      initializeSessionDraft: (data) => {
        const initialDraft = buildDraftFromSession(data)
        const existingDraft = get().draftsBySessionId[data.sessionId]

        set((state) => ({
          draftsBySessionId: {
            ...state.draftsBySessionId,
            [data.sessionId]: existingDraft
              ? mergeDraftWithInitialValues(existingDraft, initialDraft)
              : initialDraft,
          },
        }))
      },

      setMetricValue: (sessionId, sessionExerciseId, setIndex, metric, value) => {
        set((state) => {
          const draft = state.draftsBySessionId[sessionId]
          if (!draft) return state

          return {
            draftsBySessionId: {
              ...state.draftsBySessionId,
              [sessionId]: {
                ...draft,
                exercises: draft.exercises.map((exercise) => {
                  if (exercise.sessionExerciseId !== sessionExerciseId) return exercise

                  return {
                    ...exercise,
                    sets: exercise.sets.map((loggedSet) => {
                      if (loggedSet.setIndex !== setIndex) return loggedSet

                      return {
                        ...loggedSet,
                        [metric]: clampMetricValue(metric, value),
                      }
                    }),
                  }
                }),
              },
            },
          }
        })
      },

      adjustMetricValue: (sessionId, sessionExerciseId, setIndex, metric, delta) => {
        const draft = get().draftsBySessionId[sessionId]
        if (!draft) return

        const exercise = draft.exercises.find(
          (currentExercise) => currentExercise.sessionExerciseId === sessionExerciseId,
        )
        const loggedSet = exercise?.sets.find((currentSet) => currentSet.setIndex === setIndex)
        const currentValue = loggedSet?.[metric] ?? 0

        get().setMetricValue(sessionId, sessionExerciseId, setIndex, metric, currentValue + delta)
      },

      markSetStatus: (sessionId, sessionExerciseId, setIndex, status) => {
        set((state) => {
          const draft = state.draftsBySessionId[sessionId]
          if (!draft) return state

          return {
            draftsBySessionId: {
              ...state.draftsBySessionId,
              [sessionId]: {
                ...draft,
                exercises: draft.exercises.map((exercise) => {
                  if (exercise.sessionExerciseId !== sessionExerciseId) return exercise

                  return {
                    ...exercise,
                    sets: exercise.sets.map((loggedSet) => {
                      if (loggedSet.setIndex !== setIndex) return loggedSet

                      return {
                        ...loggedSet,
                        status,
                      }
                    }),
                  }
                }),
              },
            },
          }
        })
      },

      clearSessionDraft: (sessionId) => {
        set((state) => {
          const nextDrafts = { ...state.draftsBySessionId }
          delete nextDrafts[sessionId]

          return {
            draftsBySessionId: nextDrafts,
          }
        })
      },
    }),
    {
      name: 'session-log-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        draftsBySessionId: state.draftsBySessionId,
      }),
    },
  ),
)
