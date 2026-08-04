'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

/* ─── CROSS-PAGE NAVIGATION HELPERS ─────────────────────── */

export const FASHION_PAGES = [
  { label:'Bags & Wallets',    slug:'bags',        emoji:'👜' },
  { label:'Shoes',             slug:'shoes',       emoji:'👠' },
  { label:'Jewelry & Watches', slug:'jewelry',     emoji:'💎' },
  { label:'Beauty & Skincare', slug:'beauty',      emoji:'✨' },
  { label:'Traditional Wear',  slug:'traditional', emoji:'🧵' },
  { label:'Sports & Activewear',slug:'sports',     emoji:'⚡' },
  { label:'Vintage & Thrift',  slug:'vintage',     emoji:'🏺' },
  { label:'Wedding & Evening', slug:'wedding',     emoji:'💍' },
]

/* Breadcrumb component */
export function FashionBreadcrumb({ pageLabel }: { pageLabel: string }) {
  const params = useParams()
  const locale = (params?.locale as string) || 'en'

  const crumbs = [
    { label:'Rabat',       href:`/${locale}` },
    { label:'The Vault',   href:`/${locale}/vault` },
    { label:'Fashion',     href:`/${locale}/fashion` },
    { label:pageLabel,     href:null },
  ]

  return (
    <nav style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'10px', fontFamily:'Inter,sans-serif', fontWeight:900, letterSpacing:'-0.05em', color:'#6b7a76', textTransform:'uppercase' as const, marginBottom:'12px' }}>
      {crumbs.map((c,i,arr)=>(
        <span key={c.label} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
          {c.href
            ? <Link href={c.href} style={{ color:'#6b7a76', textDecoration:'none', transition:'color 0.15s' }}
                onMouseEnter={e=>e.currentTarget.style.color='#22d4a8'}
                onMouseLeave={e=>e.currentTarget.style.color='#6b7a76'}
              >{c.label}</Link>
            : <span style={{ color:'#161d1b' }}>{c.label}</span>
          }
          {i < arr.length-1 && <span style={{ opacity:0.4 }}>›</span>}
        </span>
      ))}
    </nav>
  )
}

/* Cross-fashion navigation pills */
export function FashionCrossNav({ currentSlug }: { currentSlug: string }) {
  const params = useParams()
  const locale = (params?.locale as string) || 'en'

  return (
    <div style={{ display:'flex', gap:'8px', overflowX:'auto' as const, paddingBottom:'4px', marginBottom:'32px' }}>
      {FASHION_PAGES.filter(p => p.slug !== currentSlug).map(page=>(
        <Link key={page.slug} href={`/${locale}/fashion/${page.slug}`}
          style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 16px', borderRadius:'100px', border:'1px solid rgba(34,212,168,0.25)', backgroundColor:'white', color:'#6b7a76', fontSize:'11px', fontFamily:'Inter,sans-serif', fontWeight:900, letterSpacing:'-0.05em', textDecoration:'none', whiteSpace:'nowrap' as const, transition:'all 0.2s' }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='#22d4a8';e.currentTarget.style.color='#161d1b';e.currentTarget.style.backgroundColor='rgba(34,212,168,0.06)'}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(34,212,168,0.25)';e.currentTarget.style.color='#6b7a76';e.currentTarget.style.backgroundColor='white'}}
        >{page.emoji} {page.label}</Link>
      ))}
    </div>
  )
}

/* Footer with real links */
export function FashionFooter() {
  const params = useParams()
  const locale = (params?.locale as string) || 'en'

  const cols = [
    { title:'Marketplace', links:[
      { label:'Motors',    href:`/${locale}/motors`   },
      { label:'Property',  href:`/${locale}/property` },
      { label:'Fashion',   href:`/${locale}/fashion`  },
      { label:'The Vault', href:`/${locale}/vault`    },
      { label:'Jobs',      href:`/${locale}/jobs`     },
    ]},
    { title:'Company', links:[
      { label:'About Us',  href:`/${locale}/about`   },
      { label:'Careers',   href:`/${locale}/jobs`    },
      { label:'Press Kit', href:`/${locale}/about`   },
    ]},
    { title:'Support', links:[
      { label:'Help Center',   href:`/${locale}/community`  },
      { label:'Safety Center', href:`/${locale}/community`  },
      { label:'Contact',       href:`/${locale}/community`  },
    ]},
  ]

  return (
    <footer style={{ backgroundColor:'#7a7a7a', color:'white', padding:'64px 24px 32px' }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'48px', marginBottom:'48px', paddingBottom:'48px', borderBottom:'1px solid rgba(255,255,255,0.12)' }}>
          <div>
            <Link href={`/${locale}`} style={{ textDecoration:'none' }}>
              <div style={{ fontSize:'28px', fontFamily:'Inter,sans-serif', fontWeight:900, letterSpacing:'-0.05em', color:'#22d4a8', marginBottom:'12px', cursor:'pointer' }}>SouKni</div>
            </Link>
            <p style={{ fontSize:'14px', fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, color:'rgba(255,255,255,0.82)', fontStyle:'italic', marginBottom:'20px' }}>The Market in your Pocket</p>
            <div style={{ display:'flex', gap:'10px' }}>
              {[
                { label:'FB', href:'https://facebook.com' },
                { label:'IG', href:'https://instagram.com' },
                { label:'X',  href:'https://x.com' },
              ].map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ width:'38px', height:'38px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', fontFamily:'Inter,sans-serif', fontWeight:900, color:'rgba(255,255,255,0.6)', textDecoration:'none', transition:'all 0.15s' }}
                  onMouseEnter={e=>{e.currentTarget.style.backgroundColor='#22d4a8';e.currentTarget.style.color='#161d1b'}}
                  onMouseLeave={e=>{e.currentTarget.style.backgroundColor='rgba(255,255,255,0.08)';e.currentTarget.style.color='rgba(255,255,255,0.6)'}}
                >{s.label}</a>
              ))}
            </div>
          </div>
          {cols.map(col=>(
            <div key={col.title}>
              <h4 style={{ fontSize:'10px', fontFamily:'Inter,sans-serif', fontWeight:900, letterSpacing:'-0.05em', textTransform:'uppercase' as const, color:'#22d4a8', marginBottom:'20px' }}>{col.title}</h4>
              {col.links.map(link=>(
                <Link key={link.label} href={link.href}
                  style={{ display:'block', fontSize:'13px', fontFamily:"'Hanken Grotesk',sans-serif", fontWeight:900, color:'rgba(255,255,255,0.65)', textDecoration:'none', marginBottom:'12px', transition:'color 0.15s' }}
                  onMouseEnter={e=>e.currentTarget.style.color='white'}
                  onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.65)'}
                >{link.label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div style={{ textAlign:'center' as const, fontSize:'10px', fontFamily:'Inter,sans-serif', fontWeight:900, color:'rgba(255,255,255,0.35)', textTransform:'uppercase' as const, letterSpacing:'0.2em' }}>
          © 2026 SOUKNI MOROCCO — ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  )
}

/* WhatsApp CTA helper */
export function whatsappLink(phone = '212600000000', message = 'Hi, I found your listing on SouKni!') {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
