import { listAllExercises } from '@/lib/DB/exercises'
import { getSessionDetailsById } from '@/lib/DB/sessions'
import { getCalendarData } from '@/lib/services/getCalendarData'

export async function test() {
  const profile = '6addaca3-fcc0-4df1-9dd0-b0e992112fa9'
  const exercises = await listAllExercises()
  const session = await getSessionDetailsById(
    '4c179447-5c59-424f-8590-1584282ffdc7',
    '6addaca3-fcc0-4df1-9dd0-b0e992112fa9',
  )

  const sessions = await getCalendarData({ profileId: profile, year: 2026, month: 3 })
  console.log(sessions)

  return <pre>{JSON.stringify(exercises)}</pre>
}

export default test
