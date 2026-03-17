'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function AppNav() {
  const pathname = usePathname()

  const items = [
    { href: '/start', label: 'Start' },
    { href: '/programs', label: 'Program' },
    { href: '/progression', label: 'Progression' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-accent-foreground">
      <ul className="flex w-full items-center justify-around">
        {items.map((item) => {
          const isActive = pathname === item.href

          return (
            <li key={item.href}>
              <Link href={item.href} className={isActive ? 'font-semibold underline' : ''}>
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default AppNav
