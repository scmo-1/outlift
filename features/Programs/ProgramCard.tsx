import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type ProgramCardProps = {
  name: string
  id: string
}

const buttonClass = cn('uppercase w-full')

function ProgramsCard({ name }: ProgramCardProps) {
  return (
    <div className="flex flex-col gap-3 p-3 bg-card rounded-xl ">
      <h4>{name}</h4>
      <div className="w-full flex flex-col gap-3 mt-3">
        <Link href="/">
          <Button className={buttonClass} variant="default">
            start program
          </Button>
        </Link>
        <Link href="/">
          <Button className={buttonClass} variant="outline">
            view details
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ProgramsCard
