import { listAllExercises } from '@/lib/DB/exercises'

export async function test() {
  const exercises = await listAllExercises()

  return <pre>{JSON.stringify(exercises)}</pre>
}

export default test
