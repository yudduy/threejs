import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'
    
    console.log('Sending request to:', `${backendUrl}/api/contact`)
    
    const response = await fetch(`${backendUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body),
    })

    // First try to get the response as text
    const responseText = await response.text()
    
    // Try to parse the response as JSON
    try {
      const data = JSON.parse(responseText)
      
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
    } catch (parseError) {
      console.error('Failed to parse response:', responseText)
      return NextResponse.json(
        { 
          error: 'Invalid server response',
          details: 'Server returned invalid JSON'
        },
        { status: 502 }
      )
    }
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