'use client'

import { useState, useTransition } from 'react'
import type { SessionPageSetHistory } from '@/types/sessionPage'
import LogInput from './LogInput'
import { useSessionLogStore } from '../store/useSessionLogStore'
import { Button } from '@/components/ui/button'
import { logSetAction } from '@/app/(session)/actions'

type SetLoggerProps = {
  sessionId: string
  sessionExerciseId: string
  setIndex: number
  history: SessionPageSetHistory[]
}

function SetLogger({ sessionId, sessionExerciseId, setIndex, history }: SetLoggerProps) {
  const [isPending, startTransition] = useTransition()
  const [saveState, setSaveState] = useState<'idle' | 'saved' | 'error'>('idle')

  const loggedSet = useSessionLogStore((state) => {
    const exercise = state.draftsBySessionId[sessionId]?.exercises.find(
      (currentExercise) => currentExercise.sessionExerciseId === sessionExerciseId,
    )

    return exercise?.sets.find((currentSet) => currentSet.setIndex === setIndex)
  })

  const setMetricValue = useSessionLogStore((state) => state.setMetricValue)
  const adjustMetricValue = useSessionLogStore((state) => state.adjustMetricValue)
  const markSetStatus = useSessionLogStore((state) => state.markSetStatus)

  if (!loggedSet) return null

  const handleLogSet = () => {
    setSaveState('idle')

    startTransition(async () => {
      try {
        await logSetAction({
          sessionId,
          sessionExerciseId,
          setIndex,
          status: 'completed',
          weight: loggedSet.weight,
          reps: loggedSet.reps,
          rir: loggedSet.rir,
        })
        markSetStatus(sessionId, sessionExerciseId, setIndex, 'completed')
        setSaveState('saved')
      } catch {
        setSaveState('error')
      }
    })
  }

  const handleSkipSet = () => {
    setSaveState('idle')

    startTransition(async () => {
      try {
        await logSetAction({
          sessionId,
          sessionExerciseId,
          setIndex,
          status: 'skipped',
          weight: null,
          reps: null,
          rir: null,
        })
        markSetStatus(sessionId, sessionExerciseId, setIndex, 'skipped')
        setSaveState('saved')
      } catch {
        setSaveState('error')
      }
    })
  }

  return (
    <div className="pt-1">
      <div className="grid gap-4 md:grid-cols-3">
        <LogInput
          label="Weight"
          inputValue={loggedSet.weight}
          step={2.5}
          onChange={(value) =>
            setMetricValue(sessionId, sessionExerciseId, setIndex, 'weight', value)
          }
          onIncrement={() =>
            adjustMetricValue(sessionId, sessionExerciseId, setIndex, 'weight', 2.5)
          }
          onDecrement={() =>
            adjustMetricValue(sessionId, sessionExerciseId, setIndex, 'weight', -2.5)
          }
        />
        <LogInput
          label="Reps"
          inputValue={loggedSet.reps}
          onChange={(value) => setMetricValue(sessionId, sessionExerciseId, setIndex, 'reps', value)}
          onIncrement={() => adjustMetricValue(sessionId, sessionExerciseId, setIndex, 'reps', 1)}
          onDecrement={() => adjustMetricValue(sessionId, sessionExerciseId, setIndex, 'reps', -1)}
        />
        <LogInput
          label="RIR"
          inputValue={loggedSet.rir}
          onChange={(value) => setMetricValue(sessionId, sessionExerciseId, setIndex, 'rir', value)}
          onIncrement={() => adjustMetricValue(sessionId, sessionExerciseId, setIndex, 'rir', 1)}
          onDecrement={() => adjustMetricValue(sessionId, sessionExerciseId, setIndex, 'rir', -1)}
        />
      </div>
      {history.length > 0 ? (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">History</h3>
          <ul className="space-y-2">
            {history.slice(0, 3).map((historyItem) => (
              <li
                key={historyItem.sessionId}
                className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground"
              >
                {historyItem.status === 'skipped'
                  ? 'Skipped'
                  : `${historyItem.weight} kg x ${historyItem.reps} reps @ RIR ${historyItem.rir}`}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="mt-4 flex items-center gap-3">
        <Button type="button" onClick={handleLogSet} disabled={isPending}>
          {isPending ? 'Saving...' : 'Log set'}
        </Button>
        <Button type="button" variant="outline" onClick={handleSkipSet} disabled={isPending}>
          {isPending ? 'Saving...' : 'Skip set'}
        </Button>
        {saveState === 'saved' ? <p className="text-sm text-muted-foreground">Set saved.</p> : null}
        {saveState === 'error' ? (
          <p className="text-sm text-destructive">Could not save set.</p>
        ) : null}
      </div>
    </div>
  )
}

export default SetLogger
