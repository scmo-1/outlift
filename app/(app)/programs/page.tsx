import { requireUser } from '@/lib/auth/requireUser'
import { getProgramsPageData } from '@/lib/services/getProgramsPageData'
import ProgramsCard from '@/features/Programs/ProgramCard'
import ActiveProgramCard from '@/features/Programs/ActiveProgramCard'

export default async function ProgramsPage() {
  const profile = await requireUser()
  const PageData = await getProgramsPageData(profile.id)

  console.log(PageData)

  return (
    <div className="flex flex-col">
      <h1 className="mt-6 mb-2">programs</h1>
      {PageData.activeProgram ? (
        <ActiveProgramCard program={PageData.activeProgram} />
      ) : (
        <p>no active program found</p>
      )}
      <span className="capitalize mt-8">saved programs:</span>
      <ul>
        {PageData.inactivePrograms.map((program) => (
          <li key={program.id}>
            <ProgramsCard name={program.name} id={program.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}
