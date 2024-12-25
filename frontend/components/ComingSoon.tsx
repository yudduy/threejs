'use client'

import { forwardRef, useEffect, useState, useCallback } from 'react'
import { Navbar } from './navbar'
import { Engine, Container } from '@tsparticles/engine'
import Particles from "react-tsparticles"

export const ComingSoon = forwardRef<HTMLDivElement, { pageName: string }>(
  ({ pageName }, ref) => {
    const [isMounted, setIsMounted] = useState(false)

    const particlesInit = useCallback(async (engine: Engine) => {
      // Initialize particles here, if loadFull is not available
      // Example: await engine.load("your-particle-config");
    }, [])

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
      // console.log(container)
    }, [])

    useEffect(() => {
      setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
      <div ref={ref} className="relative w-full h-screen bg-black overflow-hidden">
        <Particles
          id="tsparticles"
          options={{
            background: {
              color: {
                value: "#000"
              }
            },
            fpsLimit: 120,
            particles: {
              color: {
                value: "#ffffff"
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1
              },
              move: {
                enable: true,
                outModes: {
                  default: "bounce"
                },
                random: true,
                speed: 1,
                straight: false
              },
              number: {
                density: {
                  enable: true,
                  area: 800
                },
                value: 80
              },
              opacity: {
                value: 0.5
              },
              shape: {
                type: "circle"
              },
              size: {
                value: { min: 1, max: 3 }
              }
            },
            detectRetina: true
          }}
        />
        <Navbar />
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Coming Soon
          </h1>
        </div>
      </div>
    )
  }
)

ComingSoon.displayName = 'ComingSoon'