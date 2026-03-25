import LineWaves from '@/components/LineWaves'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen">
      <div className="relative w-full flex flex-col items-center">
        <div className="h-150 w-full">
          <LineWaves />
          <div className="absolute inset-0 z-1 bg-linear-to-b from-transparent via-background/10 to-background" />
        </div>
        <div className="absolute z-10 top-1/4">{children}</div>
      </div>
    </main>
  )
}
