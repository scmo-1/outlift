import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Grainient from '@/features/UnderConstruction/components/Grainient'

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

const jetBrains_mono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Outlift',
  description: 'Training app for the minimalist',
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${jetBrains_mono.variable} antialiased dark`}>
        <main className="min-h-screen">
          <div className="relative w-full flex flex-col items-center">
            <div className="h-150 w-full">
              <Grainient className="z-0 w-full h-full" />
              <div className="absolute inset-0 z-1 bg-linear-to-b from-transparent via-background/80 to-background" />
            </div>
            <div className="absolute z-10 top-1/2">{children}</div>
          </div>
        </main>
      </body>
    </html>
  )
}
