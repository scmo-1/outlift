'use client'

import type { ReactNode } from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

type SetAccordionItemProps = {
  value: string
  setNumber: number
  status: 'unlogged' | 'completed' | 'skipped'
  children: ReactNode
}

function SetAccordionItem({ value, setNumber, status, children }: SetAccordionItemProps) {
  const isSaved = status === 'completed' || status === 'skipped'

  return (
    <AccordionItem
      value={value}
      className={cn(
        'rounded-lg border px-4 data-[state=open]:border-ring',
        isSaved && 'border-accent bg-accent/10',
      )}
    >
      <AccordionTrigger
        className={cn(
          'items-center py-3 hover:no-underline',
          isSaved && 'text-accent',
          status === 'skipped' && 'text-muted-foreground',
        )}
      >
        <div className="flex flex-col items-start gap-1">
          <span className="text-base font-medium">Set {setNumber}</span>
          <span className="text-xs font-normal text-muted-foreground">
            {status === 'completed'
              ? 'Saved'
              : status === 'skipped'
                ? 'Skipped'
                : 'Not logged yet'}
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-4">{children}</AccordionContent>
    </AccordionItem>
  )
}

export default SetAccordionItem
