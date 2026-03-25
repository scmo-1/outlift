'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'
import { signup } from '@/lib/auth/actions'
import { initialSignupFormState } from '@/lib/auth/formState'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Spinner className="size-4" /> : 'Create account'}
    </Button>
  )
}

export default function SignUpPage() {
  const [state, formAction] = useActionState(signup, initialSignupFormState)
  const username = state?.values?.username ?? ''
  const email = state?.values?.email ?? ''
  const fieldErrors = state?.fieldErrors ?? {}
  const error = state?.error ?? null

  return (
    <div className="mx-auto max-w-md p-6">
      <form action={formAction} className="mb-8 flex flex-col gap-3">
        <h1 className="text-xl font-semibold">Sign up</h1>

        <div className="flex flex-col gap-1">
          <Input
            name="username"
            type="text"
            placeholder="Username"
            defaultValue={username}
            aria-invalid={fieldErrors.username ? 'true' : 'false'}
          />
          {fieldErrors.username && (
            <p className="text-sm text-destructive">{fieldErrors.username}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            defaultValue={email}
            aria-invalid={fieldErrors.email ? 'true' : 'false'}
          />
          {fieldErrors.email && (
            <p className="text-sm text-destructive">{fieldErrors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            name="password"
            type="password"
            placeholder="Password"
            aria-invalid={fieldErrors.password ? 'true' : 'false'}
          />
          {fieldErrors.password && (
            <p className="text-sm text-destructive">{fieldErrors.password}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Repeat password"
            aria-invalid={fieldErrors.confirmPassword ? 'true' : 'false'}
          />
          {fieldErrors.confirmPassword && (
            <p className="text-sm text-destructive">{fieldErrors.confirmPassword}</p>
          )}
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <SubmitButton />

        <p>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </form>
    </div>
  )
}
