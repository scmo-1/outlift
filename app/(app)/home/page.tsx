import { requireUser } from '@/lib/auth/requireUser'

export default async function AppPage() {
  const user = await requireUser()

  return (
    <div>
      <h1>weclome</h1>
    </div>
  )
}
