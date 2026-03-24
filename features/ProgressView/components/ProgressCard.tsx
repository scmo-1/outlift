import type { ProgressHistoryItem } from '@/types/progression'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import clsx from 'clsx'

type ProgressCardProps = {
  data: ProgressHistoryItem[]
}

function ProgressCard({ data }: ProgressCardProps) {
  const firstItem = data[0] ?? null
  const latestItem = data.at(-1) ?? null

  const comparison =
    latestItem && firstItem ? Math.round((latestItem.e1rm - firstItem.e1rm) * 100) / 100 : null

  const comparisonLabel =
    comparison === null ? 'NONE' : comparison > 0 ? `+${comparison}` : comparison.toString()

  const comparisonStyle = clsx({
    'text-green-300': comparison !== null && comparison > 0,
    'text-red-300': comparison !== null && comparison < 0,
    'text-muted-foreground': comparison === null || comparison === 0,
  })
  const divStyle = cn('bg-secondary text-secondary-foreground rounded-xl flex flex-col gap-1 p-2')

  return (
    <Card>
      <CardTitle>Progression</CardTitle>
      <CardContent className="flex justify-around">
        <div className={divStyle}>
          <span className="text-xs">Current:</span>
          <span>{latestItem?.e1rm}</span>
        </div>
        <div className={divStyle}>
          <span className="text-xs">Start:</span>
          <span>{firstItem.e1rm}</span>
        </div>
        <div className={divStyle}>
          <span className="text-xs">Change:</span>
          <span className={comparisonStyle}>{comparisonLabel}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProgressCard
