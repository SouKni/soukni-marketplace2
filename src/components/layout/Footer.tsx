'use client'

import Link from 'next/link'
import type { Locale } from '@/lib/types'
import { useDictionary } from '@/lib/useDictionary'

export default function Footer({ locale }: { locale: Locale }) {
  const t = useDictionary(locale)

  return (
    <footer style={{ backgroundColor: '#161d1b', color: 'white', paddingTop: '72px', paddingBottom: '32px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>

        {/* TOP ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.4fr', gap: '64px', marginBottom: '56px', paddingBottom: '56px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>

          {/* Brand */}
          <div>
            <div style={{ fontWeight: 900, letterSpacing: '-0.05em', fontSize: '28px', color: 'white', marginBottom: '10px' }}>soukni</div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', marginBottom: '24px', lineHeight: 1.6 }}>{t.footer.brandTagline}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { href:'https://facebook.com',  svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                { href:'https://x.com',         svg:<svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { href:'https://instagram.com', svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { href:'https://linkedin.com',  svg:<svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
                { href:'https://youtube.com',   svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#161d1b"/></svg> },
              ].map(({ href, svg }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ width:'38px', height:'38px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none', transition:'all 0.2s' }}
                  onMouseEnter={e=>{e.currentTarget.style.backgroundColor='rgba(34,212,168,0.15)';e.currentTarget.style.borderColor='#22d4a8'}}
                  onMouseLeave={e=>{e.currentTarget.style.backgroundColor='rgba(255,255,255,0.07)';e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'}}>
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h5 style={{ fontSize:'11px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(255,255,255,0.35)', marginBottom:'20px' }}>{t.footer.contact}</h5>
            <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
              <div>
                <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.35)', marginBottom:'3px', textTransform:'uppercase', letterSpacing:'0.08em' }}>{t.footer.address}</p>
                <a href="https://maps.google.com/?q=Bldg+7+%26+8,+Av.+Attine,+Rabat+10100,+Morocco" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize:'13px', color:'rgba(255,255,255,0.75)', textDecoration:'none', lineHeight:1.6, display:'block', transition:'color 0.2s' }}
                  onMouseEnter={e=>e.currentTarget.style.color='#22d4a8'}
                  onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.75)'}>
                  Bldg 7 &amp; 8, Av. Attine<br />Rabat 10100, Morocco
                </a>
              </div>
              <div>
                <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.35)', marginBottom:'3px', textTransform:'uppercase', letterSpacing:'0.08em' }}>{t.footer.email}</p>
                <a href="mailto:contact@soukni.ma" style={{ fontSize:'13px', color:'rgba(255,255,255,0.75)', textDecoration:'none', transition:'color 0.2s' }}
                  onMouseEnter={e=>e.currentTarget.style.color='#22d4a8'}
                  onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.75)'}>
                  contact@soukni.ma
                </a>
              </div>
              <div>
                <p style={{ fontSize:'11px', color:'rgba(255,255,255,0.35)', marginBottom:'3px', textTransform:'uppercase', letterSpacing:'0.08em' }}>{t.footer.phone}</p>
                <a href="tel:+212530136072" style={{ fontSize:'13px', color:'rgba(255,255,255,0.75)', textDecoration:'none', transition:'color 0.2s' }}
                  onMouseEnter={e=>e.currentTarget.style.color='#22d4a8'}
                  onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.75)'}>
                  +212 5 30 13 60 72
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h5 style={{ fontSize:'11px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(255,255,255,0.35)', marginBottom:'20px' }}>{t.footer.newsletterTitle}</h5>
            <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.5)', marginBottom:'16px', lineHeight:1.6 }}>{t.footer.newsletterSub}</p>
            <div style={{ display:'flex', gap:'8px' }}>
              <input type="email" placeholder={t.footer.emailPlaceholder}
                style={{ flex:1, backgroundColor:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'100px', padding:'12px 18px', color:'white', fontSize:'13px', outline:'none', fontFamily:'Inter, sans-serif', transition:'border 0.2s' }}
                onFocus={e=>e.currentTarget.style.borderColor='#22d4a8'}
                onBlur={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'} />
              <button style={{ backgroundColor:'#22d4a8', color:'white', border:'none', padding:'12px 22px', borderRadius:'100px', fontWeight:700, fontSize:'13px', cursor:'pointer', whiteSpace:'nowrap', transition:'background 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.backgroundColor='#0f9b8e'}
                onMouseLeave={e=>e.currentTarget.style.backgroundColor='#22d4a8'}>{t.footer.subscribe}</button>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'32px', marginBottom:'56px' }}>
          {[
            { title: t.footer.marketplace, links:[
              { label: t.footer.motors,      href:`/${locale}/motors`      },
              { label: t.footer.property,    href:`/${locale}/property`    },
              { label: t.footer.vault,       href:`/${locale}/vault`       },
              { label: t.footer.jobs,        href:`/${locale}/jobs`        },
              { label: t.footer.services,    href:`/${locale}/services`    },
              { label: t.footer.fashion,     href:`/${locale}/fashion`     },
              { label: t.footer.electronics, href:`/${locale}/electronics` },
              { label: t.footer.homeGarden,  href:`/${locale}/home-garden` },
            ]},
            { title: t.footer.company, links:[
              { label: t.footer.aboutUs,       href:`/${locale}/about`   },
              { label: t.footer.careers,       href:`/${locale}/about`   },
              { label: t.footer.press,         href:`/${locale}/about`   },
              { label: t.footer.sustainability,href:`/${locale}/about`   },
              { label: t.footer.legal,         href:`/${locale}/terms`   },
            ]},
            { title: t.footer.support, links:[
              { label: t.footer.helpCenter,  href:`/${locale}/help`    },
              { label: t.footer.safetyTips,  href:`/${locale}/safety`  },
              { label: t.footer.trustSafety, href:`/${locale}/safety`  },
              { label: t.footer.contactUs,   href:`/${locale}/contact` },
            ]},
            { title: t.footer.resources, links:[
              { label: t.footer.marketTrends,  href:`/${locale}/feed`     },
              { label: t.footer.appDownload,   href:`/${locale}/welcome`  },
              { label: t.footer.advertising,   href:`/${locale}/diamond`  },
              { label: t.footer.partnerWithUs, href:`/${locale}/contact`  },
            ]},
          ].map(({ title, links }) => (
            <div key={title}>
              <h5 style={{ fontSize:'11px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'rgba(255,255,255,0.35)', marginBottom:'18px' }}>{title}</h5>
              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {links.map(({ label, href }) => (
                  <Link key={label} href={href}
                    style={{ fontSize:'13px', color:'rgba(255,255,255,0.55)', textDecoration:'none', transition:'color 0.2s' }}
                    onMouseEnter={e=>e.currentTarget.style.color='white'}
                    onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.55)'}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* APP DOWNLOAD */}
        <div style={{ marginBottom:'40px', paddingBottom:'40px', borderBottom:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', gap:'16px', flexWrap:'wrap' }}>
          <span style={{ fontSize:'12px', fontWeight:600, color:'rgba(255,255,255,0.35)', textTransform:'uppercase', letterSpacing:'0.08em', marginRight:'8px' }}>{t.footer.download}</span>
          {[
            { label:'App Store',    sublabel: t.footer.downloadOnThe, href:`/${locale}/welcome`, svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> },
            { label:'Google Play',  sublabel: t.footer.getItOn,       href:`/${locale}/welcome`, svg:<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="m3 20.5v-17c0-.83 1-.98 1.45-.5l14 8.5c.41.25.41.75 0 1l-14 8.5c-.45.48-1.45.33-1.45-.5z"/></svg> },
          ].map(app=>(
            <Link key={app.label} href={app.href}
              style={{ display:'flex', alignItems:'center', gap:'10px', backgroundColor:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)', padding:'10px 18px', borderRadius:'100px', textDecoration:'none', transition:'all 0.2s' }}
              onMouseEnter={e=>{e.currentTarget.style.backgroundColor='rgba(34,212,168,0.1)';e.currentTarget.style.borderColor='#22d4a8'}}
              onMouseLeave={e=>{e.currentTarget.style.backgroundColor='rgba(255,255,255,0.06)';e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'}}>
              {app.svg}
              <span style={{ lineHeight:1.3 }}>
                <span style={{ display:'block', fontSize:'9px', color:'rgba(255,255,255,0.4)', textTransform:'uppercase', letterSpacing:'0.06em' }}>{app.sublabel}</span>
                <span style={{ display:'block', fontSize:'13px', color:'white', fontWeight:700 }}>{app.label}</span>
              </span>
            </Link>
          ))}
        </div>

        {/* BOTTOM ROW */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
          <div style={{ display:'flex', gap:'24px' }}>
            {[
              { label: t.footer.privacyPolicy,   href:`/${locale}/privacy` },
              { label: t.footer.termsOfService,  href:`/${locale}/terms`   },
              { label: t.footer.cookiePolicy,    href:`/${locale}/terms`   },
              { label: t.footer.sitemap,         href:`/${locale}/about`   },
            ].map(({ label, href }) => (
              <Link key={label} href={href}
                style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)', textDecoration:'none', transition:'color 0.2s' }}
                onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.7)'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.3)'}>
                {label}
              </Link>
            ))}
          </div>
          <span style={{ fontSize:'11px', color:'rgba(255,255,255,0.3)' }}>{t.footer.allRightsReserved}</span>
        </div>

      </div>
    </footer>
  )
}
