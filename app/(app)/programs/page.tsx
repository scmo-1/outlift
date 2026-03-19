import { requireUser } from '@/lib/auth/requireUser'

export default async function ProgramsPage() {
  const user = await requireUser()

  return (
    <div>
      <h1>programs</h1>
    </div>
  )
}
