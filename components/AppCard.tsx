import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import clsx from 'clsx'

type CardProps = {
  title: string
  extra?: React.ReactNode
  children?: React.ReactNode
}

function AppCard({ title, extra, children }: CardProps) {
  return (
    <Card className="border-0 border-b border-accent p-3 font-sans gap-0">
      <CardHeader className="border-border flex gap-2 w-full px-0 items-baseline m-0">
        <CardTitle className="w-full text-nowrap font-semibold">{title}</CardTitle>
        <span className={clsx(extra ?? 'h-full w-full border-b border-dashed')} />
        <span>{extra}</span>
      </CardHeader>
      <CardContent className="p-1 bg-secondary mt-2">{children}</CardContent>
    </Card>
  )
}

export default AppCard
