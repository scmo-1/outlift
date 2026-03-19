'use client'
import LinkButton from '@/components/LinkButton'
import OutliftLogo from '@/components/OutliftLogo'

export default function LandingPage() {
  return (
    <div className="w-full">
      <section className="relative h-180">
        <div className="flex flex-col gap-2 items-center absolute top-1/3 left-1/2 -translate-x-1/2 z-10">
          <OutliftLogo className="text-background h-auto w-90" />
          <p className="capitalize text-background font-semibold w-full text-nowrap text-center">
            track your workouts. See your progression.
          </p>
          <div className="mt-15 flex flex-col gap-4">
            <LinkButton label="Launch App" href="/start" />
            <LinkButton label="Create Account" href="/signup" variant="outline" />
          </div>
        </div>
      </section>
    </div>
  )
}
