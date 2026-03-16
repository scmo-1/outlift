import { getProfile } from '@/lib/auth/getProfile'

export default async function TodayPage() {
  const profile = await getProfile()

  return (
    <div>
      <h1>weclome {profile.username}</h1>
      <div className="bg-amber-700">scedule</div>
      <h2 className="">next session</h2>
      <section></section>
    </div>
  )
}
