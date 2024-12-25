import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'
    const endpoint = `${backendUrl}/api/contact`
    
    console.log('Sending request to:', endpoint)
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body),
    })

    // Log response headers for debugging
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))
    console.log('Response status:', response.status)

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid content type:', contentType)
      const text = await response.text()
      console.error('Response body:', text)
      return NextResponse.json(
        { 
          error: 'Invalid server response',
          details: 'Server did not return JSON'
        },
        { status: 502 }
      )
    }

    const data = await response.json()
    
    if (!response.ok) {
      console.error('Server error response:', data)
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