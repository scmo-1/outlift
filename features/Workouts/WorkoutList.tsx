import type { WorkoutDetailsExercise } from '@/types/workouts'
import WorkoutCard from './WorkoutCard'

type WorkoutListProps = {
  exercises: WorkoutDetailsExercise[]
}

function WorkoutList({ exercises }: WorkoutListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {exercises.map((exercise) => (
        <li key={exercise.id}>
          <WorkoutCard title={exercise.name} sets={`${exercise.sets}x${exercise.repGoal}`}>
            {exercise.previous.length === 0 ? (
              <p>No history</p>
            ) : (
              exercise.previous.map((sesh) => (
                <div key={sesh.endedAt}>
                  <span>{sesh.endedAt}</span>
                  {sesh.substitutedExerciseName && <span>{sesh.substitutedExerciseName}</span>}
                  <ul>
                    {sesh.sets.map((set) => (
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
      ))}
    </ul>
  )
}

export default WorkoutList
