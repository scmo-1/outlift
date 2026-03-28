import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type WorkoutCardProps = {
  title: string
  sets: string
  historyLabel?: string
  children: React.ReactNode
}

function WorkoutCard({ title, sets, historyLabel, children }: WorkoutCardProps) {
  return (
    <Card className="gap-0 border-border py-3">
      <CardHeader className="grid-cols-[1fr_auto] items-center gap-3 px-4 pb-0">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <CardAction className="text-sm font-medium text-muted-foreground">{sets}</CardAction>
      </CardHeader>
      <CardContent className="px-4 pt-4">
        {historyLabel ? (
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {historyLabel}
          </p>
        ) : null}
        {children}
      </CardContent>
    </Card>
  )
}

export default WorkoutCard
