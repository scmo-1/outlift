'use client'
import { useState, useTransition } from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { CalendarMonthData } from '@/types/Calendar'
import CalendarGrid from './Components/CalendarGrid'
import Paginator from '../Paginator/Paginator'

type CalendarProps = {
  initialData: CalendarMonthData
}

function Calendar({ initialData }: CalendarProps) {
  const [calendarData, setCalendarData] = useState<CalendarMonthData>(initialData)
  const [isPending, startTransition] = useTransition()

  const currentDate = new Date()
  const currentMonthIndex = currentDate.getFullYear() * 12 + currentDate.getMonth()
  const displayedMonthIndex = calendarData.year * 12 + (calendarData.month - 1)

  const loadMonth = (year: number, month: number) => {
    startTransition(async () => {
      const response = await fetch(`/api/calendar?month=${month}&year=${year}`)

      if (!response.ok) {
        return
      }

      const nextMonthData = (await response.json()) as CalendarMonthData
      setCalendarData(nextMonthData)
    })
  }

  const handlePreviousMonth = () => {
    if (isPending) return

    const previousMonth = new Date(calendarData.year, calendarData.month - 2, 1)
    loadMonth(previousMonth.getFullYear(), previousMonth.getMonth() + 1)
  }

  const handleNextMonth = () => {
    if (isPending || displayedMonthIndex >= currentMonthIndex) return

    const nextMonth = new Date(calendarData.year, calendarData.month, 1)
    loadMonth(nextMonth.getFullYear(), nextMonth.getMonth() + 1)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl">
          <CalendarIcon color="#daebd4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Calendar</DialogTitle>
          <Paginator
            pages={1}
            currentPage={0}
            onPageChange={() => {}}
            onNext={handleNextMonth}
            onPrevious={handlePreviousMonth}
            hidePageLinks
            displayLabel={calendarData.monthLabel}
            disableNext={isPending || displayedMonthIndex >= currentMonthIndex}
            disablePrevious={isPending}
            previousAriaLabel="Go to previous month"
            nextAriaLabel="Go to next month"
          />
        </DialogHeader>
        <CalendarGrid data={calendarData.days} />
      </DialogContent>
    </Dialog>
  )
}

export default Calendar
