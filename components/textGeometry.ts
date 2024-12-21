import * as THREE from 'three'

export function createTextGeometry(text: string, particleCount: number): Float32Array {
  // Create a temporary canvas to generate text
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return new Float32Array(particleCount * 3)

  // Set canvas size and text properties
  canvas.width = 1024
  canvas.height = 256
  ctx.fillStyle = 'white'
  ctx.font = 'bold 150px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  // Draw text
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)

  // Get pixel data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const pixels = imageData.data

  // Create positions array
  const positions = new Float32Array(particleCount * 3)
  let particleIndex = 0

  // Sample pixels to create particle positions
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i] > 0 && particleIndex < particleCount) { // If pixel is not black
      const x = ((i / 4) % canvas.width) - canvas.width / 2
      const y = Math.floor((i / 4) / canvas.width) - canvas.height / 2
      
      positions[particleIndex * 3] = x * 0.1     // Scale down the text size
      positions[particleIndex * 3 + 1] = -y * 0.1 // Flip Y coordinates and scale
      positions[particleIndex * 3 + 2] = 0       // Z coordinate
      
      particleIndex++
    }
  }

  // Fill remaining particles with random positions if needed
  while (particleIndex < particleCount) {
    positions[particleIndex * 3] = (Math.random() - 0.5) * 100
    positions[particleIndex * 3 + 1] = (Math.random() - 0.5) * 100
    positions[particleIndex * 3 + 2] = (Math.random() - 0.5) * 100
    particleIndex++
  }

  return positions
}