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
            <span className="line-clamp-1 truncate w-full overflow-x-scroll p-2 bg-sidebar-accent rounded-xl">
              <p className="text-sm">
                {workout.plannedExercises.map((ex) => ex.exercise.name).join(', ')}
              </p>
            </span>
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
