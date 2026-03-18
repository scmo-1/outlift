import { getProfile } from '@/lib/auth/getProfile'
import { getStartPageData } from '@/lib/services/getStartPageData'
import { WorkoutList } from '@/features/Workouts'

export default async function StartPage() {
  const profile = await getProfile()

  const data = await getStartPageData({ profileId: profile.id })

  return (
    <div>
      <h1>weclome {profile.username}</h1>
      <div className="bg-blue-700">schedule</div>
      <span></span>
      <WorkoutList exercises={data.workout.exercises} previousLimit={1} />
    </div>
  )
}
