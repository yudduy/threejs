'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { TypingAnimation } from './typing-animation'
import { createTextGeometry } from './textGeometry'
import { ContactForm } from './ContactForm'
import { Navbar } from './navbar'

gsap.registerPlugin(ScrollTrigger)

interface RoseUniverseProps {
  onAnimationComplete: () => void;
}

// Update ShapeType definition
type ShapeType = 'galaxy' | 'blockchain' | 'neuralNetwork' | 'quantum' | 'infinity' | 'AXESS' | 's';

// Update shapes array
const shapes: ShapeType[] = ['galaxy', 'blockchain', 'neuralNetwork', 'quantum', 'infinity'];

// Update the generateShapes object type
const generateShapes: Record<ShapeType, (particleCount: number, randomValues: Float32Array) => Float32Array> = {
  AXESS: (particleCount: number, randomValues: Float32Array) => {
    const positions = createTextGeometry('AXESS', particleCount)
    
    // Scale the text positions without adding circular formation
    for (let i = 0; i < particleCount; i++) {
      const ix = i * 3
      positions[ix] *= 9      // Scale X
      positions[ix + 1] *= 9  // Scale Y
      positions[ix + 2] *= 9  // Scale Z
    }
    
    return positions
  },
  
  galaxy: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const radius = randomValues[i * 3] * 800 + (randomValues[i * 3 + 1] * 400) // Increased spread
      const theta = randomValues[i * 3 + 2] * Math.PI * 2
      const phi = randomValues[i * 3 + 3] * Math.PI * 2
      const spiral = randomValues[i * 3 + 4] * 250 // More pronounced spiral
      
      positions[i * 3] = (radius * Math.sin(phi) * Math.cos(theta)) + (spiral * Math.cos(theta))
      positions[i * 3 + 1] = (radius * Math.sin(phi) * Math.sin(theta)) + (spiral * Math.sin(theta))
      positions[i * 3 + 2] = radius * Math.cos(phi) * 0.3 // More particles near camera
    }
    return positions
  },
  
  blockchain: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3)
    const radius = 450 // Increased size
    const layers = 5
    
    for (let i = 0; i < particleCount; i++) {
      const layer = Math.floor(i / (particleCount / layers))
      const layerOffset = layer * (radius / 2)
      const angle = (i * 137.5) * Math.PI / 180
      const spread = randomValues[i * 3] * 200 // Added spread
      
      positions[i * 3] = (radius + spread) * Math.cos(angle)
      positions[i * 3 + 1] = (radius + spread) * Math.sin(angle)
      positions[i * 3 + 2] = layerOffset - radius // Brings particles closer to camera
    }
    return positions
  },
  
  neuralNetwork: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3)
    const layers = 4
    const nodesPerLayer = Math.floor(particleCount / layers)
    
    for (let i = 0; i < particleCount; i++) {
      const layer = Math.floor(i / nodesPerLayer)
      const spread = 500 // Increased spread
      
      positions[i * 3] = (randomValues[i * 3] - 0.5) * spread
      positions[i * 3 + 1] = (layer / (layers - 1) - 0.5) * spread
      positions[i * 3 + 2] = (randomValues[i * 3 + 2] - 0.5) * (spread * 0.3) // Closer to camera
    }
    return positions
  },

  quantum: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3)
    const radius = 300 
    
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount
      const spiral = t * 20 * Math.PI
      const elevation = Math.cos(t * Math.PI * 8) * radius * 0.5
      
      positions[i * 3] = radius * Math.cos(spiral) + (randomValues[i * 3] - 0.5) * 200
      positions[i * 3 + 1] = radius * Math.sin(spiral) + (randomValues[i * 3 + 1] - 0.5) * 200
      positions[i * 3 + 2] = elevation + (randomValues[i * 3 + 2] - 0.5) * 100
    }
    return positions
  },

  infinity: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3)
    const size = 800 // Increased size
    
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount * Math.PI * 2
      const spread = randomValues[i * 3] * 200
      
      const a = size / 2
      const denom = 1 + Math.sin(t) * Math.sin(t)
      positions[i * 3] = (a * Math.cos(t)) / denom + spread
      positions[i * 3 + 1] = (a * Math.sin(t) * Math.cos(t)) / denom + spread - 100 // Moved down and centered
      positions[i * 3 + 2] = (randomValues[i * 3 + 2] - 0.5) * 100 // Closer to camera
    }
    return positions
  },

  s: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3);
    const radius = 300;
    const halfCount = Math.floor(particleCount / 2);
  
    for (let i = 0; i < particleCount; i++) {
      let t = i / particleCount;
      let x = 0, y = 0, z = 0;
  
      if (i < halfCount) {
        t = (i / halfCount) * Math.PI * 1.5; // Adjusted scale for half the particle count
        x = Math.cos(t) * radius * 0.4;
        y = Math.sin(t) * radius * 0.4 + radius * 0.4; // Slightly shifted up
  
      } else {
        t = ((i - halfCount) / halfCount) * Math.PI * 1.5 + Math.PI;
        x = Math.cos(t) * radius * 0.4;
        y = Math.sin(t) * radius * 0.4 - radius * 0.4; // Slightly shifted down
      }
  
      z = (randomValues[i * 3] - 0.5) * 50;
  
      positions[i * 3] = x + (randomValues[i * 3 + 1] - 0.5) * 25;
      positions[i * 3 + 1] = y + (randomValues[i * 3 + 2] - 0.5) * 25;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }
}

