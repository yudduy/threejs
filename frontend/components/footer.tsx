import Link from 'next/link'
import { Mail, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/60 text-sm">
            © {new Date().getFullYear()} AXESS CAPITAL. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="mailto:duy@axess.vc" 
              className="text-white/60 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
            </Link>
            <Link 
              href="https://linkedin.com/company/axess-vc/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/60 hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

