'use client'

import { useTransition } from 'react'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { startSessionAction } from '@/app/(app)/start/actions'
import { Spinner } from '@/components/ui/spinner'

export default function StartSessionButton() {
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    startTransition(async () => {
      await startSessionAction()
    })
  }

  return (
    <div className="fixed right-4 bottom-28 z-50 sm:right-6">
      <Button
        onClick={handleClick}
        disabled={isPending}
        className="h-14 rounded-2xl bg-accent px-4 text-accent-foreground shadow-lg hover:bg-accent/90"
      >
        {isPending ? <Spinner /> : <Play className="size-5 fill-current" />}
        <span>{isPending ? 'Starting...' : 'Start session'}</span>
      </Button>
    </div>
  )
}
