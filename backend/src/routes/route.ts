import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, message } = body

    // Validate the input
    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      )
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'
    
    try {
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, message }),
      })

      let data
      const contentType = response.headers.get('content-type')
      
      // Handle non-JSON responses
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        console.error('Received non-JSON response:', text)
        return NextResponse.json(
          { error: 'Server returned invalid response format' },
          { status: 502 }
        )
      }

      try {
        data = await response.json()
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError)
        return NextResponse.json(
          { error: 'Failed to parse server response' },
          { status: 502 }
        )
      }

      if (!response.ok) {
        console.error('Server returned error:', data)
        return NextResponse.json(
          { error: data.error || 'Server error occurred' },
          { status: response.status }
        )
      }

      return NextResponse.json(
        { message: 'Message sent successfully' },
        { status: 200 }
      )

    } catch (fetchError) {
      console.error('Backend server error:', fetchError)
      return NextResponse.json(
        { error: 'Unable to reach backend server. Please try again later.' },
        { status: 503 }
      )
    }

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    )
  }
} 