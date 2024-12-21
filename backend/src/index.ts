import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

// Import cors only if it is installed
let cors;
try {
  cors = require('cors');
} catch (error) {
  console.error('CORS module not found. Please install it using "npm install cors".');
  process.exit(1);
}

dotenv.config()

const app = express()

// Update CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(bodyParser.json())

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Verify email configuration on startup
transporter.verify((error: Error | null) => {
  if (error) {
    console.error('Email configuration error:', error)
  } else {
    console.log('Server is ready to send emails')
  }
})

// Contact form handler
const contactPost = async (req: Request, res: Response) => {
  try {
    const { email, message } = req.body
    console.log('Received contact form submission:', { email, message })

    // Validate input
    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' })
    }

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'kduynguy@gmail.com',
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

app.post('/api/contact', contactPost);

// Add this logging to confirm routes are registered
console.log('Registered routes:', 
  app._router.stack
    .filter((r: any) => r.route)
    .map((r: any) => `${Object.keys(r.route.methods)} ${r.route.path}`)
);

const PORT = process.env.PORT || 5001

// Add error handling for server startup
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`)
    })
  } catch (error) {
    if ((error as any).code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Please try a different port or kill the process using this port.`)
      process.exit(1)
    } else {
      console.error('Failed to start server:', error)
      process.exit(1)
    }
  }
}

startServer() 

app.get('/', (req, res) => {
  res.send('Server is running!');
});