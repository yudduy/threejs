'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button';

export function Navbar() {
  const navItems = [
    { name: 'Needs', path: '/needs' },
    { name: 'Team', path: '/team' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          CHAEWON FUND
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="nav-link px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Button 
            variant="secondary" 
            className="ml-4 bg-white/10 hover:bg-white/20 text-white border-0 transition-transform hover:scale-105"
          >
            Contact us →
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}
