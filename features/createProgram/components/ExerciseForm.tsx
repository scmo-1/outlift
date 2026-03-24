import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ExerciseDraft, ExerciseItem } from '@/types/createProgram'
import { ArrowDown, ArrowUp } from 'lucide-react'

type ExerciseFormProps = {
  exercise: ExerciseDraft
  exerciseIndex: number
  exerciseOptions: ExerciseItem[]
  canMoveUp: boolean
  canMoveDown: boolean
  onExerciseChange: (
    exerciseIndex: number,
    patch: Partial<Pick<ExerciseDraft, 'exerciseId'>>,
  ) => void
  onExerciseSetsChange: (exerciseIndex: number, value: number) => void
  onRepGoalChange: (exerciseIndex: number, setIndex: number, value: number) => void
  onMoveExercise: (exerciseIndex: number, direction: 'up' | 'down') => void
  onRemoveExercise: (exerciseIndex: number) => void
}

function ExerciseForm({
  exercise,
  exerciseIndex,
  exerciseOptions,
  canMoveUp,
  canMoveDown,
  onExerciseChange,
  onExerciseSetsChange,
  onRepGoalChange,
  onMoveExercise,
  onRemoveExercise,
}: ExerciseFormProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Exercise {exerciseIndex + 1}</span>
          <span className="text-xs text-muted-foreground">
            Order in workout: {exercise.inWorkoutIndex + 1}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => onMoveExercise(exerciseIndex, 'up')}
            disabled={!canMoveUp}
            aria-label="Move exercise up"
          >
            <ArrowUp />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => onMoveExercise(exerciseIndex, 'down')}
            disabled={!canMoveDown}
            aria-label="Move exercise down"
          >
            <ArrowDown />
          </Button>
        </div>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm">Exercise</span>
        <Select
          value={exercise.exerciseId || undefined}
          onValueChange={(value) => onExerciseChange(exerciseIndex, { exerciseId: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose exercise" />
          </SelectTrigger>
          <SelectContent>
            {exerciseOptions.map((exerciseOption) => (
              <SelectItem key={exerciseOption.id} value={exerciseOption.id}>
                {exerciseOption.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm">Sets</span>
        <Input
          type="number"
          min={0}
          value={exercise.sets.length}
          onChange={(event) => onExerciseSetsChange(exerciseIndex, Number(event.target.value))}
        />
      </label>

      {exercise.sets.length > 0 ? (
        <div className="flex flex-col gap-3">
          <span className="text-sm">Rep goal per set</span>
          {exercise.sets.map((set, setIndex) => (
            <label key={set.setIndex} className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Set {setIndex + 1}</span>
              <Input
                type="number"
                min={0}
                value={set.repGoal}
                onChange={(event) =>
                  onRepGoalChange(exerciseIndex, setIndex, Number(event.target.value))
                }
              />
            </label>
          ))}
        </div>
      ) : null}

      <div className="flex justify-end">
        <Button
          type="button"
          variant="destructive"
          onClick={() => onRemoveExercise(exerciseIndex)}
        >
          Remove
        </Button>
      </div>
    </div>
  )
}

export default ExerciseForm
