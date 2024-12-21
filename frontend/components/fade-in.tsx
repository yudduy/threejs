'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export function FadeIn({ 
  children, 
  delay = 0 
}: { 
  children: ReactNode
  delay?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  )
}

