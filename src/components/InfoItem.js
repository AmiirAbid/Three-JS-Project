'use client'
export default function InfoItem({ label, value }) {
  return (
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
}