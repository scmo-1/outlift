'use client'
import type { ProgressViewData } from '@/types/progression'
import ProgressCard from './ProgressCard'
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

  return (
    <>
      <Select value={selected} onValueChange={handleSelect}>
        <SelectTrigger>
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
    </>
  )
}

export default StatsSection
