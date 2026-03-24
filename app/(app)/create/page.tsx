import CreateProgramPage from '@/features/createProgram/CreateProgramPage'
import { listAllExercises } from '@/lib/DB/exercises'
import { createProgram } from '@/lib/DB/programs'
import { getProfile } from '@/lib/auth/getProfile'
import type { ProgramDraft } from '@/types/createProgram'

async function createProgramAction(programDraft: ProgramDraft) {
  'use server'

  const profile = await getProfile()

  return createProgram(profile.id, programDraft)
}

async function page() {
  const exercises = await listAllExercises()

  return (
    <>
      <CreateProgramPage exercises={exercises} createProgramAction={createProgramAction} />
    </>
  )
}

export default page
