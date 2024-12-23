import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

const allowedOrigins = [
  'https://axess.vc',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(bodyParser.json())

// Basic health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy' })
})

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Contact form handler
const contactPost = async (req: Request, res: Response) => {
  try {
    const { email, message } = req.body
    console.log('Received contact form submission:', { email, message })

    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' })
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
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

    return res.status(200).json({ message: 'Contact form submitted successfully' })
  } catch (error) {
    console.error('Server error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

app.post('/api/contact', contactPost)

// For Vercel serverless deployment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`)
  })
}

// Export for Vercel serverless function
export default app