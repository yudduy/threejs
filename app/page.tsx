'use client'

import { useState } from 'react'
import { RoseUniverse } from '@/components/RoseUniverse'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer' 

export default function Home() {
  const [showRoseUniverse, setShowRoseUniverse] = useState(true)

  return (
    <div className="relative bg-black">
      {showRoseUniverse && (
        <>
          <RoseUniverse onAnimationComplete={() => {}} />
          <Navbar />
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