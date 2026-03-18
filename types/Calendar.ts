export type CalendarDay = {
  date: string
  dayNumber: number
  hasSession: boolean
  sessionId: string | null
}

export type CalendarMonthData = {
  monthLabel: string
  year: number
  month: number
  days: CalendarDay[]
}
