import { listAllInactivePrograms, getActiveProgramWithDetails } from '../DB/programs'
import type { ProgramWithDetails } from '@/types/programs'
import type { ProgramRow } from '@/types/models'

type ProgramPageData = {
  activeProgram: ProgramWithDetails | null
  inactivePrograms: ProgramRow[]
}

export async function getProgramsPageData(profileId: string): Promise<ProgramPageData> {
  const activeProgram = await getActiveProgramWithDetails(profileId)

  const inactivePrograms = await listAllInactivePrograms(profileId)

  return {
    activeProgram: activeProgram,
    inactivePrograms: inactivePrograms,
  }
}
