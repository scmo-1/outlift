import { requireUser } from '@/lib/auth/requireUser'
import { getProgramsPageData } from '@/lib/services/getProgramsPageData'

export default async function ProgramsPage() {
  const profile = await requireUser()
  const PageData = await getProgramsPageData(profile.id)

  console.log(PageData)

  return (
    <div>
      <h1>programs</h1>
    </div>
  )
}
