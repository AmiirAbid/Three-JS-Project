'use client'
import { useState, useEffect } from 'react'
import InfoItem from './InfoItem'
import { 
    detailsStyle,
    sectionStyle,
    headerStyle,
    atmosphereStyle,
    gasStyle,
    infoGridStyle
  } from './styles'

export default function PlanetSidebar({ planets, expandedPlanet, setExpandedPlanet, isVisible, onToggle }) {
    const [isMounted, setIsMounted] = useState(isVisible)

    // Handle animation mount/unmount
    useEffect(() => {
        if (isVisible) {
        setIsMounted(true)
        } else {
        const timer = setTimeout(() => setIsMounted(false), 300) // Match transition duration
        return () => clearTimeout(timer)
        }
    }, [isVisible])

    if (!isMounted) return null

    return (
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
            gap: '12px',
            transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease',
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 10,
            scrollbarWidth: 'thin', // For Firefox
            scrollbarGutter: 'stable',
            '&::WebkitScrollbar': {
                width: '8px',
            },
            '&::WebkitScrollbarTrack': {
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '10px',
                margin: '4px 0',
            },
            '&::WebkitScrollbarThumb': {
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '10px',
                border: '2px solid rgba(255,255,255,0.05)',
                backgroundClip: 'padding-box',
                '&:hover': {
                background: 'rgba(255,255,255,0.3)',
                }
            }
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
            <PlanetCard 
            key={planet.name}
            planet={planet}
            isExpanded={expandedPlanet === planet.name}
            onToggle={() => setExpandedPlanet(expandedPlanet === planet.name ? null : planet.name)}
            />
        ))}
        </div>
    )
    }

    function PlanetCard({ planet, isExpanded, onToggle }) {
    return (
        <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '16px',
        transition: 'all 0.3s ease',
        border: isExpanded 
            ? '1px solid rgba(255, 255, 255, 0.3)' 
            : '1px solid rgba(255, 255, 255, 0.1)'
        }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <PlanetIndicator color={planet.color} />
            <span style={{ 
                fontWeight: '500',
                color: '#fff'
            }}>{planet.name}</span>
            </div>
            <ExpandButton 
            isExpanded={isExpanded}
            onClick={onToggle}
            />
        </div>
        
        {isExpanded && <PlanetDetails planet={planet} />}
        </div>
    )
    }

    function PlanetIndicator({ color }) {
    return (
        <div style={{
        width: '16px',
        height: '16px',
        background: color,
        borderRadius: '50%',
        boxShadow: `0 0 8px ${color}`
        }}/>
    )
    }

    function ExpandButton({ isExpanded, onClick }) {
    return (
        <button 
        onClick={onClick}
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
        {isExpanded ? '▲ Collapse' : '▼ Details'}
        </button>
    )
    }

    function PlanetDetails({ planet }) {
        return (
          <div style={detailsStyle}>
            {/* Physical Characteristics */}
            <div style={sectionStyle}>
              <h3 style={headerStyle}>Physical Characteristics</h3>
              <div style={infoGridStyle}>
                <InfoItem label="Radius" value={`${planet.radius.toLocaleString()} km`} />
                <InfoItem label="Mass" value={
                  planet.name === 'Earth' 
                    ? '5.97 × 10²⁴ kg' 
                    : `${planet.mass} Earth masses`
                } />
                <InfoItem label="Gravity" value={`${planet.gravity} m/s²`} />
                {planet.temperature && (
                  <InfoItem label="Temperature" value={planet.temperature} />
                )}
              </div>
            </div>
      
            {/* Orbital Characteristics */}
            <div style={sectionStyle}>
              <h3 style={headerStyle}>Orbital Characteristics</h3>
              <div style={infoGridStyle}>
                <InfoItem 
                  label="Distance from Sun" 
                  value={`${planet.distance.toLocaleString()}M km`} 
                />
                <InfoItem 
                  label="Orbital Period" 
                  value={
                    planet.orbitalPeriod > 365 
                      ? `${(planet.orbitalPeriod/365).toFixed(1)} Earth years` 
                      : `${planet.orbitalPeriod} Earth days`
                  } 
                />
                {planet.orbitalSpeed && (
                  <InfoItem label="Orbital Speed" value={`${planet.orbitalSpeed} km/s`} />
                )}
                {planet.rotationPeriod && (
                  <InfoItem 
                    label="Day Length" 
                    value={`${Math.abs(planet.rotationPeriod)} hrs${
                      planet.rotationPeriod < 0 ? ' (retrograde)' : ''
                    }`} 
                  />
                )}
              </div>
            </div>
      
            {/* Atmosphere */}
            {planet.atmosphere && (
              <div style={sectionStyle}>
                <h3 style={headerStyle}>Atmosphere Composition</h3>
                <div style={atmosphereStyle}>
                  {planet.atmosphere.map((gas, i) => (
                    <div key={i} style={gasStyle}>
                      <span>{gas}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
      
            {/* Additional Info */}
            <div style={infoGridStyle}>
              {planet.moons !== undefined && (
                <InfoItem 
                  label="Natural Satellites" 
                  value={planet.moons === 0 ? 'None' : planet.moons} 
                />
              )}
              <InfoItem label="Planet Type" value={planet.type} />
              {planet.hasRing && (
                <InfoItem label="Ring System" value="Present" />
              )}
            </div>
          </div>
        )
      }