'use client'
import { Input } from '@/components/ui/input'
import Paginator from '../Paginator/Paginator'
import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import ExercisesList from './components/ExercisesList'
import type { ExerciseDraft, ExerciseDraftSet, ExerciseItem } from '@/types/createProgram'
import type { ProgramDraft, WorkoutDraft } from '@/types/createProgram'
import { isRedirectError } from 'next/dist/client/components/redirect-error'

type CreatePageProps = {
  exercises: ExerciseItem[]
  createProgramAction: (programDraft: ProgramDraft) => Promise<unknown>
}

const createEmptyWorkout = (index: number): WorkoutDraft => ({
  id: '',
  name: '',
  exercises: [],
  inProgramIndex: index,
})

const createEmptyExercise = (index: number): ExerciseDraft => ({
  id: crypto.randomUUID(),
  exerciseId: '',
  inWorkoutIndex: index,
  sets: [],
  isSaved: false,
})

const createExerciseSets = (count: number, previousSets: ExerciseDraftSet[]): ExerciseDraftSet[] =>
  Array.from({ length: count }, (_, index) => ({
    setIndex: index,
    repGoal: previousSets[index]?.repGoal ?? 0,
  }))

const reindexExercises = (exerciseDrafts: ExerciseDraft[]): ExerciseDraft[] =>
  exerciseDrafts.map((exercise, index) => ({
    ...exercise,
    inWorkoutIndex: index,
    sets: exercise.sets.map((set, setIndex) => ({
      ...set,
      setIndex,
    })),
  }))

