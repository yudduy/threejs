'use client'

import { useEffect, useRef, useState, FormEvent } from 'react'
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

// Add this type definition at the top of the file, after imports
type ShapeType = 'galaxy' | 'donut' | 'dna' | 'bitcoin' | 'robot' | 'smiley' | 's' | 'infinity' | 'tree';

// Update the shapes array to be explicitly typed
const shapes: ShapeType[] = ['galaxy', 'donut', 'dna', 'bitcoin', 'robot', 'smiley', 's', 'infinity', 'tree'];

// Update the generateShapes object type
const generateShapes: Record<ShapeType, (particleCount: number, randomValues: Float32Array) => Float32Array> = {
  galaxy: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const radius = randomValues[i * 3] * 400 + (randomValues[i * 3 + 1] * 200) 
      const theta = randomValues[i * 3 + 2] * Math.PI * 2
      const phi = randomValues[i * 3 + 3] * Math.PI * 2
      const spiral = randomValues[i * 3 + 4] * 125
      
      positions[i * 3] = (radius * Math.sin(phi) * Math.cos(theta)) + (spiral * Math.cos(theta)) // Centered
      positions[i * 3 + 1] = (radius * Math.sin(phi) * Math.sin(theta)) + (spiral * Math.sin(theta)) // Centered
      positions[i * 3 + 2] = radius * Math.cos(phi) * randomValues[i * 3 + 5]
    }
    return positions
  },
  
  donut: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3)
    const radius = 200
    const tubeRadius = 100
    
    for (let i = 0; i < particleCount; i++) {
      const theta = randomValues[i * 3] * Math.PI * 2
      const phi = randomValues[i * 3 + 1] * Math.PI * 2
      const scatter = randomValues[i * 3 + 2] * 100 - 50
      
      const x = (radius + tubeRadius * Math.cos(phi)) * Math.cos(theta) + scatter // Centered
      const y = (radius + tubeRadius * Math.cos(phi)) * Math.sin(theta) + scatter // Centered
      const z = tubeRadius * Math.sin(phi) + scatter
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }
    return positions
  },
  
  dna: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3)
    const radius = 200
    const height = 400
    
    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * height
      const theta = (t / 40) * Math.PI * 2 
      const scatter = randomValues[i * 3] * 100 - 50
      
      positions[i * 3] = radius * Math.cos(theta) + scatter // Centered
      positions[i * 3 + 1] = t - height / 2 + scatter // Centered
      positions[i * 3 + 2] = radius * Math.sin(theta) + scatter
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
  },
  
  bitcoin: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3);
    const radius = 200;
    const halfParticleCount = Math.floor(particleCount / 2);
  
    for (let i = 0; i < particleCount; i++) {
      let t = i / halfParticleCount * Math.PI;  // We don't need the full circle here
      const scatterX = (randomValues[i * 3] - 0.5) * 30;
      const scatterY = (randomValues[i * 3 + 1] - 0.5) * 30;
      const x = radius * Math.cos(t) + scatterX;
      const y = radius * Math.sin(t) + scatterY;
      const z = (randomValues[i * 3 + 2] - 0.5) * 20;
      
      if (i < halfParticleCount) {
        // Upper half circle + vertical lines
        positions[i * 3] = x;
        positions[i * 3 + 1] = y + radius / 2;  // Center the upper circle
      } else {
        // Lower half circle
        const index = i - halfParticleCount;
        t = index / halfParticleCount * Math.PI;
        const scatterXLower = (randomValues[i * 3] - 0.5) * 30;
        const scatterYLower = (randomValues[i * 3 + 1] - 0.5) * 30;
        const xLower = radius * Math.cos(t) + scatterXLower;
        const yLower = radius * Math.sin(t) + scatterYLower;
        positions[i * 3] = xLower;
        positions[i * 3 + 1] = yLower - radius / 2; // Center the lower circle
      }
  
      positions[i * 3 + 2] = z;
  
      // Add vertical lines through the middle of the B
      if (i % Math.floor(particleCount / 10) === 0) {
        positions[i * 3] = scatterX;  // Keep X very close to zero for the vertical lines
        positions[i * 3 + 1] = (randomValues[i * 3 + 1] - 0.5) * radius;  // Extend vertically across the symbol
        positions[i * 3 + 2] = z;
      }
    }
    return positions;
  },

  robot: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3);
    const size = 200;
    const headHeight = size / 3;
    const bodyHeight = size / 2;
    const limbLength = size / 3;
    
    for (let i = 0; i < particleCount; i++) {
      const scatter = randomValues[i * 3] * 20 - 10;
      
      // Head
      if (i < particleCount * 0.2) {
        positions[i * 3] = (randomValues[i * 3] - 0.5) * size / 2 + scatter;
        positions[i * 3 + 1] = size / 2 + headHeight / 2 + scatter;
        positions[i * 3 + 2] = (randomValues[i * 3 + 2] - 0.5) * size / 10;
      }
      // Body
      else if (i < particleCount * 0.6) {
        positions[i * 3] = (randomValues[i * 3] - 0.5) * size / 3 + scatter;
        positions[i * 3 + 1] = (randomValues[i * 3 + 1] - 0.5) * bodyHeight  + scatter;
        positions[i * 3 + 2] = (randomValues[i * 3 + 2] - 0.5) * size / 15;
      }
      // Arms and legs
      else {
        const limb = Math.floor(randomValues[i * 3] * 4);
        if (limb < 2) {
          // Arms
          positions[i * 3] = ((limb % 2) * 2 - 1) * size / 2 + scatter;
          positions[i * 3 + 1] = (randomValues[i * 3 + 1] - 0.5) * size / 3 + scatter;
        } else {
          // Legs
          positions[i * 3] = ((limb % 2) * 2 - 1) * size / 4 + scatter;
          positions[i * 3 + 1] = ((randomValues[i * 3 + 1] * 2 - 1) * size / 2) - (bodyHeight / 2) + scatter;
        }
        positions[i * 3 + 2] = (randomValues[i * 3 + 2] - 0.5) * size / 15;
      }
    }
    
    return positions;
  },

  tree: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3);
    const trunkHeight = 100;
    const trunkWidth = 20;
    const crownRadius = 80;

    for (let i = 0; i < particleCount; i++) {
      const scatter = randomValues[i * 3] * 20 - 10;
      const t = i / particleCount * Math.PI * 2;

      // Trunk
      if (i < particleCount * 0.2) {
        positions[i * 3] = scatter; // X position
        positions[i * 3 + 1] = (i / particleCount) * trunkHeight; // Y position
        positions[i * 3 + 2] = scatter; // Z position
      }
      // Leaves
      else {
        const leafHeight = trunkHeight + (Math.random() * crownRadius);
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * crownRadius;

        positions[i * 3] = radius * Math.cos(angle) + scatter; // X position
        positions[i * 3 + 1] = leafHeight; // Y position
        positions[i * 3 + 2] = radius * Math.sin(angle) + scatter; // Z position
      }
    }
    return positions;
  },
  smiley: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3)
    const radius = 200
    
    for (let i = 0; i < particleCount; i++) {
      const scatter = randomValues[i * 3] * 20 - 10
      const t = i / particleCount * Math.PI * 2
      
      // Face circle
      if (i < particleCount * 0.6) {
        positions[i * 3] = radius * Math.cos(t) + scatter
        positions[i * 3 + 1] = radius * Math.sin(t) + scatter
        positions[i * 3 + 2] = randomValues[i * 3 + 2] * 20 - 10
      }
      // Eyes
      else if (i < particleCount * 0.8) {
        const eye = i % 2
        positions[i * 3] = (eye * 2 - 1) * radius/3 + scatter
        positions[i * 3 + 1] = radius/3 + scatter
        positions[i * 3 + 2] = randomValues[i * 3 + 2] * 20 - 10
      }
      // Smile
      else {
        const smile = Math.PI * (0.1 + 0.8 * (i / particleCount))
        positions[i * 3] = radius/2 * Math.cos(smile) + scatter
        positions[i * 3 + 1] = radius/2 * Math.sin(smile) - radius/3 + scatter
        positions[i * 3 + 2] = randomValues[i * 3 + 2] * 20 - 10
      }
    }
    return positions
  },

  infinity: (particleCount: number, randomValues: Float32Array) => {
    const positions = new Float32Array(particleCount * 3)
    const size = 400 
    
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount * Math.PI * 2
      const scatter = randomValues[i * 3] * 20 - 10
      
      // Lemniscate formula (infinity symbol)
      const a = size / 2
      const denom = 1 + Math.sin(t) * Math.sin(t)
      positions[i * 3] = (a * Math.cos(t)) / denom + scatter
      positions[i * 3 + 1] = (a * Math.sin(t) * Math.cos(t)) / denom + scatter
      positions[i * 3 + 2] = randomValues[i * 3 + 2] * 20 - 10
    }
    return positions
  }
}

