'use client'

import { useTransition } from 'react'
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
    <Button onClick={handleClick} disabled={isPending} className="w-full capitalize">
      {isPending ? <Spinner /> : 'Start Session'}
    </Button>
  )
}
