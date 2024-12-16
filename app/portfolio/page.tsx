'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs'

const AI_COMPANIES = [
  {
    name: 'Startup 1',
    logo: '/placeholder.svg?height=100&width=200',
    description: 'description 1',
    color: '#4F46E5'
  },
  {
    name: 'Startup 2',
    logo: '/placeholder.svg?height=100&width=200',
    description: 'description 2',
    color: '#7C3AED'
  },
  {
    name: 'Startup 3',
    logo: '/placeholder.svg?height=100&width=200',
    description: 'descriptin 3',
    color: '#2563EB'
  },
  {
    name: 'Startup 4',
    logo: '/placeholder.svg?height=100&width=200',
    description: 'description 4',
    color: '#059669'
  },
]

const CRYPTO_COMPANIES = [
  {
    name: 'Startup 5',
    logo: '/placeholder.svg?height=100&width=200',
    description: 'Description 5',
    color: '#0D9488'
  },
  {
    name: 'Startup 6',
    logo: '/placeholder.svg?height=100&width=200',
    description: 'Description 6',
    color: '#0891B2'
  },
  {
    name: 'Startup 7',
    logo: '/placeholder.svg?height=100&width=200',
    description: 'Description 7',
    color: '#3B82F6'
  },
  {
    name: 'Startup 8',
    logo: '/placeholder.svg?height=100&width=200',
    description: 'Description 8',
    color: '#3D3D3D'
  },
]

export default function Portfolio() {
  const [category, setCategory] = useState('ai')

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="space-bg">
        <div className="stars" />
        <div className="shooting-star" />
        <div className="shooting-star" />
        <div className="shooting-star" />
        <div className="grid-bg" />
      </div>
      
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-12"
        >
          Select Portfolio Companies
        </motion.h1>

        <Tabs 
          defaultValue="ai" 
          className="mb-12"
          onValueChange={(value) => setCategory(value)}
        >
          <TabsList className="bg-white/10 border-b border-white/10">
            <TabsTrigger 
              value="ai"
              className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
            >
              AI
            </TabsTrigger>
            <TabsTrigger 
              value="crypto"
              className="text-white/70 data-[state=active]:text-white data-[state=active]:bg-white/10"
            >
              Crypto
            </TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`rounded-lg p-8 mt-6 ${category === 'crypto' ? 'crypto-bg' : 'ai-bg'}`}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {(category === 'ai' ? AI_COMPANIES : CRYPTO_COMPANIES).map((company) => (
                  <motion.div
                    key={company.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative overflow-hidden rounded-lg p-6 backdrop-blur-sm bg-white/5"
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-8 mb-4"
                    />
                    <h3 className="text-xl font-bold text-white mb-2">
                      {company.name}
                    </h3>
                    <p className="text-white/80">
                      {company.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </main>

        <Footer /> 
      </div>
  )
}
