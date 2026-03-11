import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProgramsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const profileId = user.id
}
