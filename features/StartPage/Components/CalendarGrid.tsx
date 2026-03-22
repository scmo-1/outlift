'use client'
import clsx from 'clsx'
import { cn } from '@/lib/utils'
import type { CalendarDay } from '@/types/Calendar'
import Link from 'next/link'
import { DialogClose } from '@/components/ui/dialog'
type CalendarGridProps = {
  data: CalendarDay[]
}

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

const dayStyle = cn('bg-card rounded-lg p-1 flex flex-col items-center gap-1')
const marker = cn('w-1/2 h-1 rounded-full')

function CalendarGrid({ data }: CalendarGridProps) {
  return (
    <div className="grid grid-cols-7 auto-rows-auto gap-2 p-2">
      {weekdays.map((wd, index) => (
        <span key={index} className="text-xs font-bold text-center uppercase">
          {wd}
        </span>
      ))}
      {data.map((day) => {
        if (day.hasSession) {
          return (
            <DialogClose asChild key={day.dayNumber}>
              <Link href={`/start?sessionId=${day.sessionId}`} className={clsx(dayStyle)}>
                <span>{day.dayNumber}</span>
                <span className={clsx(marker, 'bg-green-300')} />
              </Link>
            </DialogClose>
          )
        } else {
          return (
            <div key={day.dayNumber} className={clsx(dayStyle)}>
              <span>{day.dayNumber}</span>
              <span className={clsx(marker, 'bg-neutral-600')} />
            </div>
          )
        }
      })}
    </div>
  )
}

export default CalendarGrid
