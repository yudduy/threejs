import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'app/global.css'

const inter = Inter({ subsets: ['latin'] })

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AXESS Capital",
  "description": "Pioneering Stanford-focused venture capital firm focusing on blockchain, web3, and AI investments",
  "url": "https://axess.vc", 
  "logo": "https://axess.vc/logo.png",
  "sameAs": [
    "https://linkedin.com/company/axess-capital",
    "https://twitter.com/axesscapital"
  ],
  "address": {
    "@type": "684 Jane Stanford Way",
    "addressLocality": "Stanford",
    "addressCountry": "United States"
  }
}

export const metadata: Metadata = {
  title: 'AXESS | Venture Capital & Web3 Pioneer',
  description: 'AXESS Ventures - Pioneering the future of technology investment. We partner with innovative startups in blockchain and AI to decentralize tomorrow\'s technological landscape.',
  keywords: 'venture capital, AXESS capital, blockchain startups, AI startups, blockchain investment, web3, ai agents, blockchain accelerator, bitcoin, ethereum, solana, polygon, angel investor, Stanford, Stanford University, Stanford startups, Stanford University startups, Stanford University blockchain, Stanford University AI, Stanford University web3, Stanford University venture capital, Stanford University blockchain investment, Stanford University web3 investment, Stanford University ai agents, Stanford University blockchain accelerator, Stanford University bitcoin, Stanford University ethereum, Stanford University solana, Stanford University polygon, Stanford University angel investor',
  openGraph: {
    title: 'AXESS | Venture Capital & Web3 Pioneer',
    description: 'Pioneering the future of technology investment across AI and blockchain.',
    images: [
      {
        url: '/og-image.jpg', //placeholder for now
        width: 1200,
        height: 630,
        alt: 'AXESS Capital'
      }
    ],
    type: 'website',
    locale: 'en_US',
    siteName: 'AXESS Capital'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AXESS | Stanford Focused Venture Capital & Web3 Investment',
    description: 'Pioneering the future of technology investment across blockchain and AI.',
    images: ['/twitter-image.jpg'], //placeholder for now
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
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