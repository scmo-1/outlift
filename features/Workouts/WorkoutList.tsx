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
                <p className="text-xs">No history...</p>
              ) : (
                previousSessions.map((session) => (
                  <div key={session.sessionId} className="flex flex-col gap-1 mt-1">
                    <div className="flex gap-1">
                      <Badge variant="outline">{session.endedAt?.slice(0, 10)}</Badge>
                      {session.substitutedExerciseName && (
                        <Badge variant="outline">
                          <ArrowLeftRight />
                          {session.substitutedExerciseName}
                        </Badge>
                      )}
                    </div>
                    <ul className="flex gap-2 ">
                      {session.sets.map((set) => (
                        <li key={set.setIndex}>
                          {set.setIndex}: {set.reps}x{set.weight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </WorkoutCard>
          </li>
        )
      })}
    </ul>
  )
}

export default WorkoutList
