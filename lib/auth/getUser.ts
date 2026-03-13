import { getSupabase } from '../DB/utils'

export async function getUser() {
  const supabase = await getSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}
