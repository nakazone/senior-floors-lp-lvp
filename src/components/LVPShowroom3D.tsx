'use client'

import { Suspense, useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { useTexture, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false }
)

/** Superfície vertical (parede) com textura LVP repetida */
function FloorPlane({ textureUrl }: { textureUrl: string }) {
  const texture = useTexture(textureUrl, (tex) => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(4, 2)
    tex.needsUpdate = true
  })
  useEffect(() => {
    return () => texture.dispose()
  }, [texture])

  return (
    <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[6, 4]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  )
}

function SceneContent({ textureUrl }: { textureUrl: string }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const cameraLerpDone = useRef(false)

  useFrame((state) => {
    if (cameraLerpDone.current) return
    const cam = state.camera
    const target = new THREE.Vector3(0, 0, 3.5)
    cam.position.lerp(target, 0.02)
    if (cam.position.distanceTo(target) < 0.01) {
      cameraLerpDone.current = true
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <spotLight position={[-5, 5, 5]} angle={0.3} intensity={0.8} />
      <Suspense fallback={null}>
        <FloorPlane key={textureUrl} textureUrl={textureUrl} />
      </Suspense>
      <OrbitControls
        enableZoom
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={isMobile ? Math.PI / 4 : 0}
        enableRotate
      />
    </>
  )
}

export interface LVPShowroom3DProps {
  selectedTexture: string
  onWebGLFail?: () => void
}

export function LVPShowroom3D({ selectedTexture, onWebGLFail }: LVPShowroom3DProps) {
  const [mounted, setMounted] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (!gl) {
        setHasError(true)
        onWebGLFail?.()
      }
    } catch {
      setHasError(true)
      onWebGLFail?.()
    }
  }, [mounted, onWebGLFail])

  const dpr = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : Math.min(2, window.devicePixelRatio || 1)

  if (!mounted) {
    return (
      <div className="flex aspect-[3/2] w-full max-w-4xl items-center justify-center rounded-xl bg-neutral-800">
        <p className="text-neutral-400">Loading 3D viewer...</p>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="flex aspect-[3/2] w-full max-w-4xl flex-col items-center justify-center gap-2 rounded-xl bg-neutral-800 px-4">
        <p className="text-center text-neutral-400">
          3D viewer not available. Try another device or browser.
        </p>
        <img
          src={selectedTexture}
          alt="Floor texture"
          className="max-h-48 rounded-lg object-cover object-center"
        />
      </div>
    )
  }

  return (
    <div className="aspect-[3/2] w-full max-w-4xl overflow-hidden rounded-xl bg-neutral-900">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, dpr]}
      >
        <SceneContent textureUrl={selectedTexture} />
      </Canvas>
    </div>
  )
}
