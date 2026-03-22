import { getSessionPageData } from '@/lib/services/getSessionPageData'
import { getProfile } from '@/lib/auth/getProfile'
import SessionLogPage from '@/features/SessionLogPage/SessionLogPage'

export default async function SessionPage() {
  const profile = await getProfile()

  const PageData = await getSessionPageData(profile.id)
  console.log(PageData)

  return (
    <div className="w-full min-h-screen">
      <SessionLogPage data={PageData} />
    </div>
  )
}
