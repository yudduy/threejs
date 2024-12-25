import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Use the same domain for API calls in production
    const backendUrl = process.env.NODE_ENV === 'production' 
      ? `https://${request.headers.get('host')}`
      : process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'
    
    const endpoint = `${backendUrl}/api/contact`
    console.log('Sending request to:', endpoint)

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': backendUrl
      },
      body: JSON.stringify(body),
    })

    // Log for debugging
    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))

    let data
    const contentType = response.headers.get('content-type')

    try {
      // Try to parse as JSON first
      data = await response.json()
    } catch (parseError) {
      // If JSON parsing fails, get the response as text
      const text = await response.text()
      console.error('Failed to parse response:', text)
      return NextResponse.json(
        { 
          error: 'Invalid server response',
          details: 'Server returned invalid JSON'
        },
        { status: 502 }
      )
    }

    if (!response.ok) {
      return NextResponse.json(
        { 
          error: data.error || 'Server error occurred',
          details: data.details || 'No additional details available'
        },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 