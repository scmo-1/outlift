import { requireUser } from '@/lib/auth/requireUser'
export default async function SessionLayout({ children }: { children: React.ReactNode }) {
  const profile = await requireUser()
  return <main className="min-h-screen">{children}</main>
}
