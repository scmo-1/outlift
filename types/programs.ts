import type { ProgramRow, WorkoutModel } from './models'

export type ProgramWithDetails = {
  program: ProgramRow & {
    workouts: WorkoutModel[]
  }
}
