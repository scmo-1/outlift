'use client'
import LinkButton from '@/components/LinkButton'
import { cn } from '@/lib/utils'
import clsx from 'clsx'

export default function LandingPage() {
  const headingCn = cn(
    'uppercase font-black font-mono text-[85px] leading-18 md:text-[120px] md:leading-23',
  )
  return (
    <div className="w-full">
      <h1 className="flex flex-col">
        <span className={clsx(headingCn, 'text-stroke')}>outlift</span>
        <span className={clsx(headingCn, 'text-black')}>outlift</span>
        <span className={clsx(headingCn, 'text-stroke')}>outlift</span>
        <span className={clsx(headingCn, 'text-stroke')}>outlift</span>
        <span className={clsx(headingCn, 'text-black')}>outlift</span>
      </h1>
      <div className="flex flex-col gap-2 mt-15 px-10">
        <LinkButton href="/start" label="launch app" />
        <LinkButton href="/signup" variant="outline" label="create account" />
      </div>
    </div>
  )
}
