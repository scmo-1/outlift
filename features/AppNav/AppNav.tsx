'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { BarChart3, CircleUserRound, FolderKanban, PlayCircle } from 'lucide-react'

function AppNav() {
  const pathname = usePathname()

  const items = [
    { href: '/start', label: 'Start', icon: PlayCircle },
    { href: '/programs', label: 'Programs', icon: FolderKanban },
    { href: '/progression', label: 'Progression', icon: BarChart3 },
    { href: '/profile', label: 'Profile', icon: CircleUserRound },
  ]

  return (
    <nav className="fixed right-0 bottom-0 left-0 border-t border-border/70 bg-background/95 px-3 py-3 backdrop-blur">
      <ul className="mx-auto flex w-full max-w-xl items-center gap-2 rounded-2xl border border-border/70 bg-card p-2 shadow-sm">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  'flex min-h-14 w-full flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs font-medium text-muted-foreground transition-colors',
                  'hover:bg-accent hover:text-foreground',
                  isActive && 'bg-foreground text-background hover:bg-foreground hover:text-background',
                )}
              >
                <Icon className="size-4" />
                <span>{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default AppNav
