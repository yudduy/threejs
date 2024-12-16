import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'app/global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VC Fund - Investing in AI & Crypto',
  description: 'A venture capital fund focused on artificial intelligence and blockchain technology',
}

function ShootingStars() {
  return (
    <>
      <div className="shooting-star" style={{['--star-offset' as string]: `${Math.random() * 20}%`}}></div>
      <div className="shooting-star" style={{['--star-offset' as string]: `${Math.random() * 20}%`}}></div>
      <div className="shooting-star" style={{['--star-offset' as string]: `${Math.random() * 20}%`}}></div>
    </>
  )
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
          <ShootingStars />
          <div className="grid-bg" />
        </div>
        {children}
      </body>
    </html>
  )
}
