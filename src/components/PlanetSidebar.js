'use client'
import InfoItem from './InfoItem'

export default function PlanetSidebar({ planets, expandedPlanet, setExpandedPlanet }) {
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
  )
}