import { getCalendarData } from '@/lib/services/getCalendarData'
import { getProfile } from '@/lib/auth/getProfile'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const month = Number(searchParams.get('month'))
  const year = Number(searchParams.get('year'))

  const { id } = await getProfile()

  const data = await getCalendarData({ profileId: id, month: month, year: year })

  return Response.json(data)
}
