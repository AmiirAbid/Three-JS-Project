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

const planetsInfo = [
  {
    name: "Sun",
    radius: 696340, // km
    distance: 0, // km (center)
    mass: 1.989e30, // kg
    gravity: 274, // m/s²
    orbitalPeriod: 0, // days
    rotationPeriod: 25.38, // days (equatorial)
    temperature: "5,500°C (surface)",
    composition: ["Hydrogen (73%)", "Helium (25%)"],
    type: "G-type main-sequence star",
    color: "#f6f3a7"
  },
  {
    name: "Mercury",
    radius: 2439.7, // km
    distance: 57.9, // million km
    mass: 0.0553, // Earth masses
    gravity: 3.7, // m/s²
    orbitalPeriod: 88, // days
    rotationPeriod: 1407.6, // hours
    temperature: "-173 to 427°C",
    atmosphere: ["Trace gases"],
    moons: 0,
    type: "Terrestrial",
    color: "#b5b3ae",
    orbitalSpeed: 47.36 // km/s
  },
  {
    name: "Venus",
    radius: 6051.8, // km
    distance: 108.2, // million km
    mass: 0.815, // Earth masses
    gravity: 8.87, // m/s²
    orbitalPeriod: 224.7, // days
    rotationPeriod: -5832.5, // hours (retrograde)
    temperature: "462°C (average)",
    atmosphere: ["CO₂ (96.5%)", "N₂ (3.5%)"],
    moons: 0,
    type: "Terrestrial",
    color: "#e6c229",
    orbitalSpeed: 35.02 // km/s
  },
  {
    name: "Earth",
    radius: 6371, // km
    distance: 149.6, // million km
    mass: 1, // Earth masses (5.97×10²⁴ kg)
    gravity: 9.807, // m/s²
    orbitalPeriod: 365.25, // days
    rotationPeriod: 23.93, // hours
    temperature: "-88 to 58°C",
    atmosphere: ["N₂ (78%)", "O₂ (21%)", "Ar (1%)"],
    moons: 1,
    type: "Terrestrial",
    color: "#6b93d6",
    orbitalSpeed: 29.78 // km/s
  },
  {
    name: "Mars",
    radius: 3389.5, // km
    distance: 227.9, // million km
    mass: 0.107, // Earth masses
    gravity: 3.71, // m/s²
    orbitalPeriod: 687, // days
    rotationPeriod: 24.6, // hours
    temperature: "-153 to 20°C",
    atmosphere: ["CO₂ (95%)", "N₂ (2.7%)", "Ar (1.6%)"],
    moons: 2,
    type: "Terrestrial",
    color: "#e27b58",
    orbitalSpeed: 24.07 // km/s
  },
  {
    name: "Jupiter",
    radius: 69911, // km
    distance: 778.3, // million km
    mass: 317.8, // Earth masses
    gravity: 24.79, // m/s²
    orbitalPeriod: 4331, // days (~12 years)
    rotationPeriod: 9.93, // hours
    temperature: "-108°C (cloud tops)",
    atmosphere: ["H₂ (90%)", "He (10%)"],
    moons: 95,
    hasRing: true,
    type: "Gas Giant",
    color: "#c88b3a",
    orbitalSpeed: 13.07 // km/s
  },
  {
    name: "Saturn",
    radius: 58232, // km
    distance: 1427, // million km
    mass: 95.2, // Earth masses
    gravity: 10.44, // m/s²
    orbitalPeriod: 10747, // days (~29 years)
    rotationPeriod: 10.7, // hours
    temperature: "-139°C (cloud tops)",
    atmosphere: ["H₂ (96%)", "He (3%)"],
    moons: 146,
    hasRing: true,
    type: "Gas Giant",
    color: "#e4d191",
    orbitalSpeed: 9.69 // km/s
  },
  {
    name: "Uranus",
    radius: 25362, // km
    distance: 2871, // million km
    mass: 14.5, // Earth masses
    gravity: 8.87, // m/s²
    orbitalPeriod: 30589, // days (~84 years)
    rotationPeriod: -17.2, // hours (retrograde)
    temperature: "-197°C (cloud tops)",
    atmosphere: ["H₂ (83%)", "He (15%)", "CH₄ (2%)"],
    moons: 27,
    hasRing: true,
    type: "Ice Giant",
    color: "#d1f1f1",
    orbitalSpeed: 6.81 // km/s
  },
  {
    name: "Neptune",
    radius: 24622, // km
    distance: 4498, // million km
    mass: 17.1, // Earth masses
    gravity: 11.15, // m/s²
    orbitalPeriod: 59800, // days (~165 years)
    rotationPeriod: 16.1, // hours
    temperature: "-201°C (cloud tops)",
    atmosphere: ["H₂ (80%)", "He (19%)", "CH₄ (1%)"],
    moons: 14,
    hasRing: true,
    type: "Ice Giant",
    color: "#5b5ddf",
    orbitalSpeed: 5.43 // km/s
  }
]

export default function SolarSystem() {
  const [expandedPlanet, setExpandedPlanet] = useState(null)
  const [sidebarVisible, setSidebarVisible] = useState(true)

  return (
    <div style={{ 
      display: 'flex', 
      width: '100vw', 
      height: '100vh',
      background: 'radial-gradient(circle at center, #0a0e23 0%, #000000 100%)',
      position: 'relative'
    }}>
      {/* Toggle Button */}
      <button
        onClick={() => setSidebarVisible(!sidebarVisible)}
        style={{
          position: 'absolute',
          right: sidebarVisible ? '340px' : '20px',
          top: '20px',
          zIndex: 20,
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          color: 'white',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem'
        }}
      >
        {sidebarVisible ? '►' : '◄'}
      </button>

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
        planets={planetsInfo} 
        expandedPlanet={expandedPlanet}
        setExpandedPlanet={setExpandedPlanet}
        isVisible={sidebarVisible}
        onToggle={() => setSidebarVisible(!sidebarVisible)}
      />
    </div>
  )
}