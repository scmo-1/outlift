'use client'
import { Button } from '@/components/ui/button'
import type { ExerciseDraft, ExerciseItem } from '@/types/createProgram'
import ExerciseForm from './ExerciseForm'

type ExercisesListProps = {
  exerciseOptions: ExerciseItem[]
  exercises: ExerciseDraft[]
  onAddExercise: () => void
  onExerciseChange: (
    exerciseIndex: number,
    patch: Partial<Pick<ExerciseDraft, 'exerciseId'>>,
  ) => void
  onExerciseSetsChange: (exerciseIndex: number, value: number) => void
  onRepGoalChange: (exerciseIndex: number, setIndex: number, value: number) => void
  onMoveExercise: (exerciseIndex: number, direction: 'up' | 'down') => void
  onRemoveExercise: (exerciseIndex: number) => void
}

function ExercisesList({
  exerciseOptions,
  exercises,
  onAddExercise,
  onExerciseChange,
  onExerciseSetsChange,
  onRepGoalChange,
  onMoveExercise,
  onRemoveExercise,
}: ExercisesListProps) {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {exercises.map((exercise, index) => (
        <ExerciseForm
          key={exercise.id}
          exercise={exercise}
          exerciseIndex={index}
          exerciseOptions={exerciseOptions}
          canMoveUp={index > 0}
          canMoveDown={index < exercises.length - 1}
          onExerciseChange={onExerciseChange}
          onExerciseSetsChange={onExerciseSetsChange}
          onRepGoalChange={onRepGoalChange}
          onMoveExercise={onMoveExercise}
          onRemoveExercise={onRemoveExercise}
        />
      ))}
      <Button type="button" variant="outline" onClick={onAddExercise}>
        Add exercise
      </Button>
    </div>
  )
}

export default ExercisesList
