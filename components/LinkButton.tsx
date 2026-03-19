import Link from 'next/link'
import { cn } from '@/lib/utils'
import clsx from 'clsx'

type LinkButtonProps = {
  variant?: 'filled' | 'outline'
  href: string
  label: string
}

function LinkButton({ variant = 'filled', href, label }: LinkButtonProps) {
  const linkClasses = clsx(
    variant === 'filled' ? 'bg-accent text-background' : 'bg-transparent text-accent border-accent',
    cn('group relative overflow-hidden border border-accent rounded-xl px-4 py-2 uppercase w-full'),
  )
  const textClasses = cn(
    'absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out font-medium',
  )

  return (
    <Link href={href} className={clsx(linkClasses)}>
      <span className="opacity-0">{label}</span>
      <span className={clsx(textClasses, 'translate-y-0 group-hover:-translate-y-full')}>
        {label}
      </span>
      <span className={clsx(textClasses, 'translate-y-full group-hover:translate-y-0')}>
        {label}
      </span>
    </Link>
  )
}

export default LinkButton
