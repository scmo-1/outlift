import LandingPage from '@/features/Landingpage/LandingPage'
import { redirect } from 'next/navigation'
import OutliftLogo from '@/components/OutliftLogo'
import LinkButton from '@/components/LinkButton'

export default async function Landing() {
  return (
    <div className="flex flex-col items-center">
      <OutliftLogo className="text-background h-auto w-90" />
      <p className="capitalize text-background font-semibold w-full text-nowrap text-center">
        track your workouts. See your progression.
      </p>
      <div className="mt-15 flex flex-col gap-4">
        <LinkButton label="Launch App" href="/start" />
        <LinkButton label="Create Account" href="/signup" variant="outline" />
      </div>
    </div>
  )
}
