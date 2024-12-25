import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'app/global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Axess Capital',
  description: 'A venture capital fund focused on artificial intelligence and blockchain technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="space-bg">
          <div className="stars" />
          <div className="grid-bg" />
        </div>
        {children}
      </body>
    </html>
  )
}