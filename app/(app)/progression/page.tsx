import ProgressView from '@/features/ProgressView/ProgressView'
import { getProgressViewData } from '@/lib/services/getProgressViewData'
import { getProfile } from '@/lib/auth/getProfile'

type ProgressionPageProps = {
  searchParams: Promise<{
    scope?: string
  }>
}

function getScope(value?: string): 'activeProgram' | 'allTime' {
  if (value === 'allTime') return 'allTime'
  return 'activeProgram'
}

async function progressionPage({ searchParams }: ProgressionPageProps) {
  const profile = await getProfile()
  const params = await searchParams
  const scope = getScope(params?.scope)

  const pageData = await getProgressViewData(profile.id, scope)

  return (
    <>
      <ProgressView data={pageData} />
    </>
  )
}

export default progressionPage
