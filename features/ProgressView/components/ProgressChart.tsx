import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

const chartConfig = {
  e1rm: {
    label: 'e1RM',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

type ProgressChartProps = {
  data: {
    date: string
    e1rm: number
  }[]
}

export function ProgressChart({ data }: ProgressChartProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
        No progression data available for this exercise yet.
      </div>
    )
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-45 w-full">
      <LineChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          dataKey="e1rm"
          type="monotone"
          stroke="var(--color-e1rm)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}

export default ProgressChart
