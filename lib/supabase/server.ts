import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

function getSupabaseEnv() {
  const target = process.env.NEXT_PUBLIC_SUPABASE_TARGET

  if (target === 'local') {
    return {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL_LOCAL!,
      key: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY_LOCAL!,
    }
  }

  if (target === 'cloud') {
    return {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL_CLOUD!,
      key: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY_CLOUD!,
    }
  }

  throw new Error('Invalid NEXT_PUBLIC_SUPABASE_TARGET')
}

export async function createClient() {
  const cookieStore = await cookies()
  const { url, key } = getSupabaseEnv()

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {}
      },
    },
  })
}
