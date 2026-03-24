import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type ProgramCardProps = {
  name: string
  id: string
  activateProgramAction: (programId: string) => Promise<void>
}

const buttonClass = cn('uppercase w-full')

function ProgramsCard({ name, id, activateProgramAction }: ProgramCardProps) {
  return (
    <Card className="gap-0 py-3">
      <CardHeader className="px-3 pb-0">
        <CardTitle className="text-base font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="px-3 pt-3">
        <div className="flex w-full flex-col gap-3">
          <form action={activateProgramAction.bind(null, id)}>
            <Button className={buttonClass} variant="default" type="submit">
              start program
            </Button>
          </form>
          <Link href="/">
            <Button className={buttonClass} variant="outline">
              view details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProgramsCard
