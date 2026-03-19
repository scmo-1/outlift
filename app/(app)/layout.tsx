import { requireUser } from '@/lib/auth/requireUser'
import AppNav from '@/features/AppNav/AppNav'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await requireUser()

  return (
    <div className="h-screen flex flex-col p-3">
      {children}
      <AppNav />
    </div>
  )
}
