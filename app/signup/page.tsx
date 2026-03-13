import { signup } from '@/lib/auth/actions'

export default function signInPage() {
  return (
    <form action={signup} className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold">Sign up</h2>
      <input name="username" type="text" placeholder="Username" className="border p-2" />
      <input name="email" type="email" placeholder="Email" className="border p-2" />
      <input name="password" type="password" placeholder="Password" className="border p-2" />
      <button type="submit" className="border p-2">
        Create account
      </button>
    </form>
  )
}
