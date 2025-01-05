'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { generateShapes, ShapeType, shapes } from './shapes/particleShapes'
import { createTextGeometry } from './textGeometry'
import ScrambleText from './ui/Scramble-Text'

interface RoseUniverseProps {
  onAnimationComplete: () => void;
}

function RoseUniverse({ onAnimationComplete }: RoseUniverseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const geometryRef = useRef<THREE.BufferGeometry | null>(null)
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

    const particleCount = window.innerWidth < 768 ? 50000 : 100000
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
      delay: 1,
      onComplete: () => {
        setTimeout(() => {
          onAnimationComplete()
        }, 3000)
      }
    })

    // Animate to AXESS text formation
    tl.to(positions, {
      duration: 2,
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

    // Animate explosion
    .to(positions, {
      duration: 1,
      ease: 'power2.inOut',
      onUpdate: () => {
        for (let i = 0; i < particleCount; i++) {
          const ix = i * 3
          const burstFactor = i < particleCount * 0.7 ? 1.5 : 0.1
          positions[ix] += (randomValues[i * 3 + 10] * 800 - 400) * burstFactor
          positions[ix + 1] += (randomValues[i * 3 + 11] * 800 - 400) * burstFactor
          positions[ix + 2] += (randomValues[i * 3 + 12] * 800 - 400) * burstFactor
        }
        geometry.attributes.position.needsUpdate = true
      },
      onComplete: () => {
        // Transition to S shape
        const sPositions = generateShapes.s(particleCount, randomValues)
        gsap.to(positions, {
          duration: 2,
          ease: 'power2.inOut',
          onUpdate: () => {
            for (let i = 0; i < particleCount; i++) {
              const ix = i * 3
              positions[ix] += (sPositions[ix] - positions[ix]) * 0.1
              positions[ix + 1] += (sPositions[ix + 1] - positions[ix + 1]) * 0.1
              positions[ix + 2] += (sPositions[ix + 2] - positions[ix + 2]) * 0.1
            }
            geometry.attributes.position.needsUpdate = true
          },
          onComplete: () => {
            // Wait a bit before starting the shape transitions
            setTimeout(startShapeTransitions, 2000)
          }
        })
      }
    })

    const startShapeTransitions = () => {
      const transitionToNextShape = () => {
        // Get the current shape and move to next in sequence
        shapeIndex.current = (shapeIndex.current + 1) % shapes.length
        const nextShape = shapes[shapeIndex.current]
        currentShape.current = nextShape
        
        const nextPositions = generateShapes[nextShape](particleCount, randomValues)
        
        // Directly start with the dissolve animation (removed the small circular transition)
        gsap.to(positions, {
          duration: 2.5,
          ease: 'power1.inOut',
          onUpdate: () => {
            for (let i = 0; i < particleCount; i++) {
              const ix = i * 3
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
            // Form the next shape
            gsap.to(positions, {
              duration: 2.5,
              ease: 'power2.out',
              onUpdate: () => {
                for (let i = 0; i < particleCount; i++) {
                  const ix = i * 3
                  positions[ix] += (nextPositions[ix] - positions[ix]) * 0.05
                  positions[ix + 1] += (nextPositions[ix + 1] - positions[ix + 1]) * 0.05
                  positions[ix + 2] += (nextPositions[ix + 2] - positions[ix + 2]) * 0.05
                }
                geometry.attributes.position.needsUpdate = true
              },
              onComplete: () => {
                // Wait before next transition
                setTimeout(transitionToNextShape, 5000)
              }
            })
          }
        })
      }

      // Start the first transition
      transitionToNextShape()
    }

    // Add RAF throttling
    let lastTime = 0
    const fps = 60
    const interval = 1000 / fps

    const animate = (currentTime: number) => {
      requestAnimationFrame(animate)
      
      const deltaTime = currentTime - lastTime
      if (deltaTime < interval) return
      
      lastTime = currentTime - (deltaTime % interval)
      
      const positions = geometry.attributes.position.array as Float32Array

      // Mouse interaction with magnetic effect
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3
        const dx = positions[ix] - (mousePosition.current.x * 100)
        const dy = positions[ix + 1] - (mousePosition.current.y * 100)
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        const isTextFormation = currentShape.current === 'AXESS'
        const effectMultiplier = isTextFormation ? 0.3 : 1
        
        const repelStrength = Math.max(0, 1 - dist / 100) * 4 * effectMultiplier
        positions[ix] += dx * repelStrength * 0.01
        positions[ix + 1] += dy * repelStrength * 0.01

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

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    const handleResize = () => {
      if (!camera || !renderer) return
      
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.position.z = Math.max(400, window.innerWidth / 4)
    }

    window.addEventListener('resize', handleResize)

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
  }, [onAnimationComplete])

  return <div ref={containerRef} className="fixed inset-0 z-0 bg-black" />
}

export default RoseUniverse 