function CreateProgramPage({ exercises, createProgramAction }: CreatePageProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isCreateErrorOpen, setIsCreateErrorOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [programDraft, setProgramDraft] = useState<ProgramDraft>({
    name: '',
    workouts: [createEmptyWorkout(0)],
  })

  const handleNextIndex = () => {
    setActiveIndex((prev) => Math.min(prev + 1, programDraft.workouts.length - 1))
  }

  const handlePrevIndex = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleWorkoutAmount = (value: number) => {
    const nextAmount = Math.max(1, value)

    setProgramDraft((prev) => {
      const currentWorkouts = prev.workouts

      if (nextAmount === currentWorkouts.length) {
        return prev
      }

      if (nextAmount > currentWorkouts.length) {
        const newWorkouts = Array.from(
          { length: nextAmount - currentWorkouts.length },
          (_, offset) => createEmptyWorkout(currentWorkouts.length + offset),
        )

        return {
          ...prev,
          workouts: [...currentWorkouts, ...newWorkouts],
        }
      }

      return {
        ...prev,
        workouts: currentWorkouts.slice(0, nextAmount).map((workout, index) => ({
          ...workout,
          inProgramIndex: index,
        })),
      }
    })

    setActiveIndex((prev) => Math.min(prev, nextAmount - 1))
  }

  const handleWorkoutNameChange = (value: string) => {
    setProgramDraft((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout, index) =>
        index === activeIndex ? { ...workout, name: value } : workout,
      ),
    }))
  }

  const updateActiveWorkoutExercises = (
    updateFn: (exerciseDrafts: ExerciseDraft[]) => ExerciseDraft[],
  ) => {
    setProgramDraft((prev) => ({
      ...prev,
      workouts: prev.workouts.map((workout, index) =>
        index === activeIndex
          ? {
              ...workout,
              exercises: reindexExercises(updateFn(workout.exercises)),
            }
          : workout,
      ),
    }))
  }

  const handleAddExercise = () => {
    updateActiveWorkoutExercises((exerciseDrafts) => [
      ...exerciseDrafts,
      createEmptyExercise(exerciseDrafts.length),
    ])
  }

  const handleExerciseChange = (
    exerciseIndex: number,
    patch: Partial<Pick<ExerciseDraft, 'exerciseId'>>,
  ) => {
    updateActiveWorkoutExercises((exerciseDrafts) =>
      exerciseDrafts.map((exercise, index) =>
        index === exerciseIndex ? { ...exercise, ...patch } : exercise,
      ),
    )
  }

  const handleExerciseSetsChange = (exerciseIndex: number, value: number) => {
    const nextSetCount = Math.max(0, value)

    updateActiveWorkoutExercises((exerciseDrafts) =>
      exerciseDrafts.map((exercise, index) =>
        index === exerciseIndex
          ? {
              ...exercise,
              sets: createExerciseSets(nextSetCount, exercise.sets),
            }
          : exercise,
      ),
    )
  }

  const handleRepGoalChange = (exerciseIndex: number, setIndex: number, value: number) => {
    updateActiveWorkoutExercises((exerciseDrafts) =>
      exerciseDrafts.map((exercise, index) =>
        index === exerciseIndex
          ? {
              ...exercise,
              sets: exercise.sets.map((set, currentSetIndex) =>
                currentSetIndex === setIndex ? { ...set, repGoal: value } : set,
              ),
            }
          : exercise,
      ),
    )
  }

  const handleMoveExercise = (exerciseIndex: number, direction: 'up' | 'down') => {
    updateActiveWorkoutExercises((exerciseDrafts) => {
      const targetIndex = direction === 'up' ? exerciseIndex - 1 : exerciseIndex + 1

      if (targetIndex < 0 || targetIndex >= exerciseDrafts.length) {
        return exerciseDrafts
      }

      const nextExercises = [...exerciseDrafts]
      const [movedExercise] = nextExercises.splice(exerciseIndex, 1)
      nextExercises.splice(targetIndex, 0, movedExercise)

      return nextExercises
    })
  }

  const handleRemoveExercise = (exerciseIndex: number) => {
    updateActiveWorkoutExercises((exerciseDrafts) =>
      exerciseDrafts.filter((_, index) => index !== exerciseIndex),
    )
  }

  const handleCreateProgram = () => {
    startTransition(async () => {
      try {
        await createProgramAction(programDraft)
      } catch (error) {
        if (isRedirectError(error)) {
          throw error
        }

        setIsCreateErrorOpen(true)
      }
    })
  }

  const activeWorkout = programDraft.workouts[activeIndex]

  return (
    <>
      <div className="flex flex-col gap-3 w-full pb-30">
        <label>
          Program name
          <Input
            type="text"
            placeholder="name..."
            value={programDraft.name}
            onChange={(e) => setProgramDraft((prev) => ({ ...prev, name: e.target.value }))}
          />
        </label>
        <label>
          amount of workouts
          <Input
            type="number"
            placeholder="amount"
            min={1}
            value={programDraft.workouts.length}
            onChange={(e) => handleWorkoutAmount(Number(e.target.value))}
          />
        </label>
        <Paginator
          pages={programDraft.workouts.length}
          currentPage={activeIndex}
          onNext={handleNextIndex}
          onPrevious={handlePrevIndex}
          onPageChange={setActiveIndex}
        />
        <section>
          <label>
            workout name
            <Input
              type="text"
              placeholder={`Workout ${activeIndex + 1}`}
              value={activeWorkout?.name ?? ''}
              onChange={(e) => handleWorkoutNameChange(e.target.value)}
            />
          </label>
          <ExercisesList
            exerciseOptions={exercises}
            exercises={activeWorkout?.exercises ?? []}
            onAddExercise={handleAddExercise}
            onExerciseChange={handleExerciseChange}
            onExerciseSetsChange={handleExerciseSetsChange}
            onRepGoalChange={handleRepGoalChange}
            onMoveExercise={handleMoveExercise}
            onRemoveExercise={handleRemoveExercise}
          />
        </section>
        <Button type="button" onClick={handleCreateProgram} disabled={isPending}>
          {isPending ? <Spinner /> : null}
          Create Program
        </Button>
      </div>
      <Dialog open={isCreateErrorOpen} onOpenChange={setIsCreateErrorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Could not create program</DialogTitle>
            <DialogDescription>Something went wrong.</DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateProgramPage
