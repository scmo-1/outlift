import { getProfile } from '@/lib/auth/getProfile'
import { getStartPageData } from '@/lib/services/getStartPageData'
import { WorkoutList } from '@/features/Workouts'
import { getCalendarData } from '@/lib/services/getCalendarData'
import Calendar from '@/features/Calendar/Calendar'

type StartPageProps = {
  searchParams: Promise<{
    sessionId?: string
  }>
}
export default async function StartPage({ searchParams }: StartPageProps) {
  const profile = await getProfile()

  const param = await searchParams
  const sessionId = typeof param.sessionId === 'string' ? param.sessionId : undefined

  const data = await getStartPageData({ profileId: profile.id, sessionId: sessionId })
  const date = new Date()
  const initialCalendarData = await getCalendarData({
    profileId: profile.id,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  })

  return (
    <div className="flex flex-col gap-5 pt-5">
      <h1>weclome {profile.username}</h1>
      <div className="flex justify-between">
        <h2>{data.workout.name}</h2>
        <Calendar initialData={initialCalendarData} />
      </div>
      <WorkoutList exercises={data.workout.exercises} previousLimit={1} />
    </div>
  )
}
