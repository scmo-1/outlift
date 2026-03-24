import { getProgressViewData } from '@/lib/services/getProgressViewData'

export async function test() {
  const profile = 'ed837b3b-d199-4bd4-b0fb-6e0ee7d2d83b'

  const progress = await getProgressViewData(profile, 'allTime')
  console.log(progress)

  return (
    <div>
      <h1>test</h1>
    </div>
  )
}

export default test
