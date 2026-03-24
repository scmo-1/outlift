'use client'
import type { ProgressViewData } from '@/types/progression'
import ProgressCard from './ProgressCard'
import ProgressChart from './ProgressChart'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type PageData = {
  data: ProgressViewData
}

function StatsSection({ data }: PageData) {
  const [selected, setSelected] = useState(data.exerciseOptions[0]?.exerciseId ?? '')

  const handleSelect = (value: string) => {
    setSelected(value)
  }

  const filteredHistory = data.history.filter((item) => item.exerciseId === selected)
  const chartData = filteredHistory.map((item) => ({
    date: new Date(item.endedAt).toLocaleDateString('sv-SE', {
      month: 'short',
      day: 'numeric',
    }),
    e1rm: item.e1rm,
  }))

  return (
    <div className="flex flex-col gap-5">
      <Select value={selected} onValueChange={handleSelect}>
        <SelectTrigger className="w-full sm:w-64 my-5">
          <SelectValue placeholder="select a exercise" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Exercises</SelectLabel>
            {data.exerciseOptions.map((exercise) => (
              <SelectItem key={exercise.exerciseId} value={exercise.exerciseId}>
                {exercise.exerciseName}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <ProgressCard data={filteredHistory} />
      <ProgressChart data={chartData} />
    </div>
  )
}

export default StatsSection
