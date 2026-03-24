type CalculateE1rmInput = {
  weight: number
  reps: number
  rir: number
}

export function calculateE1rm({ weight, reps, rir }: CalculateE1rmInput): number {
  const effectiveReps = reps + rir
  const estimatedOneRepMax = weight * (1 + effectiveReps / 30)

  return Number(estimatedOneRepMax.toFixed(2))
}
