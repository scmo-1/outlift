import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { ProgramWithDetails } from '@/types/programs'

type ProgramOverviewProps = {
  program: ProgramWithDetails
}

function ProgramOverview({ program }: ProgramOverviewProps) {
  const firstWorkout = program.workouts[0]

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Program overview</p>
        <h1>{program.name}</h1>
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue={firstWorkout ? `day-${firstWorkout.id}` : undefined}
        className="space-y-3"
      >
        {program.workouts.map((workout) => (
          <AccordionItem
            key={workout.id}
            value={`day-${workout.id}`}
            className="rounded-xl border px-4"
          >
            <AccordionTrigger className="items-center py-4 hover:no-underline">
              <div className="flex flex-col items-start gap-1">
                <span className="text-base font-semibold">Day {workout.order_index}</span>
                <span className="text-sm text-muted-foreground">{workout.name}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <ul className="flex flex-col gap-3">
                {workout.plannedExercises.map((exercise) => (
                  <li
                    key={exercise.id}
                    className="rounded-lg border border-border/70 bg-muted/20 px-3 py-3"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{exercise.exercise.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {exercise.sets} sets x goal {exercise.rep_goal} reps
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default ProgramOverview
