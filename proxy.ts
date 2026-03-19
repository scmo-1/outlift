import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

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

  throw new Error('Invalid NEXT_PUBLIC_SUPABASE_TARGET')
}

const publicRoutes = ['/', '/login', '/signup']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublicRoute = publicRoutes.includes(pathname)

  let response = NextResponse.next({ request })

  const { url, publishableKey } = getSupabaseEnv()

  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value)
        })

        response = NextResponse.next({ request })

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options)
        })
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  if (user && (pathname === '/login' || pathname === '/signup')) {
    const url = request.nextUrl.clone()
    url.pathname = '/home'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
