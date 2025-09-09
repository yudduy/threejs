'use client'

import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'

interface ContactFormProps {
  onClose: () => void;
}

interface ContactFormData {
  email: string;
  message: string;
}

interface SubmitStatus {
  type: 'success' | 'error' | null;
  message: string;
}

export function ContactForm({ onClose }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ 
    type: null, 
    message: '' 
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (!response.ok) {
        console.error('Server response:', data)
        throw new Error(data.error || data.details || 'Failed to submit form')
      }

      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you for your message! We\'ll be in touch soon.' 
      })
      setFormData({ email: '', message: '' })
      
      if (onClose) {
        setTimeout(onClose, 3000)
      }

    } catch (error) {
      console.error('Contact form error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message'
      setSubmitStatus({ 
        type: 'error', 
        message: 'Something went wrong. Please try again or contact us directly.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="bg-black p-8 rounded-lg border border-gray-800 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Contact Us</h2>
        {submitStatus.type === 'success' ? (
          <div className="text-green-400 text-center">
            <p>Thank you for your message!</p>
            <p>We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
            />
            <textarea
              placeholder="Your message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              required
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Connect with us'}
            </button>
            {submitStatus.type === 'error' && (
              <div className="text-red-500 text-sm mt-2">
                {submitStatus.message}
              </div>
            )}
          </form>
        )}
      </div>
    </motion.div>
  )
} 