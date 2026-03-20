import type { ProgramWithDetails } from '@/types/programs'
import { Button } from '@/components/ui/button'

type Props = {
  program: ProgramWithDetails
}

function ActiveProgramCard({ program }: Props) {
  return (
    <div className="bg-card p-3 border border-accent rounded-xl">
      <h3 className="font-semibold mb-3">{program.name}</h3>
      <ul className="space-y-2">
        {program.workouts.map((workout) => (
          <li
            key={workout.id}
            className="p-2 bg-secondary rounded-xl border-b border-b-accent flex flex-col gap-2"
          >
            <span>{workout.name}</span>
            <p className="text-sm line-clamp-1 truncate">
              {workout.plannedExercises.map((ex) => ex.exercise.name).join(', ')}
            </p>
          </li>
        ))}
      </ul>
      <Button variant="outline" className="w-full mt-6 uppercase">
        view details
      </Button>
    </div>
  )
}

export default ActiveProgramCard
