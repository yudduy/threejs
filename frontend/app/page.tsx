'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Footer } from '@/components/footer'

// Dynamically import RoseUniverse to avoid the export error
const RoseUniverse = dynamic(() => import('@/components/RoseUniverse').then(mod => mod.default), {
  ssr: false // This ensures the component only renders on client-side
})

export default function Home() {
  const [showRoseUniverse, setShowRoseUniverse] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRoseUniverse(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative bg-black">
      {showRoseUniverse && (
        <>
          <RoseUniverse onAnimationComplete={() => {}} />
          <div className="relative snap-y snap-mandatory h-screen overflow-y-scroll">
            <section className="snap-start h-screen" />
            <section className="snap-start h-screen" />
            <section className="snap-start h-screen" />
            <section className="snap-start h-screen" />
          </div>
          <Footer />
        </>
      )}
    </div>
  )
}