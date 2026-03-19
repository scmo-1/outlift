'use client'
import LinkButton from '@/components/LinkButton'
import Grainient from '../UnderConstruction/components/Grainient'
import OutliftLogo from '@/components/OutliftLogo'

export default function LandingPage() {
  return (
    <div className="">
      <section className="relative h-180">
        <Grainient className="z-0 w-full h-full" />
        <div className="absolute inset-0 z-2 bg-linear-to-b from-transparent via-background/80 to-background" />
        <div className="flex flex-col gap-2 items-center absolute top-1/2 left-1/2 -translate-x-1/2 z-10">
          <OutliftLogo className="text-background" width={300} height={110} />
          <p className="capitalize text-background font-semibold w-full text-nowrap ">
            track your workouts. See your progression
          </p>
          <div className="mt-15 flex flex-col gap-3">
            <LinkButton label="Launch App" href="/start" />
            <LinkButton label="Create Account" href="/signup" variant="outline" />
          </div>
        </div>
      </section>
    </div>
  )
}
