import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'app/global.css'

const inter = Inter({ subsets: ['latin'] })

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": process.env.NEXT_PUBLIC_SITE_NAME || "Your Company Name",
  "description": process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Beautiful Three.js website template with modern animations",
  "url": process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || "https://your-domain.com", 
  "logo": process.env.NEXT_PUBLIC_SITE_LOGO || `${process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || "https://your-domain.com"}/logo.png`,
  "sameAs": [
    process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/company/your-company",
    process.env.NEXT_PUBLIC_TWITTER_URL || "https://twitter.com/yourcompany"
  ].filter(url => url && !url.includes('your-'))
}

export const metadata: Metadata = {
  title: 'Three.js Website Template | Modern Interactive Design',
  description: 'Beautiful Three.js website template with particle animations, contact forms, and modern design. Perfect for portfolios, agencies, and creative projects.',
  keywords: 'three.js, website template, particle animation, modern design, portfolio template, creative website, interactive design, web development, nextjs template',
  openGraph: {
    title: 'Three.js Website Template | Modern Interactive Design',
    description: 'Beautiful Three.js website template with modern animations and interactive design.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Three.js Website Template'
      }
    ],
    type: 'website',
    locale: 'en_US',
    siteName: 'Three.js Template'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Three.js Website Template | Modern Interactive Design',
    description: 'Beautiful Three.js website template with modern animations and interactive design.',
    images: ['/twitter-image.jpg'],
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