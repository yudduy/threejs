'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { TypingAnimation } from '@/components/typing-animation'
import { ContactForm } from '@/components/ContactForm'
import ScrambleText from '@/components/ui/Scramble-Text'

const RoseUniverse = dynamic(() => import('@/components/particleAnimation'), {
  ssr: false
})

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showUI, setShowUI] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return null

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <RoseUniverse onAnimationComplete={() => setShowUI(true)} />
      
      {showUI && (
        <>
          <Navbar />
          <div className="fixed inset-0 flex flex-col items-center justify-center z-10">
            <div className="text-center">
              <TypingAnimation text="Welcome to Axess Capital" />
              <motion.div
                className="flex flex-col items-center gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <ScrambleText 
                  text="Stanford's exclusive venture capital fund. Coming Soon." 
                  settings={{ speed: 1.5 }} 
                  className="mt-4 text-lg font-semibold text-gray-400" 
                />
                <div className="flex justify-center">
                  <motion.div
                    className="mt-4 text-lg font-semibold text-white cursor-pointer"
                    whileHover={{ 
                      scale: 1.1, 
                      textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)", 
                      boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)" 
                    }}
                    onClick={() => setShowContactForm(true)}
                  >
                    <ScrambleText 
                      text="Curious? Contact Us!" 
                      settings={{ speed: 1.2 }} 
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {showContactForm && (
            <ContactForm onClose={() => setShowContactForm(false)} />
          )}
        </>
      )}
    </div>
  )
}
