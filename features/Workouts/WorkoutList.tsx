import type { WorkoutDetailsExercise } from '@/types/workouts'
import WorkoutCard from './WorkoutCard'

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
                  <div key={session.sessionId}>
                    <span>{session.endedAt}</span>

                    {session.substitutedExerciseName && (
                      <span>{session.substitutedExerciseName}</span>
                    )}

                    <ul>
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
