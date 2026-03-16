import { getProfile } from '@/lib/auth/getProfile'
import { getTodayPageData } from '@/lib/services/getTodayPageData'

export default async function TodayPage() {
  const profile = await getProfile()
  const data = await getTodayPageData(profile.id)
  const workout = data.nextWorkoutDetails

  console.log(workout)

  return (
    <div>
      <h1>weclome {profile.username}</h1>
      <div className="bg-amber-700">scedule</div>
      <h2 className="">next session</h2>
      <span>{workout.name}</span>
    </div>
  )
}
