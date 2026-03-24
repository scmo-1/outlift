'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ProgressViewData } from '@/types/progression'
import StatsSection from './components/StatsSection'
import { useRouter } from 'next/navigation'

type PageData = {
  data: ProgressViewData
}

function ProgressView({ data }: PageData) {
  const router = useRouter()

  const onScopeChange = (value: string) => {
    if (value === 'allTime') {
      router.replace('/progression?scope=allTime')
    } else {
      router.replace('/progression')
    }
  }

  return (
    <div className="w-full flex flex-col ">
      <Tabs defaultValue={data.scope} onValueChange={onScopeChange}>
        <TabsList>
          <TabsTrigger value="activeProgram">Current Program</TabsTrigger>
          <TabsTrigger value="allTime"> All Time Best</TabsTrigger>
        </TabsList>
      </Tabs>
      <StatsSection data={data} />
    </div>
  )
}

export default ProgressView
