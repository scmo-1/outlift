'use client'
import type { SessionPageData } from '@/types/sessionPage'
import { useState } from 'react'
import Paginator from '../Paginator/Paginator'

type SessionLogData = {
  data: SessionPageData
}
function SessionLogPage({ data }: SessionLogData) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeExercise = data.exercises[activeIndex]

  const handleNext = () => {
    if (activeIndex >= data.exercises.length - 1) return
    setActiveIndex((prev) => prev + 1)
  }

  const handlePrevious = () => {
    if (activeIndex <= 0) return
    setActiveIndex((prev) => prev - 1)
  }

  return (
    <div>
      <Paginator
        pages={data.exercises.length}
        currentPage={activeIndex}
        onPageChange={setActiveIndex}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      <h1>{activeExercise.name}</h1>
    </div>
  )
}

export default SessionLogPage
