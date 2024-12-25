'use client'

import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'

interface ContactFormProps {
  onClose?: () => void;
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
        message: `${errorMessage}. Please try again later.`
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: .1 }}
      className="bg-white/10 backdrop-blur-md p-6 rounded-lg w-80 border border-white/20"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
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
        {submitStatus.type && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-sm ${
              submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {submitStatus.message}
          </motion.p>
        )}
      </form>
    </motion.div>
  )
} 