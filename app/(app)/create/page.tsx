import CreateProgramPage from '@/features/createProgram/CreateProgramPage'
import { listAllExercises } from '@/lib/DB/exercises'

async function page() {
  const exercises = await listAllExercises()

  return (
    <>
      <CreateProgramPage exercises={exercises} />
    </>
  )
}

export default page
