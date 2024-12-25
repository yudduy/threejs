import { Request, Response } from 'express';

export async function POST(req: Request, res: Response) {
  try {
    const body = req.body;
    const { email, message } = body;

    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';
    
    try {
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, message }),
      });

      const text = await response.text(); // Read the response as text
      console.log('Response:', text); // Log the response

      // Declare the data variable
      let data;

      // Check if the response is JSON
      if (!response.ok) {
        console.error('Server returned error:', text);
        return res.status(response.status).json({ error: text });
      }

      // Try to parse the response as JSON
      try {
        data = JSON.parse(text); // Parse the text as JSON
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError);
        return res.status(502).json({ error: 'Failed to parse server response' });
      }

      return res.status(200).json({ message: 'Message sent successfully' });

    } catch (fetchError) {
      console.error('Backend server error:', fetchError);
      return res.status(503).json({ error: 'Unable to reach backend server. Please try again later.' });
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(400).json({ error: 'Invalid request format' });
  }
} 