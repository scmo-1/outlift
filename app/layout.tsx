import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, MuseoModerno } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

const museoModerno = MuseoModerno({
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
      <body className={`${plusJakarta.variable} ${museoModerno.variable} antialiased dark`}>
        {children}
      </body>
    </html>
  )
}
