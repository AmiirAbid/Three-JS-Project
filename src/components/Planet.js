'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Planet({ radius, distance, color, speed, hasRing }) {
  const planetRef = useRef()
  
  useFrame(() => {
    planetRef.current.rotation.y += speed * 0.5
    planetRef.current.position.x = Math.sin(Date.now() * speed/20) * distance
    planetRef.current.position.z = Math.cos(Date.now() * speed/20) * distance
  })

  return (
    <mesh ref={planetRef}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
      {hasRing && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius * 1.5, radius * 1.8, 32]} />
          <meshStandardMaterial color="#d4a76a" side={THREE.DoubleSide} />
        </mesh>
      )}
    </mesh>
  )
}