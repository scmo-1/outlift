'use client'

import Link from 'next/link'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { login } from '@/lib/auth/actions'
import { initialLoginFormState } from '@/lib/auth/formState'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Spinner className="size-4" /> : 'Log in'}
    </Button>
  )
}

export default function LoginPage() {
  const [state, formAction] = useActionState(login, initialLoginFormState)
  const email = state?.values?.email ?? ''
  const error = state?.error ?? null

  return (
    <div className="mx-auto max-w-md p-6">
      <form action={formAction} className="mb-8 flex flex-col gap-3">
        <h1 className="text-xl font-semibold">Log in</h1>

        <Input
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={email}
          aria-invalid={error ? 'true' : 'false'}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          aria-invalid={error ? 'true' : 'false'}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}

        <SubmitButton />

        <p>
          Don`t have an account yet? <Link href="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  )
}
