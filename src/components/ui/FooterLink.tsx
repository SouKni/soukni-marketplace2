'use client'

export default function FooterLink({ link }: { link: string }) {
  return (
    <a href="#"
      style={{ display: 'block', fontSize: '14px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.color = 'white'}
      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
    >
      {link}
    </a>
  )
}
