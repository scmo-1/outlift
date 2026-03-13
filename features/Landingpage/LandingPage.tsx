'use client'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div>
      <h1>Outlift</h1>
      <p>welcome</p>
      <div className="flex gap-5">
        <Link href="/login">Log In</Link>
        <Link href="/signup">Sign up</Link>
      </div>
    </div>
  )
}
