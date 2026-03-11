'use client'
import Link from 'next/link'

function NavMenu() {
  return (
    <ul className="w-full p-5 flex gap-5">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/programs">Programs</Link>
      </li>
    </ul>
  )
}

export default NavMenu
