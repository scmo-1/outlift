import { getProfile } from '@/lib/auth/getProfile'
import { getTodayPageData } from '@/lib/services/getTodayPageData'
import { WorkoutList } from '@/features/Workouts'

export default async function TodayPage() {
  const profile = await getProfile()
  const data = await getTodayPageData(profile.id)

  return (
    <div>
      <h1>weclome {profile.username}</h1>
      <div className="bg-blue-700">scedule</div>
      <h2 className="">next session</h2>
      <WorkoutList exercises={data.nextWorkoutDetails.exercises} previousLimit={1} />
    </div>
  )
}
