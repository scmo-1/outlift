import LandingPage from '@/features/Landingpage/LandingPage'

import { redirect } from 'next/navigation'

export default async function Landing() {
  return (
    <div>
      <LandingPage />
    </div>
  )
}
