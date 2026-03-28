'use client'
import type { SessionPageData } from '@/types/sessionPage'
import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Accordion } from '@/components/ui/accordion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import Paginator from '../Paginator/Paginator'
import SetLogger from './components/SetLogger'
import SetAccordionItem from './components/SetAccordionItem'
import { useSessionLogStore } from './store/useSessionLogStore'
import { endSessionAction } from '@/app/(session)/actions'

type SessionLogData = {
  data: SessionPageData
}
function SessionLogPage({ data }: SessionLogData) {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)
  const [openSetValue, setOpenSetValue] = useState<string>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const initializeSessionDraft = useSessionLogStore((state) => state.initializeSessionDraft)
  const clearSessionDraft = useSessionLogStore((state) => state.clearSessionDraft)
  const draft = useSessionLogStore((state) => state.draftsBySessionId[data.sessionId])

  useEffect(() => {
    initializeSessionDraft(data)
  }, [data, initializeSessionDraft])

  const activeExercise = data.exercises[activeIndex]
  const activeDraftExercise = draft?.exercises.find(
    (exercise) => exercise.sessionExerciseId === activeExercise.sessionExerciseId,
  )
  const allSetsHandled = draft
    ? draft.exercises.every((exercise) =>
        exercise.sets.every((set) => set.status === 'completed' || set.status === 'skipped'),
      )
    : false

  useEffect(() => {
    const firstUnloggedSet = activeDraftExercise?.sets.find((set) => set.status === 'unlogged')
    const fallbackSet = activeExercise.sets[0]

    setOpenSetValue(
      firstUnloggedSet
        ? `set-${firstUnloggedSet.setIndex}`
        : fallbackSet
          ? `set-${fallbackSet.setIndex}`
          : undefined,
    )
  }, [activeIndex, activeExercise.sessionExerciseId])

  const handleNext = () => {
    if (activeIndex >= data.exercises.length - 1) return
    setActiveIndex((prev) => prev + 1)
  }

  const handlePrevious = () => {
    if (activeIndex <= 0) return
    setActiveIndex((prev) => prev - 1)
  }

  const handleEndSession = () => {
    startTransition(async () => {
      await endSessionAction(data.sessionId)
      clearSessionDraft(data.sessionId)
      setIsDialogOpen(false)
      router.replace('/start')
    })
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
      <Paginator
        pages={data.exercises.length}
        currentPage={activeIndex}
        onPageChange={setActiveIndex}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{data.workoutName}</p>
        <h1 className="text-2xl font-semibold">{activeExercise.name}</h1>
      </div>
      <Accordion
        type="single"
        collapsible
        value={openSetValue}
        onValueChange={setOpenSetValue}
        className="space-y-3"
      >
        {activeExercise.sets.map((set) => {
          const draftSet = activeDraftExercise?.sets.find(
            (currentSet) => currentSet.setIndex === set.setIndex,
          )

          return (
            <SetAccordionItem
              key={`${activeExercise.sessionExerciseId}-${set.setIndex}`}
              value={`set-${set.setIndex}`}
              setNumber={set.setIndex}
              status={draftSet?.status ?? 'unlogged'}
            >
              <SetLogger
                sessionId={data.sessionId}
                sessionExerciseId={activeExercise.sessionExerciseId}
                setIndex={set.setIndex}
                history={set.history}
              />
            </SetAccordionItem>
          )
        })}
      </Accordion>
      <div className="flex justify-end">
        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(true)}>
          End session
        </Button>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>End session</DialogTitle>
            <DialogDescription>
              {allSetsHandled
                ? 'Workout done? Are you sure you want to end this session?'
                : 'You have not logged all sets for this session. Are you sure you want to end this workout?'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleEndSession} disabled={isPending}>
              {isPending ? 'Ending...' : 'End session'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SessionLogPage
