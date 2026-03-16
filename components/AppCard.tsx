import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type CardProps = {
  title: string
  extra?: React.ReactNode
  children?: React.ReactNode
}

function AppCard({ title, extra, children }: CardProps) {
  return (
    <Card className="border-0 border-b border-accent p-3 font-sans">
      <CardHeader className="border-border flex gap-2 w-full px-0 items-baseline">
        <CardTitle className="w-full text-nowrap">{title}</CardTitle>
        <span className="h-full w-full border-b border-dashed" />
        <span className="font-mono">{extra}</span>
      </CardHeader>
      <CardContent className="bg-orange-900">{children}</CardContent>
    </Card>
  )
}

export default AppCard
