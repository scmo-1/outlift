import { requireUser } from '@/lib/auth/requireUser'
import AppNav from '@/features/AppNav/AppNav'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await requireUser()

  return (
    <div className="h-screen flex flex-col items-center p-3 md:p-auto">
      <main className="md:max-w-md w-full">{children}</main>
      <AppNav />
    </div>
  )
}
