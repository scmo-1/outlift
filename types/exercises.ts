import type { Database } from './database'

export type Exercise = Database['public']['Tables']['exercises']['Row']

export type CustomExercisePayload = {
  name: string
  nickname?: string
  type: string
}
