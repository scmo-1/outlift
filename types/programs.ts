import type { ProgramRow, WorkoutModel } from './models'

export type ProgramWithDetails = ProgramRow & {
  workouts: WorkoutModel[]
}
