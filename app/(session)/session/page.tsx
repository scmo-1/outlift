import { getSessionPageData } from '@/lib/services/getSessionPageData'
import { getProfile } from '@/lib/auth/getProfile'

export default async function SessionPage() {
  const profile = await getProfile()

  const PageData = await getSessionPageData(profile.id)
  console.log(PageData)

  return (
    <div>
      <h1>session</h1>
    </div>
  )
}

// hämta session id från search params
// använd det sesssion id:t för att hämta den nya skapade session = sessionId + workoutId
// använd sessionId för att hämta session_exercises
// använd workout Id för att hämta historik
