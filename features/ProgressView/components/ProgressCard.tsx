import type { ProgressHistoryItem } from '@/types/progression'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import clsx from 'clsx'

type ProgressCardProps = {
  data: ProgressHistoryItem[]
}

function ProgressCard({ data }: ProgressCardProps) {
  const firstItem = data[0] ?? null
  const latestItem = data.at(-1) ?? null

  if (!firstItem || !latestItem) {
    return (
      <Card>
        <CardContent className="text-sm text-muted-foreground">
          No history recorded yet.
        </CardContent>
      </Card>
    )
  }

  const comparison =
    latestItem && firstItem ? Math.round((latestItem.e1rm - firstItem.e1rm) * 100) / 100 : null

  const comparisonLabel =
    comparison === null ? 'NONE' : comparison > 0 ? `+${comparison}` : comparison.toString()

  const comparisonStyle = clsx({
    'text-green-200': comparison !== null && comparison > 0,
    'text-destructive': comparison !== null && comparison < 0,
    'text-muted-foreground': comparison === null || comparison === 0,
  })
  const statCardStyle = cn(
    'rounded-2xl border border-border/70 bg-muted/30 px-3 py-2',
    'flex flex-col gap-1.5',
  )

  return (
    <Card className="border-border/70 bg-card">
      <CardContent className="grid gap-3 p-3 sm:grid-cols-3">
        <div className={statCardStyle}>
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Current
          </span>
          <span className="text-lg font-semibold">{latestItem.e1rm}</span>
        </div>

        <div className={statCardStyle}>
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Start
          </span>
          <span className="text-lg font-semibold text-muted-foreground">{firstItem.e1rm}</span>
        </div>

        <div className={cn(statCardStyle, 'bg-accent/5')}>
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Change
          </span>
          <span className={cn('text-lg font-semibold', comparisonStyle)}>{comparisonLabel}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProgressCard
