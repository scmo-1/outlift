import type { WorkoutDetailsExercise } from '@/types/workouts'
import WorkoutCard from './WorkoutCard'
import { Badge } from '@/components/ui/badge'
import { ArrowLeftRight } from 'lucide-react'

type WorkoutListProps = {
  exercises: WorkoutDetailsExercise[]
  previousLimit?: number
}

function WorkoutList({ exercises, previousLimit = 1 }: WorkoutListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {exercises.map((exercise) => {
        const previousSessions = exercise.previous.slice(0, previousLimit)

        return (
          <li key={exercise.id}>
            <WorkoutCard title={exercise.name} sets={`${exercise.sets}x${exercise.repGoal}`}>
              {previousSessions.length === 0 ? (
                <p className="text-sm text-muted-foreground">No history...</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {previousSessions.map((session) => (
                    <div key={session.sessionId} className="flex flex-col gap-2">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{session.endedAt?.slice(0, 10)}</Badge>
                        {session.substitutedExerciseName && (
                          <Badge variant="outline">
                            <ArrowLeftRight />
                            {session.substitutedExerciseName}
                          </Badge>
                        )}
                      </div>
                      <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
                        {session.sets.map((set) => (
                          <li key={set.setIndex}>
                            {set.setIndex}: {set.reps}x{set.weight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </WorkoutCard>
          </li>
        )
      })}
    </ul>
  )
}

export default WorkoutList
