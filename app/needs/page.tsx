'use client'

import { motion } from 'framer-motion';
import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/Footer';

export default function Needs() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="space-bg">
        <div className="stars" />
        <div className="stars" /> 
        <div className="stars" /> 
        <div className="stars" /> 
        <div className="stars" /> 
        <div className="stars" /> 
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
          <h1 className="text-7xl font-serif font-bold text-white tracking-wider mb-24 text-center"> {/* Changed to serif font */}
            About
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="prose prose-lg prose-invert mx-auto"
          >
            <p className="text-white text-xl leading-relaxed">
            We invest in Stanford startups building the future of blockchain and AI. We focus on pre-seed investments, partnering early to provide capital, technical expertise, and connections to global resources and top talent. We are committed to backing transformative companies starting with the Stanford community.
            </p>
            
            <p className="text-white text-xl leading-relaxed mt-8">
            Our team consists of Stanford students deeply embedded in the entrepreneurial ecosystem, with leadership roles in TreeHacks, Stanford Blockchain Club, Stanford Blockchain Review, and Affiliated Students Entrepreneurship Club (ASES). This insider access enables us to identify and support exceptional founders before they reach the broader venture community.
            </p>
          </motion.div>
        </motion.div> 
      </main>

      <Footer />
    </div>
  )
}