'use client'
import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

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

// Modern glassmorphism sidebar with planet list
const PlanetSidebar = ({ planets, expandedPlanet, setExpandedPlanet }) => (
  <div style={{
    width: '320px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderLeft: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    padding: '24px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
    <h2 style={{
      margin: '0 0 20px 0',
      fontSize: '1.5rem',
      fontWeight: '600',
      background: 'linear-gradient(90deg, #fff, #aaa)',
      WebkitBackgroundClip: 'text',
      color: 'transparent'
    }}>SOLAR SYSTEM</h2>
    
    {planets.map((planet) => (
      <div key={planet.name} style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '16px',
        transition: 'all 0.3s ease',
        border: expandedPlanet === planet.name 
          ? '1px solid rgba(255, 255, 255, 0.3)' 
          : '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '16px',
              height: '16px',
              background: planet.color,
              borderRadius: '50%',
              boxShadow: `0 0 8px ${planet.color}`
            }}/>
            <span style={{ 
              fontWeight: '500',
              color: '#fff'
            }}>{planet.name}</span>
          </div>
          <button 
            onClick={() => setExpandedPlanet(expandedPlanet === planet.name ? null : planet.name)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              transition: 'all 0.2s ease',
              ':hover': {
                background: 'rgba(255, 255, 255, 0.2)'
              }
            }}
          >
            {expandedPlanet === planet.name ? '▲ Collapse' : '▼ Details'}
          </button>
        </div>
        
        {expandedPlanet === planet.name && (
          <div style={{ 
            marginTop: '12px',
            paddingTop: '12px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
              <InfoItem label="Radius" value={`${planet.radius} units`} />
              <InfoItem label="Distance" value={`${planet.distance} AU`} />
            </div>
            <InfoItem label="Orbital Speed" value={planet.speed.toFixed(4)} />
            {planet.hasRing && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '8px',
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                <div style={{ width: '12px', height: '1px', background: '#d4a76a' }}/>
                Has ring system
              </div>
            )}
          </div>
        )}
      </div>
    ))}
  </div>
)

// Reusable info component
const InfoItem = ({ label, value }) => (
  <div>
    <div style={{ 
      fontSize: '0.75rem',
      color: 'rgba(255, 255, 255, 0.6)',
      marginBottom: '2px'
    }}>{label}</div>
    <div style={{ 
      fontSize: '0.9rem',
      fontWeight: '500'
    }}>{value}</div>
  </div>
)

// Planet component remains the same as before
function Planet({ name, radius, distance, color, speed, hasRing }) {
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