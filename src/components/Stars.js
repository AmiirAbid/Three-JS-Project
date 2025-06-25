'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Stars({ count = 5000 }) {
  const starsRef = useRef()

  // Generate random star positions
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 2000 // Spread stars in a 2000 unit cube
    }
    return positions
  }, [count])

  // Optional: Slow rotation for starfield
  useFrame(() => {
    starsRef.current.rotation.x += 0.0001
    starsRef.current.rotation.y += 0.0001
  })

  return (
    <points ref={starsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={1.5}
        sizeAttenuation={true}
        color="#ffffff"
        transparent
        opacity={0.8}
      />
    </points>
  )
}