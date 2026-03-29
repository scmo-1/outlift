import CreateProgramPage from '@/features/createProgram/CreateProgramPage'
import { listAllExercises } from '@/lib/DB/exercises'
import { createProgram } from '@/lib/DB/programs'
import { getProfile } from '@/lib/auth/getProfile'
import type { ProgramDraft } from '@/types/createProgram'
import { redirect } from 'next/navigation'

async function createProgramAction(programDraft: ProgramDraft) {
  'use server'

  const profile = await getProfile()

  await createProgram(profile.id, programDraft)
  redirect('/programs')
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
