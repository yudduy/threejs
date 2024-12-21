'use client'

import { useEffect, useState } from 'react'
import { motion, useAnimate } from 'framer-motion'

export function TypingAnimation({ text }: { text: string }) {
  const [scope, animate] = useAnimate()
  const [displayText, setDisplayText] = useState('')
  
  useEffect(() => {
    let currentText = ''
    const animateTyping = async () => {
      for (let i = 0; i <= text.length; i++) {
        currentText = text.slice(0, i)
        setDisplayText(currentText)
        await new Promise(resolve => setTimeout(resolve, 50))
      }
    }
    
    animateTyping()
  }, [text])

  return (
    <motion.div
      ref={scope}
      className="relative"
    >
      <span className="text-5xl md:text-6xl font-serif leading-tight text-white">
        {displayText}
      </span>
      <motion.span
        className="inline-block w-[0.6em] h-[1em] bg-white ml-1 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </motion.div>
  )
}