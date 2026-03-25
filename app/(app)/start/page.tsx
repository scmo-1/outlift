import { getProfile } from '@/lib/auth/getProfile'
import { getStartPageData } from '@/lib/services/getStartPageData'
import WorkoutList from '@/features/StartPage/WorkoutList'
import { getCalendarData } from '@/lib/services/getCalendarData'
import Calendar from '@/features/StartPage/Calendar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import StartSessionButton from '@/features/StartPage/Components/StartSessionButton'

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
  const hasWorkout = data.workout !== null

  return (
    <div className="flex flex-col gap-5 pt-5 pb-20">
      <h1>weclome {profile.username}</h1>
      <div className="flex justify-between">
        <h2>{hasWorkout ? data.workout.name : 'no program created yet'}</h2>
        <Calendar initialData={initialCalendarData} />
      </div>
      {data.mode === 'completed' && (
        <Link href="/start">
          <Button variant="outline">back to today</Button>
        </Link>
      )}
      {hasWorkout ? (
        <>
          <WorkoutList exercises={data.workout.exercises} previousLimit={1} />
          {data.mode === 'default' && <StartSessionButton />}
        </>
      ) : (
        <div className="flex flex-col gap-4 rounded-lg border border-dashed p-5">
          <p className="text-sm text-muted-foreground">
            No program created yet. Create your first program to start tracking workouts.
          </p>
          <Link href="/create" className="w-full">
            <Button className="w-full">Create program</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
