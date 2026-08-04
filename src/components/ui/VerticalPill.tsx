'use client'

export default function VerticalPill({ v, locale }: { v: any; locale: string }) {
  return (
    <a
      href={`/${locale}/${v.slug}`}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        padding: '16px 20px', borderRadius: '16px', textDecoration: 'none',
        border: '1px solid #f1f5f9', backgroundColor: '#fafafa',
        transition: 'all 0.2s', minWidth: '90px',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#2dd4bf'; e.currentTarget.style.backgroundColor = '#f0fdfa' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#f1f5f9'; e.currentTarget.style.backgroundColor = '#fafafa' }}
    >
      <span style={{ fontSize: '28px' }}>{v.emoji}</span>
      <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', textAlign: 'center' }}>{v.label}</span>
      <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600 }}>{v.count}</span>
    </a>
  )
}
