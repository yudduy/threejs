import { Request, Response } from 'express'
import nodemailer from 'nodemailer'

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

export const handleContact = async (req: Request, res: Response) => {
  // Log the incoming request
  console.log('Received contact request:', req.body)

  try {
    const { email, message } = req.body

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format',
        details: 'Please provide a valid email address'
      })
    }

    // Validate message
    if (!message || message.trim().length < 1) {
      return res.status(400).json({ 
        error: 'Invalid message',
        details: 'Message cannot be empty'
      })
    }

    // Verify SMTP connection before sending
    try {
      await transporter.verify()
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError)
      return res.status(500).json({ 
        error: 'Email service unavailable',
        details: 'Unable to connect to email service'
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

    try {
      await transporter.sendMail(mailOptions)
      console.log('Email sent successfully to:', mailOptions.to)
      
      // Send JSON response with proper headers
      res.setHeader('Content-Type', 'application/json')
      return res.status(200).json({
        success: true,
        message: 'Contact form submitted successfully'
      })

    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      return res.status(500).json({
        error: 'Failed to send email',
        details: 'Unable to send email at this time'
      })
    }
  } catch (error) {
    console.error('Server error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      details: 'An unexpected error occurred'
    })
  }
} 