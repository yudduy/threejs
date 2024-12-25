import { Request, Response } from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config() // Load environment variables

// Create transporter with more detailed configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const handleContact = async (req: Request, res: Response) => {
  try {
    const { email, message } = req.body
    console.log('Received contact request:', { email })

    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' })
    }

    // Verify SMTP connection
    try {
      await transporter.verify()
      console.log('SMTP connection verified')
    } catch (verifyError: unknown) {
      console.error('SMTP verification failed:', verifyError)
      return res.status(500).json({ 
        error: 'Email service configuration error',
        details: verifyError instanceof Error ? verifyError.message : 'Failed to verify email service' 
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
      console.log('Email sent successfully')
      return res.status(200).json({ message: 'Contact form submitted successfully' })
    } catch (emailError: unknown) {
      console.error('Email sending failed:', emailError)
      const message = emailError instanceof Error ? emailError.message : 'Failed to send email'
      return res.status(500).json({ error: message })
    }
  } catch (error: unknown) {
    console.error('Server error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return res.status(500).json({ error: message })
  }
} 