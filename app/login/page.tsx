import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md p-6">
      <form action={login} className="mb-8 flex flex-col gap-3">
        <h1 className="text-xl font-semibold">Log in</h1>
        <input name="email" type="email" placeholder="Email" className="border p-2" />
        <input name="password" type="password" placeholder="Password" className="border p-2" />
        <button type="submit" className="border p-2">
          Log in
        </button>
      </form>

      <form action={signup} className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Sign up</h2>
        <input name="username" type="text" placeholder="Username" className="border p-2" />
        <input name="email" type="email" placeholder="Email" className="border p-2" />
        <input name="password" type="password" placeholder="Password" className="border p-2" />
        <button type="submit" className="border p-2">
          Create account
        </button>
      </form>
    </div>
  )
}
