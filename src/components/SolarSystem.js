'use client'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Planet from './Planet'
import PlanetSidebar from './PlanetSidebar'
import Stars from './Stars'

const planets = [
  { name: "Sun", radius: 3, distance: 0, color: "#f6f3a7", speed: 0 },
  { name: "Mercury", radius: 0.4, distance: 5, color: "#b5b3ae", speed: 0.02 },
  { name: "Venus", radius: 0.6, distance: 7, color: "#e6c229", speed: 0.015 },
  { name: "Earth", radius: 0.6, distance: 10, color: "#6b93d6", speed: 0.01 },
  { name: "Mars", radius: 0.5, distance: 13, color: "#e27b58", speed: 0.008 },
  { name: "Jupiter", radius: 1.2, distance: 18, color: "#c88b3a", speed: 0.005 },
  { name: "Saturn", radius: 1, distance: 22, color: "#e4d191", speed: 0.003, hasRing: true },
  { name: "Uranus", radius: 0.8, distance: 26, color: "#d1f1f1", speed: 0.002 },
  { name: "Neptune", radius: 0.8, distance: 30, color: "#5b5ddf", speed: 0.001 },
]

export default function SolarSystem() {
  const [expandedPlanet, setExpandedPlanet] = useState(null)

  return (
    <div style={{ 
      display: 'flex', 
      width: '100vw', 
      height: '100vh',
      background: 'radial-gradient(circle at center, #0a0e23 0%, #000000 100%)'
    }}>
      <div style={{ flex: 1 }}>
        <Canvas camera={{ position: [0, 20, 25], fov: 50 }}>
          <Stars />
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 0, 0]} intensity={2} color="#f6f3a7" />
          {planets.map((planet) => (
            <Planet key={planet.name} {...planet} />
          ))}
          <OrbitControls enableZoom={true} />
        </Canvas>
      </div>
      
      <PlanetSidebar 
        planets={planets} 
        expandedPlanet={expandedPlanet}
        setExpandedPlanet={setExpandedPlanet}
      />
    </div>
  )
}