import { redirect } from 'next/navigation'
import { getSupabase } from '@/lib/DB/utils'

export default async function AppPage() {
  const supabase = await getSupabase()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return <div>App</div>
}
