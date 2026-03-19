import { getSupabase } from '../DB/utils'
import { getProfileById } from '../DB/profiles'
import type { ProfileRow } from '@/types/models'

export async function getProfile(): Promise<ProfileRow> {
  const supabase = await getSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('user fetch error')
  const profile = await getProfileById(user.id)

  if (!profile) throw new Error('profile not found')

  return profile
}
