import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept')
  res.header('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  next()
})

app.use(cors())

app.use(express.json())

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
})

app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    console.log('Received contact request:', req.body)
    const { email, message } = req.body

    if (!email || !message) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: 'Email and message are required' 
      })
    }

    const mailOptions = {
      from: `"Axess Capital" <${process.env.EMAIL_USER}>`,
      to: 'duy@axess.vc',
      subject: 'New Contact Form Submission - Axess Capital',
      text: `New message from contact form:\n\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h2>New message from contact form</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully')
    return res.status(200).json({ 
      success: true,
      message: 'Contact form submitted successfully' 
    })
  } catch (error) {
    console.error('Server error:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString() 
  })
})

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

// For Vercel
export default app