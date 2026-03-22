import type { ProgramWithDetails } from '@/types/programs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
  program: ProgramWithDetails
}

function ActiveProgramCard({ program }: Props) {
  return (
    <Card className="gap-0 py-3">
      <CardHeader className="px-3 pb-0">
        <CardTitle className="text-base font-semibold">{program.name}</CardTitle>
      </CardHeader>
      <CardContent className="px-3 pt-3">
        <ul className="space-y-2">
          {program.workouts.map((workout) => (
            <li
              key={workout.id}
              className="flex flex-col gap-2 rounded-xl border border-border bg-muted/40 p-3"
            >
              <span className="font-medium">{workout.name}</span>
              <div className="rounded-lg bg-muted px-2 py-2 text-sm text-muted-foreground">
                <p className="line-clamp-1 truncate">
                  {workout.plannedExercises.map((ex) => ex.exercise.name).join(', ')}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="px-3 pt-3">
        <Button variant="outline" className="w-full uppercase">
          view details
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ActiveProgramCard
