'use client'
import { useState } from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import {
  DialogTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { CalendarMonthData } from '@/types/Calendar'

// const endpoint = `/api/calendar?month=${}&year=${}`

type CalendarProps = {
  initialData: CalendarMonthData
}

function Calendar({ initialData }: CalendarProps) {
  const [calendarData, setCalendarData] = useState<CalendarMonthData>(initialData)

  console.log(calendarData)

  return (
    <Dialog>
      <DialogTrigger>
        <CalendarIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Calendar</DialogTitle>
          <DialogClose />
        </DialogHeader>
        Calendar
      </DialogContent>
    </Dialog>
  )
}

export default Calendar