interface ContactFormData {
  email: string;
  message: string;
}

function RoseUniverse({ onAnimationComplete }: RoseUniverseProps) {
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
  const shapeIndex = useRef(0)
  const [showContactForm, setShowContactForm] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' })

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
              const nextShape = shapes[shapeIndex.current] as ShapeType;
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
        
        const repelStrength = Math.max(0, 1 - dist / 100) * 4 // Reduced distance effect to 10%
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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true);
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Important for CORS
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit form')
      }

      const data = await response.json()
      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you for your message! We\'ll be in touch soon.' 
      })
      setFormData({ email: '', message: '' }) // Reset form
      setTimeout(() => setShowContactForm(false), 3000) // Hide form after 3 seconds

    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again later.' 
      })
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  }

  return ( 
    <>
      <div ref={containerRef} className="fixed inset-0 z-0 bg-black" />
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
                  className="mt-4 text-lg font-semibold text-white cursor-pointer" // Added cursor-pointer class
                  whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)", boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)" }}
                  onClick={() => setShowContactForm(true)} // Show contact form on click
                >
                  Curious? Contact Us!
                </motion.div>
              </div>

              {showContactForm && ( // Conditional rendering of the contact form
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: .1 }}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-lg w-80 border border-white/20"
                >
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
                    />
                    <textarea
                      placeholder="Your message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      rows={2}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
                    />
                    <button
                      type="submit"
                      className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm transition-all duration-300"
                    >
                      Connect with us
                    </button>
                    {submitStatus.type && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-sm ${
                          submitStatus.type === 'success' ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {submitStatus.message}
                      </motion.p>
                    )}
                  </form>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </>
  )
}

export default RoseUniverse 