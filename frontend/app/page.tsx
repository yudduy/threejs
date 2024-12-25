'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Use dynamic import with no SSR
const RoseUniverse = dynamic(() => import('../components/RoseUniverse'), {
  ssr: false
})

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return null

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <RoseUniverse onAnimationComplete={() => {}} />
    </div>
  )
}