import { getProfile } from '@/lib/auth/getProfile'

export default async function AppPage() {
  const profile = await getProfile()

  return (
    <div>
      <h1>weclome {profile.username}</h1>
    </div>
  )
}
