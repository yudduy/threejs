'use client'

import { motion } from 'framer-motion';
import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer';

export default function Needs() {
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
            The Needs
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="prose prose-lg prose-invert mx-auto"
          >
            <p className="text-white/80 text-xl leading-relaxed">
            We are a group of Stanford students supporting Stanford founders through venture. We leverage insider access to top talent and projects through clubs such as Stanford Blockchain Club, ASES, TreeHacks, BASES, and SMT. We focus on pre-seed startups in blockchain and AI, and we plan to get involved in teams earlier than other seed investors. Once we invest, we expect to be actively involved by bringing not only on-campus talent to the companies but also global partners.
            </p>
            
            <p className="text-white/80 text-xl leading-relaxed mt-8">
              We've identified a critical need in the market: bridging the gap between cutting-edge technology and practical business applications. Many brilliant innovations in AI and crypto remain untapped, while countless businesses struggle to harness these technologies effectively. This disconnect represents both a challenge and an opportunity.
            </p>

            <p className="text-white/80 text-xl leading-relaxed mt-8">
              Our mission is to identify, support, and scale ventures that are building this bridge. We're not just investing in companies; we're investing in the infrastructure of tomorrow's digital economy. Through strategic capital deployment and hands-on guidance, we're helping visionary founders transform theoretical possibilities into practical solutions that drive real-world impact.
            </p>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}