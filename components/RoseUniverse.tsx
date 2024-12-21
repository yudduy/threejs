'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { TypingAnimation } from './typing-animation'
import { createTextGeometry } from './textGeometry'

gsap.registerPlugin(ScrollTrigger)

interface RoseUniverseProps {
  onAnimationComplete: () => void;
}

// Create a client-only version of RoseUniverse
const RoseUniverseClient = dynamic(() => Promise.resolve(RoseUniverseComponent), {
  ssr: false // This ensures the component only renders on client-side
})

// Add these shape generation functions at the top of the component:

const generateShapes = {
  galaxy: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const radius = randomValues[i * 3] * 400 + (randomValues[i * 3 + 1] * 200) 
      const theta = randomValues[i * 3 + 2] * Math.PI * 2
      const phi = randomValues[i * 3 + 3] * Math.PI * 2
      const spiral = randomValues[i * 3 + 4] * 125
      
      positions[i * 3] = (radius * Math.sin(phi) * Math.cos(theta)) + (spiral * Math.cos(theta))
      positions[i * 3 + 1] = (radius * Math.sin(phi) * Math.sin(theta)) + (spiral * Math.sin(theta))
      positions[i * 3 + 2] = radius * Math.cos(phi) * randomValues[i * 3 + 5] // Adjusted Z spread
    }
    return positions
  },
  
  donut: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3)
    const radius = 200
    const tubeRadius = 80 // Adjusted tube radius
    
    for (let i = 0; i < particleCount; i++) {
      const theta = randomValues[i * 3] * Math.PI * 2
      const phi = randomValues[i * 3 + 1] * Math.PI * 2
      const scatter = randomValues[i * 3 + 2] * 100 - 50 // Adjusted scatter
      
      const x = (radius + tubeRadius * Math.cos(phi)) * Math.cos(theta) + scatter
      const y = (radius + tubeRadius * Math.cos(phi)) * Math.sin(theta) + scatter
      const z = tubeRadius * Math.sin(phi) + scatter
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }
    return positions
  },
  
  sphere: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3)
    const radius = 150
    
    for (let i = 0; i < particleCount; i++) {
      const theta = randomValues[i * 3] * Math.PI * 2
      const phi = Math.acos((randomValues[i * 3 + 1] * 2) - 1)
      const scatter = randomValues[i * 3 + 2] * 100 - 50 // Adjusted scatter
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta) + scatter
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) + scatter
      positions[i * 3 + 2] = radius * Math.cos(phi) + scatter
    }
    return positions
  },
  
  dna: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3)
    const radius = 150
    const height = 300 
    
    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * height
      const theta = (t / 40) * Math.PI * 2 
      const scatter = randomValues[i * 3] * 100 - 50
      
      positions[i * 3] = radius * Math.cos(theta) + scatter
      positions[i * 3 + 1] = t - height / 2 + scatter
      positions[i * 3 + 2] = radius * Math.sin(theta) + scatter
    }
    return positions
  },

  s: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3)
    const radius = 100 // Adjusted radius
    
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount
      let x, y, z
      
      // Calculate the angle based on the position
      const angle = t * Math.PI * 2 // Full circle for facing camera
      x = Math.cos(angle) * radius
      y = Math.sin(angle) * radius
      
      z = (randomValues[i * 3] - 0.5) * 50 // Adjusted Z variation
      
      positions[i * 3] = x + (randomValues[i * 3 + 1] - 0.5) * 25 // Adjusted spread
      positions[i * 3 + 1] = y + (randomValues[i * 3 + 2] - 0.5) * 25 // Adjusted spread
      positions[i * 3 + 2] = z
    }
    return positions
  }
}

