import type { CalendarMonthData, CalendarDay } from '@/types/Calendar'
import { formatDateKey, formatMonthLabel } from '../utils/date'
import { listCompletedSessionsByMonth } from '../DB/sessions'
import { getMonthStart, getNextMonthStart } from '../utils/date'

type GetCalendarDataParams = {
  profileId: string
  year: number
  month: number
}

export async function getCalendarData({
  profileId,
  year,
  month,
}: GetCalendarDataParams): Promise<CalendarMonthData> {
  const from = getMonthStart(year, month)
  const to = getNextMonthStart(year, month)

  const sessions = await listCompletedSessionsByMonth(profileId, from, to)

  const sessionByDate = new Map<string, string>()

  for (const session of sessions) {
    const dateKey = session.ended_at.slice(0, 10)
    if (!sessionByDate.has(dateKey)) {
      sessionByDate.set(dateKey, session.id)
    }
  }

  const daysInMonth = new Date(year, month, 0).getDate()

  const days: CalendarDay[] = Array.from({ length: daysInMonth }, (_, index) => {
    const dayNumber = index + 1
    const date = new Date(year, month - 1, dayNumber)

    const dateKey = formatDateKey(date)
    const sessionId = sessionByDate.get(dateKey) ?? null
    return {
      date: dateKey,
      dayNumber,
      hasSession: sessionId !== null,
      sessionId,
    }
  })

  return {
    monthLabel: formatMonthLabel(year, month),
    year,
    month,
    days,
  }
}
