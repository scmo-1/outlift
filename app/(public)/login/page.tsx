import { login } from '@/lib/auth/actions'
import Link from 'next/link'

export default async function LoginPage() {
  return (
    <div className="mx-auto max-w-md p-6">
      <form action={login} className="mb-8 flex flex-col gap-3">
        <h1 className="text-xl font-semibold">Log in</h1>
        <input name="email" type="email" placeholder="Email" className="border p-2" />
        <input name="password" type="password" placeholder="Password" className="border p-2" />
        <button type="submit" className="border p-2">
          Log in
        </button>
        <p>
          Don`t have an account yet? <Link href="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  )
}
