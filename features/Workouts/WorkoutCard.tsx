import AppCard from '@/components/AppCard'

type WorkoutCardProps = {
  title: string
  sets: string
  children: React.ReactNode
}

function WorkoutCard({ title, sets, children }: WorkoutCardProps) {
  return (
    <AppCard title={title} extra={sets}>
      {children}
    </AppCard>
  )
}

export default WorkoutCard
