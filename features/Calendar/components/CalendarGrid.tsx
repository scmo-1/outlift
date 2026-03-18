'use client'
import clsx from 'clsx'
import type { CalendarDay } from '@/types/Calendar'
type CalendarGridProps = {
  data: CalendarDay[]
}

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

function CalendarGrid({ data }: CalendarGridProps) {
  return (
    <div className="grid grid-cols-7 auto-rows-auto gap-2 p-2">
      {weekdays.map((wd, index) => (
        <span key={index} className="text-xs font-bold text-center uppercase">
          {wd}
        </span>
      ))}
      {data.map((day) => (
        <div key={day.date} className="bg-card rounded-lg p-1 flex flex-col items-center gap-1">
          <span>{day.dayNumber}</span>
          <span
            className={clsx(
              'w-1/2 h-1 rounded-full',
              day.hasSession ? 'bg-green-300' : 'bg-neutral-600',
            )}
          />
        </div>
      ))}
    </div>
  )
}

export default CalendarGrid
