import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

function getSupabaseEnv() {
  const target = process.env.NEXT_PUBLIC_SUPABASE_TARGET

  if (target === 'local') {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL_LOCAL
    const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY_LOCAL

    if (!url || !publishableKey) {
      throw new Error('Missing local Supabase environment variables')
    }

    return { url, publishableKey }
  }

  if (target === 'cloud') {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL_CLOUD
    const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY_CLOUD

    if (!url || !publishableKey) {
      throw new Error('Missing cloud Supabase environment variables')
    }

    return { url, publishableKey }
  }

  throw new Error('Invalid NEXT_PUBLIC_SUPABASE_TARGET. Expected "local" or "cloud"')
}

export async function createClient() {
  const cookieStore = await cookies()
  const { url, publishableKey } = getSupabaseEnv()

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // kan triggas från Server Components – ok om du har middleware som refreshar session
        }
      },
    },
  })
}
