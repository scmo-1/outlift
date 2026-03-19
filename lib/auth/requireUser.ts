import { getSupabase } from '../DB/utils'
import { redirect } from 'next/navigation'

export async function requireUser() {
  const supabase = await getSupabase()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return user
}
