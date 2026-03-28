import { notFound } from 'next/navigation'
import { requireUser } from '@/lib/auth/requireUser'
import { getProgramOverviewData } from '@/lib/services/getProgramOverviewData'
import ProgramOverview from '@/features/Programs/ProgramOverview'

type OverviewPageProps = {
  searchParams: Promise<{
    programId?: string
  }>
}

export default async function OverviewPage({ searchParams }: OverviewPageProps) {
  const profile = await requireUser()
  const params = await searchParams
  const programId = typeof params.programId === 'string' ? params.programId : undefined

  if (!programId) {
    notFound()
  }

  const program = await getProgramOverviewData(profile.id, programId)

  if (!program) {
    notFound()
  }

  return <ProgramOverview program={program} />
}
