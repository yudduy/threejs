import { VercelRequest, VercelResponse } from '@vercel/node';
import sgMail from '@sendgrid/mail';
import { validateEmail } from '../src/utils/validation';

// Initialize SendGrid
if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not defined');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Validation
    if (!email || !message) {
      return res.status(400).json({ 
        error: 'Email and message are required' 
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      });
    }

    // Demo mode - simulate email sending without actual SendGrid
    if (process.env.DEMO_MODE === 'true') {
      console.log('📧 DEMO MODE - Contact form submission received:');
      console.log('Name:', name || 'Not provided');
      console.log('Email:', email);
      console.log('Message:', message);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return res.status(200).json({ 
        message: 'Message sent successfully! (Demo mode - no actual email sent)' 
      });
    }

    // Production mode - actual SendGrid sending
    const msg = {
      to: process.env.CONTACT_EMAIL || process.env.SENDGRID_VERIFIED_SENDER!,
      from: process.env.SENDGRID_VERIFIED_SENDER!,
      subject: process.env.CONTACT_SUBJECT || 'New Contact Form Submission',
      text: `
        Name: ${name || 'Not provided'}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line;">${message}</p>
        </div>
      `
    };

    await sgMail.send(msg);
    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('SendGrid Error:', error);
    return res.status(500).json({ 
      error: `Failed to send message. Please contact us at ${process.env.CONTACT_EMAIL || process.env.SENDGRID_VERIFIED_SENDER}` 
    });
  }
} 