function RoseUniverse({ onAnimationComplete }: RoseUniverseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const geometryRef = useRef<THREE.BufferGeometry | null>(null)
  const [showWelcomeText, setShowWelcomeText] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const shapeIndex = useRef(0)
  const currentShape = useRef<ShapeType>('AXESS')

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
    camera.position.z = 400 
    
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

    // Generate random values once
    const randomValues = new Float32Array(particleCount * 13).map(() => Math.random())

    // Generate text positions with original scaling
    const textGeometry = createTextGeometry('AXESS', particleCount)
    for (let i = 0; i < particleCount; i++) {
      textPositions[i * 3] = textGeometry[i * 3] * 9
      textPositions[i * 3 + 1] = textGeometry[i * 3 + 1] * 9
      textPositions[i * 3 + 2] = textGeometry[i * 3 + 2] * 9
    }

    // Create initial spread out formation
    for (let i = 0; i < particleCount; i++) {
      const radius = randomValues[i * 3] * 400 + (randomValues[i * 3 + 1] * 200)
      const theta = randomValues[i * 3 + 2] * Math.PI * 2
      const phi = randomValues[i * 3 + 3] * Math.PI * 2
      
      const spiral = randomValues[i * 3 + 4] * 100
      positions[i * 3] = (radius * Math.sin(phi) * Math.cos(theta)) + (spiral * Math.cos(theta))
      positions[i * 3 + 1] = (radius * Math.sin(phi) * Math.sin(theta)) + (spiral * Math.sin(theta))
      positions[i * 3 + 2] = radius * Math.cos(phi) * randomValues[i * 3 + 5]

      // Set colors
      if (randomValues[i * 3 + 6] < 0.4) {
        colors[i * 3] = colors[i * 3 + 1] = colors[i * 3 + 2] = 1.0
      } else if (randomValues[i * 3 + 7] < 0.7) {
        colors[i * 3] = 0.7
        colors[i * 3 + 1] = 0.9
        colors[i * 3 + 2] = 1.0
      } else {
        colors[i * 3] = 0.8
        colors[i * 3 + 1] = 0.6
        colors[i * 3 + 2] = 1.0
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometryRef.current = geometry
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Initial animation sequence
    const tl = gsap.timeline({
      delay: 2,
      onComplete: () => {
        setTimeout(() => {
          setShowWelcomeText(true)
          // Start shape transitions after AXESS completes
          startShapeTransitions()
        }, 3000) // Hold AXESS for 3 seconds
      }
    })

    // Initial AXESS formation
    tl.to(positions, {
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: () => {
        for (let i = 0; i < particleCount; i++) {
          const ix = i * 3
          positions[ix] += (textPositions[ix] - positions[ix]) * 0.1
          positions[ix + 1] += (textPositions[ix + 1] - positions[ix + 1]) * 0.1
          positions[ix + 2] += (textPositions[ix + 2] - positions[ix + 2]) * 0.1
        }
        geometry.attributes.position.needsUpdate = true
      }
    })
    
    // Hold AXESS for 3 seconds
    .then(() => new Promise(resolve => setTimeout(resolve, 3000)))
    
    // Then start the shape transition cycle
    const startShapeTransitions = () => {
      const transitionToNextShape = () => {
        shapeIndex.current = (shapeIndex.current + 1) % shapes.length
        const nextShape = shapes[shapeIndex.current]
        currentShape.current = nextShape
        
        const nextPositions = generateShapes[nextShape](particleCount, randomValues)
        
        // Dissolve current shape by spreading particles randomly
        gsap.to(positions, {
          duration: 3, // Slower dissolution
          ease: 'power1.inOut',
          onUpdate: () => {
            for (let i = 0; i < particleCount; i++) {
              const ix = i * 3
              // Add random movement to create dissolution effect
              const randomX = (Math.random() - 0.5) * 3000
              const randomY = (Math.random() - 0.5) * 3000
              const randomZ = (Math.random() - 0.5) * 1000
              
              positions[ix] += (randomX - positions[ix]) * 0.02
              positions[ix + 1] += (randomY - positions[ix + 1]) * 0.02
              positions[ix + 2] += (randomZ - positions[ix + 2]) * 0.02
            }
            geometry.attributes.position.needsUpdate = true
          },
          onComplete: () => {
            // Then transition to next shape
            gsap.to(positions, {
              duration: 3, // Slower formation
              ease: 'power2.out',
              onUpdate: () => {
                for (let i = 0; i < particleCount; i++) {
                  const ix = i * 3
                  positions[ix] += (nextPositions[ix] - positions[ix]) * 0.05 // Gentler transition
                  positions[ix + 1] += (nextPositions[ix + 1] - positions[ix + 1]) * 0.05
                  positions[ix + 2] += (nextPositions[ix + 2] - positions[ix + 2]) * 0.05
                }
                geometry.attributes.position.needsUpdate = true
              },
              onComplete: () => {
                // Hold shape for longer before next transition
                setTimeout(transitionToNextShape, 5000) // 5 seconds hold
              }
            })
          }
        })
      }

      // Start the transition cycle after AXESS animation completes
      setTimeout(() => {
        transitionToNextShape()
      }, 3000) // Wait 3 seconds after AXESS before starting transitions
    }

    // Animation loop with magnetic effect
    const animate = () => {
      requestAnimationFrame(animate)
      
      const positions = geometry.attributes.position.array as Float32Array

      // Mouse interaction with magnetic effect
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3
        const dx = positions[ix] - (mousePosition.current.x * 100)
        const dy = positions[ix + 1] - (mousePosition.current.y * 100)
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        // Reduce effect during AXESS text formation
        const isTextFormation = currentShape.current === 'AXESS'
        const effectMultiplier = isTextFormation ? 0.3 : 1
        
        const repelStrength = Math.max(0, 1 - dist / 100) * 4 * effectMultiplier
        positions[ix] += dx * repelStrength * 0.01
        positions[ix + 1] += dy * repelStrength * 0.01

        // Slower return to original position
        const returnSpeed = 0.005
        positions[ix] += (originalPositions[ix] - positions[ix]) * returnSpeed
        positions[ix + 1] += (originalPositions[ix + 1] - positions[ix + 1]) * returnSpeed
        positions[ix + 2] += (originalPositions[ix + 2] - positions[ix + 2]) * returnSpeed
      }
      
      geometry.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      mousePosition.current = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((event.clientY - rect.top) / rect.height) * 2 + 1
      }
    }

    // Add mouse event listener
    window.addEventListener('mousemove', handleMouseMove)
    animate()

    // Make sure to update camera and renderer on window resize
    const handleResize = () => {
      if (!camera || !renderer) return
      
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      
      // Update camera position to maintain view
      camera.position.z = Math.max(400, window.innerWidth / 4)
    }

    // Add resize listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      sceneRef.current = null
      rendererRef.current = null
      geometryRef.current = null
    }
  }, [])

  return ( 
    <>
      <div ref={containerRef} className="fixed inset-0 z-0 bg-black" />
      {showWelcomeText && <Navbar />}
      {showWelcomeText && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-10">
          <div className="text-center">
            <TypingAnimation text="Welcome to Axess Capital" />
            <motion.div
              className="flex flex-col items-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <p className="mt-4 text-lg font-semibold text-gray-400">
                Stanford's exclusive venture capital fund. Coming Soon.
              </p>
              <div className="flex justify-center">
                <motion.div
                  className="mt-4 text-lg font-semibold text-white cursor-pointer"
                  whileHover={{ 
                    scale: 1.1, 
                    textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)", 
                    boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)" 
                  }}
                  onClick={() => setShowContactForm(true)}
                >
                  Curious? Contact Us!
                </motion.div>
              </div>

              {showContactForm && <ContactForm onClose={() => setShowContactForm(false)} />}
            </motion.div>
          </div>
        </div>
      )}
    </>
  )
}

export default RoseUniverse 