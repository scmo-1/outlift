'use server'
import { redirect } from 'next/navigation'
import { getSupabase } from '@/lib/DB/utils'
import {
  initialSignupFormState,
  type LoginFormState,
  type SignupFormState,
} from './formState'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function normalizeSignupError(message: string): SignupFormState {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('user already registered') || lowerMessage.includes('email address')) {
    return {
      ...initialSignupFormState,
      error: 'An account with that email already exists.',
      fieldErrors: {
        email: 'Email already exists.',
      },
    }
  }

  if (
    lowerMessage.includes('profiles_username_key') ||
    (lowerMessage.includes('duplicate key') && lowerMessage.includes('username'))
  ) {
    return {
      ...initialSignupFormState,
      error: 'That username is already taken.',
      fieldErrors: {
        username: 'Username already exists.',
      },
    }
  }

  if (
    lowerMessage.includes('profiles_email_key') ||
    (lowerMessage.includes('duplicate key') && lowerMessage.includes('email'))
  ) {
    return {
      ...initialSignupFormState,
      error: 'An account with that email already exists.',
      fieldErrors: {
        email: 'Email already exists.',
      },
    }
  }

  return {
    ...initialSignupFormState,
    error: 'Could not create account. Please try again.',
  }
}

export async function login(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const supabase = await getSupabase()

  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      error: 'Incorrect email or password.',
      values: {
        email,
      },
    }
  }

  redirect('/start')
}

export async function signup(
  _prevState: SignupFormState,
  formData: FormData,
): Promise<SignupFormState> {
  const supabase = await getSupabase()

  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const confirmPassword = String(formData.get('confirmPassword') ?? '')
  const username = String(formData.get('username') ?? '').trim()
  const fieldErrors: SignupFormState['fieldErrors'] = {}

  if (username.length < 3) {
    fieldErrors.username = 'Username must be at least 3 characters.'
  }

  if (!isValidEmail(email)) {
    fieldErrors.email = 'Enter a valid email address.'
  }

  if (password !== confirmPassword) {
    fieldErrors.confirmPassword = 'Passwords do not match.'
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      error: 'Please fix the highlighted fields.',
      fieldErrors,
      values: {
        username,
        email,
      },
    }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  })

  if (error) {
    const normalizedError = normalizeSignupError(error.message)

    return {
      ...normalizedError,
      values: {
        username,
        email,
      },
    }
  }

  redirect('/start')
}

export async function logout() {
  const supabase = await getSupabase()
  await supabase.auth.signOut()
  redirect('/login')
}
