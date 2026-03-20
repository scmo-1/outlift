import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type WorkoutCardProps = {
  title: string
  sets: string
  children: React.ReactNode
}

function WorkoutCard({ title, sets, children }: WorkoutCardProps) {
  return (
    <Card className="gap-0 border-border py-3">
      <CardHeader className="grid-cols-[1fr_auto] items-center gap-3 px-3 pb-0">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        <CardAction className="text-sm font-medium text-muted-foreground">{sets}</CardAction>
      </CardHeader>
      <CardContent className="px-3 pt-3">{children}</CardContent>
    </Card>
  )
}

export default WorkoutCard