function RoseUniverseComponent({ onAnimationComplete }: RoseUniverseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const geometryRef = useRef<THREE.BufferGeometry | null>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [showWelcomeText, setShowWelcomeText] = useState(false)
  const [currentText, setCurrentText] = useState({ opacity: 1 });
  const textMode = useRef<boolean>(true)
  const lastTextChange = useRef<number>(0)
  const currentShape = useRef<string>('galaxy')
  const shapes = ['galaxy', 'donut', 'sphere', 'dna']
  const shapeIndex = useRef(0)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000 
    )
    camera.position.z = 700
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    })
    rendererRef.current = renderer
    
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    const particleCount = 100000
    const positions = new Float32Array(particleCount * 3)
    const originalPositions = new Float32Array(particleCount * 3)
    const textPositions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    // Generate random values once to avoid hydration issues
    const randomValues = new Float32Array(particleCount * 13).map(() => Math.random()); // Fixed size to 13

    // Generate text positions with 50% larger size
    const textGeometry = createTextGeometry('AXESS', particleCount)
    for (let i = 0; i < particleCount; i++) {
      textPositions[i * 3] = textGeometry[i * 3] * 9
      textPositions[i * 3 + 1] = textGeometry[i * 3 + 1] * 9
      textPositions[i * 3 + 2] = textGeometry[i * 3 + 2] * 9
    }

    // Create a more spread out initial formation
    for (let i = 0; i < particleCount; i++) {
      const radius = randomValues[i * 3] * 400 + (randomValues[i * 3 + 1] * 200) // Adjusted radius range
      const theta = randomValues[i * 3 + 2] * Math.PI * 2
      const phi = randomValues[i * 3 + 3] * Math.PI * 2
      
      const spiral = randomValues[i * 3 + 4] * 100 // Adjusted spiral effect
      positions[i * 3] = (radius * Math.sin(phi) * Math.cos(theta)) + (spiral * Math.cos(theta))
      positions[i * 3 + 1] = (radius * Math.sin(phi) * Math.sin(theta)) + (spiral * Math.sin(theta))
      positions[i * 3 + 2] = radius * Math.cos(phi) * randomValues[i * 3 + 5] // Adjusted Z spread

      // Brighter colors
      if (randomValues[i * 3 + 6] < 0.4) {
        // Pure white
        colors[i * 3] = 1.0
        colors[i * 3 + 1] = 1.0
        colors[i * 3 + 2] = 1.0
      } else if (randomValues[i * 3 + 7] < 0.7) {
        // Bright blue
        colors[i * 3] = 0.7
        colors[i * 3 + 1] = 0.9
        colors[i * 3 + 2] = 1.0
      } else {
        // Light purple
        colors[i * 3] = 0.8
        colors[i * 3 + 1] = 0.6
        colors[i * 3 + 2] = 1.0
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometryRef.current = geometry
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Brighter particles
    const material = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 1.0, 
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    // Create particle system
    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    const textSpread = 20
    
    for (let i = 0; i < particleCount; i++) {
      const letterIndex = Math.floor((i / particleCount) * 5)
      const letterPosition = (letterIndex - 2) * textSpread
      
      const angle = (i / particleCount) * Math.PI * 2
      const letterRadius = 12 + randomValues[i * 3 + 8] * 6 // Increased radius
      const heightVariation = randomValues[i * 3 + 9] * 9 // Increased height variation

      originalPositions[i * 3] = letterPosition + Math.cos(angle) * letterRadius
      originalPositions[i * 3 + 1] = Math.sin(angle) * letterRadius + heightVariation
      originalPositions[i * 3 + 2] = Math.cos(angle * 2) * 6 // Increased depth
    }

    const galaxyPositions = generateShapes.galaxy(particleCount, randomValues);
    geometry.setAttribute('position', new THREE.BufferAttribute(galaxyPositions, 3));

    const tl = gsap.timeline({
      delay: 2,
      onComplete: () => {
        setTimeout(() => setShowWelcomeText(true), 1000)
      }
    })

    // Animate to text formation
    tl.to(galaxyPositions, {
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: () => {
        for (let i = 0; i < particleCount; i++) {
          const ix = i * 3
          galaxyPositions[ix] += (textPositions[ix] - galaxyPositions[ix]) * 0.1
          galaxyPositions[ix + 1] += (textPositions[ix + 1] - galaxyPositions[ix + 1]) * 0.1
          galaxyPositions[ix + 2] += (textPositions[ix + 2] - galaxyPositions[ix + 2]) * 0.1
        }
        geometry.attributes.position.needsUpdate = true
      }
    })

    // Animate to burst and spread widely
    tl.to(galaxyPositions, {
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        for (let i = 0; i < particleCount; i++) {
          const ix = i * 3;
          const burstFactor = i < particleCount * 0.7 ? 1.5 : 0.1; // 60% of particles burst towards the camera
          galaxyPositions[ix] += (randomValues[i * 3 + 10] * 800 - 400) * burstFactor; // Adjusted burst range
          galaxyPositions[ix + 1] += (randomValues[i * 3 + 11] * 800 - 400) * burstFactor; // Adjusted burst range
          galaxyPositions[ix + 2] += (randomValues[i * 3 + 12] * 800 - 400) * burstFactor; // Adjusted burst range
        }
        geometry.attributes.position.needsUpdate = true;
      },
      onComplete: () => {
        // After burst, transition to S shape
        const sPositions = generateShapes.s(particleCount, randomValues);
        gsap.to(galaxyPositions, {
          duration: 2,
          ease: 'power2.inOut',
          onUpdate: () => {
            for (let i = 0; i < particleCount; i++) {
              const ix = i * 3;
              galaxyPositions[ix] += (sPositions[ix] - galaxyPositions[ix]) * 0.1;
              galaxyPositions[ix + 1] += (sPositions[ix + 1] - galaxyPositions[ix + 1]) * 0.1;
              galaxyPositions[ix + 2] += (sPositions[ix + 2] - galaxyPositions[ix + 2]) * 0.1;
            }
            geometry.attributes.position.needsUpdate = true;
          },
          onComplete: () => {
            // Start shape rotation interval
            setInterval(() => {
              shapeIndex.current = (shapeIndex.current + 1) % shapes.length;
              const nextShape = shapes[shapeIndex.current];
              const nextPositions = generateShapes[nextShape](particleCount, randomValues);
              
              gsap.to(galaxyPositions, {
                duration: 2,
                ease: 'power2.inOut',
                onUpdate: () => {
                  for (let i = 0; i < particleCount; i++) {
                    const ix = i * 3;
                    galaxyPositions[ix] += (nextPositions[ix] - galaxyPositions[ix]) * 0.1;
                    galaxyPositions[ix + 1] += (nextPositions[ix + 1] - galaxyPositions[ix + 1]) * 0.1;
                    galaxyPositions[ix + 2] += (nextPositions[ix + 2] - galaxyPositions[ix + 2]) * 0.1;
                  }
                  geometry.attributes.position.needsUpdate = true;
                }
              });
            }, 5000);
          }
        });
      }
    })

    // Animation loop with mouse interaction
    const animate = () => {
      requestAnimationFrame(animate)
      
      const positions = geometry.attributes.position.array as Float32Array

      // Mouse interaction with magnetic effect
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3
        const dx = positions[ix] - (mousePosition.current.x * 100) 
        const dy = positions[ix + 1] - (mousePosition.current.y * 100)
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        const repelStrength = Math.max(0, 1 - dist / 100) * 4 
        positions[ix] += dx * repelStrength * 0.01
        positions[ix + 1] += dy * repelStrength * 0.01

        positions[ix] += (originalPositions[ix] - positions[ix]) * 0.005
        positions[ix + 1] += (originalPositions[ix + 1] - positions[ix + 1]) * 0.005
        positions[ix + 2] += (originalPositions[ix + 2] - positions[ix + 2]) * 0.005
      }
      
      geometry.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
    }

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      sceneRef.current = null
      rendererRef.current = null
      geometryRef.current = null
    }
  }, [onAnimationComplete])

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 z-0 bg-black" />
      {showWelcomeText && (
        <div className="fixed inset-0 flex items-center justify-center z-10"> {/* Added z-10 to keep text in front */}
          <div className="text-center">
            <TypingAnimation text="Welcome to Axess Capital" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-4 text-lg font-semibold text-gray-400"
            >
              Stanford's exclusive venture capital fund
            </motion.p>
          </div>
        </div>
      )}
    </>
  )
}

// Export the client-only version
export { RoseUniverseClient as RoseUniverse }
