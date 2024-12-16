'use client'

import { motion } from 'framer-motion'
import { Navbar } from '../../components/navbar'
import { Footer } from '../../components/footer'

export default function Team() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="space-bg">
        <div className="stars" />
        <div className="shooting-star" />
        <div className="shooting-star" />
        <div className="shooting-star" />
        <div className="grid-bg" />
      </div>
      
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-7xl font-bold text-white tracking-wider mb-24 text-center">
            Our Team
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 gap-8"
          >
            {/* Add team members here */}
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-purple-500 mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-white">Duy</h3>
              <p className="text-white/60">Cofounder - CEO</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-blue-500 mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-white">Duy</h3>
              <p className="text-white/60">CTO</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-green-500 mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-white">Duy</h3>
              <p className="text-white/60">Managing Partner</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-red-500 mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-white">Duy</h3>
              <p className="text-white/60">Managing Partner 2</p>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
