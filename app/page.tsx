import LandingPage from '@/features/Landingpage/LandingPage'
import { getUser } from '@/lib/auth/getUser'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await getUser()
  console.log(user)
  if (user) {
    redirect('/home')
  }

  return (
    <div>
      <LandingPage />
    </div>
  )
}
