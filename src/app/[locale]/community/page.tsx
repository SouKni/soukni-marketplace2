'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Heart, Bell, Search, MapPin, Star, ChevronRight, Globe, CreditCard, Diamond } from 'lucide-react'

const navLinks = ['Motors', 'Property', 'The Vault', 'Services', 'Fashion', 'Jobs', 'Mobiles & Computers', 'Community']

const categoryCards = [
  { icon: '🚛', label: 'Movers & Removals', count: '6,183' },
  { icon: '🔧', label: 'Home Maintenance', count: '4,910' },
  { icon: '📚', label: 'Tutors & Classes', count: '996' },
  { icon: '💼', label: 'Consultancy Services', count: '803' },
  { icon: '🎉', label: 'Event Planning', count: '752' },
  { icon: '🧘', label: 'Wellness & Spa', count: '421' },
]

const movers = [
  { title: 'Expert Home Relocation', rating: 5, reviews: 124, image: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=600' },
  { title: 'Pro Team Removals', rating: 4.5, reviews: 89, image: 'https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&w=600' },
  { title: 'Swift Move Solutions', rating: 4, reviews: 215, image: 'https://images.pexels.com/photos/引1797428/pexels-photo-1797428.jpeg?auto=compress&w=600', imgFallback: 'https://images.pexels.com/photos/4246118/pexels-photo-4246118.jpeg?auto=compress&w=600' },
  { title: 'Careful Hands Logistics', rating: 5, reviews: 56, image: 'https://images.pexels.com/photos/4246117/pexels-photo-4246117.jpeg?auto=compress&w=600', imgFallback: 'https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&w=600' },
]

const maintenance = [
  { title: 'Master Plumbing & Leakage', location: 'Casablanca Finance City', image: 'https://images.pexels.com/photos/8486972/pexels-photo-8486972.jpeg?auto=compress&w=600' },
  { title: 'Pristine Villa Cleaning', location: 'Marrakech Palmery', image: 'https://images.pexels.com/photos/4099467/pexels-photo-4099467.jpeg?auto=compress&w=600' },
  { title: 'Climate Control Experts', location: 'Rabat Agdal', image: 'https://images.pexels.com/photos/3810755/pexels-photo-3810755.jpeg?auto=compress&w=600' },
  { title: 'Smart Home Electricians', location: 'Tangier Marina', image: 'https://images.pexels.com/photos/8985454/pexels-photo-8985454.jpeg?auto=compress&w=600' },
]

const consultants = [
  { title: 'Elite Business Advisors', desc: 'Strategic consulting for Casablanca start-ups and SMEs.', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=600' },
  { title: 'Legal Compliance Experts', desc: 'Professional legal and corporate advisory services in Rabat.', image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&w=600' },
  { title: 'Wealth Management Hub', desc: 'Personalized financial planning and investment consulting.', image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&w=600' },
  { title: 'Digital Transformation Lab', desc: 'Helping Moroccan businesses transition to the digital era.', image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&w=600' },
]

const testimonials = [
  { initials: 'SM', name: 'Sara M.', role: 'Verified Homeowner', text: '"Found an amazing tutor for my daughter through SouKni. The verification process gave me so much peace of mind!"' },
  { initials: 'KA', name: 'Karim A.', role: 'Verified Client', text: '"The movers I hired were professional, punctual, and very careful with my belongings. Highly recommend SouKni Community!"', featured: true },
  { initials: 'OL', name: 'Omar L.', role: 'Business Owner', text: '"Listing my consulting services here has been a game-changer for my business growth in the Casablanca hub."' },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={14} fill={i <= Math.floor(rating) ? '#f59e0b' : (i - 0.5 <= rating ? '#f59e0b' : 'none')} color="#f59e0b" />
      ))}
    </div>
  )
}

function DiamondBadge() {
  return (
    <span style={{ background: 'linear-gradient(135deg, #006b5f 0%, #2dd4bf 100%)', color: 'white', fontSize: '9px', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>Diamond Member</span>
  )
}

function MoverCard({ item }: { item: typeof movers[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ backgroundColor: '#f4fbf8', border: '1px solid #bacac5', borderRadius: '40px', overflow: 'hidden', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.12)' : 'none', transition: 'all 0.3s', cursor: 'pointer' }}>
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} onError={e => { if (item.imgFallback) e.currentTarget.src = item.imgFallback }} />
        <div style={{ position: 'absolute', top: '14px', left: '14px' }}><DiamondBadge /></div>
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }} style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(8px)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#006b5f'; (e.currentTarget.querySelector('svg') as SVGElement).style.color = 'white' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.82)'; (e.currentTarget.querySelector('svg') as SVGElement).style.color = '#161d1b' }}>
          <Heart size={16} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : '#161d1b'} />
        </button>
      </div>
      <div style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#161d1b', marginBottom: '8px', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Stars rating={item.rating} />
          <span style={{ fontSize: '12px', color: '#3c4a46', fontFamily: 'Inter, sans-serif' }}>({item.reviews} Reviews)</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#25D366', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'Inter, sans-serif', transition: 'opacity 0.15s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.88'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>💬 WhatsApp</button>
          <button style={{ flex: 1, backgroundColor: 'transparent', color: '#006b5f', border: '1px solid #006b5f', padding: '12px', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,107,95,0.06)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>✉ Message</button>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ item }: { item: { title: string; location?: string; desc?: string; image: string } }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ backgroundColor: '#f4fbf8', border: '1px solid #bacac5', borderRadius: '40px', overflow: 'hidden', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.12)' : 'none', transition: 'all 0.3s', cursor: 'pointer' }}>
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '14px', left: '14px' }}><DiamondBadge /></div>
      </div>
      <div style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#161d1b', marginBottom: '6px', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>{item.title}</h3>
        {item.location && <p style={{ fontSize: '12px', color: '#3c4a46', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}><MapPin size={13} />{item.location}</p>}
        {item.desc && <p style={{ fontSize: '12px', color: '#3c4a46', marginBottom: '16px', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>{item.desc}</p>}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#25D366', color: 'white', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'opacity 0.15s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.88'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>WhatsApp</button>
          <button style={{ flex: 1, backgroundColor: 'transparent', color: '#006b5f', border: '1px solid #006b5f', padding: '12px', borderRadius: '12px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'background 0.15s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,107,95,0.06)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>Message</button>
        </div>
      </div>
    </div>
  )
}

export default function CommunityPage() {
  const [activeNav, setActiveNav] = useState('Community')
  const [search, setSearch] = useState('')
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
              </div>
          </div>
        </section>

        {/* DIAMOND BANNER */}
        <section style={{ maxWidth: '1280px', margin: '64px auto 0', padding: '0 40px' }}>
          <div style={{ background: 'linear-gradient(135deg, #006b5f 0%, #2dd4bf 100%)', borderRadius: '40px', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', right: '-5%', top: '-20%', opacity: 0.15, fontSize: '280px', lineHeight: 1 }}>💎</div>
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '60%' }}>
              <h2 style={{ fontSize: '42px', fontWeight: 700, color: 'white', marginBottom: '14px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>Become a SouKni Diamond Member</h2>
              <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.9)', marginBottom: '28px', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>Boost your visibility, earn user trust, and get a verified badge that stands out in the marketplace.</p>
              <button style={{ backgroundColor: 'white', color: '#006b5f', border: 'none', padding: '14px 36px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.2)'} onMouseLeave={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'}>Get Verified Now</button>
            </div>
          </div>
        </section>

        {/* MOVERS */}
        <section style={{ maxWidth: '1280px', margin: '64px auto 0', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 600, color: '#161d1b', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>Featured Movers & Removals</h2>
            <a href="#" style={{ color: '#006b5f', fontWeight: 700, textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, sans-serif' }}>View All <ChevronRight size={16} /></a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {movers.map((item, i) => <MoverCard key={i} item={item} />)}
          </div>
        </section>

        {/* HOME MAINTENANCE */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 600, color: '#161d1b', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>Premium Home Maintenance</h2>
            <a href="#" style={{ color: '#006b5f', fontWeight: 700, textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, sans-serif' }}>View All <ChevronRight size={16} /></a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {maintenance.map((item, i) => <ServiceCard key={i} item={item} />)}
          </div>
        </section>

        {/* CONSULTANTS */}
        <section style={{ maxWidth: '1280px', margin: '64px auto 0', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 600, color: '#161d1b', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>Expert Consultants & Firms</h2>
            <a href="#" style={{ color: '#006b5f', fontWeight: 700, textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter, sans-serif' }}>View All <ChevronRight size={16} /></a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {consultants.map((item, i) => <ServiceCard key={i} item={item} />)}
          </div>
        </section>

        {/* ELECTRO PRO BANNER */}
        <section style={{ maxWidth: '1280px', margin: '64px auto 0', padding: '0 40px' }}>
          <div style={{ position: 'relative', height: '400px', borderRadius: '40px', overflow: 'hidden', cursor: 'pointer' }}>
            <img src="https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&w=1600" alt="Electro Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,107,95,0.92) 0%, rgba(0,107,95,0.45) 60%, transparent 100%)', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'relative', zIndex: 10, padding: '0 64px', maxWidth: '560px' }}>
                <div style={{ display: 'inline-block', marginBottom: '20px' }}><DiamondBadge /></div>
                <h2 style={{ fontSize: '52px', fontWeight: 700, color: 'white', marginBottom: '14px', lineHeight: 1.1, letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>SouKni Electro Pro</h2>
                <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.9)', marginBottom: '28px', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>Upgrade your lifestyle with premium electronics and professional installation services. Certified tech experts at your doorstep.</p>
                <button style={{ backgroundColor: 'white', color: '#006b5f', border: 'none', padding: '14px 36px', borderRadius: '100px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.25)'} onMouseLeave={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'}>Discover Pro Tech</button>
              </div>
              <div style={{ position: 'absolute', right: '40px', bottom: '40px', fontSize: '160px', opacity: 0.15, display: 'none' }}>📱</div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ backgroundColor: '#eef5f2', padding: '96px 0', margin: '64px 0' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
              <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#161d1b', marginBottom: '14px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>Trusted by thousands of neighbors</h2>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{ color: '#006b5f', fontWeight: 700, fontSize: '15px', fontFamily: 'Inter, sans-serif' }}>Excellent</span>
                <div style={{ display: 'flex', gap: '2px' }}>{[1,2,3,4,5].map(i => <Star key={i} size={18} fill="#006b5f" color="#006b5f" />)}</div>
                <span style={{ color: '#3c4a46', fontSize: '15px', fontFamily: 'Inter, sans-serif' }}>4.9/5 based on 12,000+ reviews</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', alignItems: 'start' }}>
              {testimonials.map((t, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', border: t.featured ? '1px solid rgba(0,107,95,0.2)' : '1px solid rgba(255,255,255,0.42)', borderRadius: '32px', padding: '32px', boxShadow: t.featured ? '0 8px 24px rgba(0,107,95,0.1)' : '0 4px 16px rgba(0,0,0,0.04)', transform: t.featured ? 'scale(1.05)' : 'scale(1)', position: 'relative', zIndex: t.featured ? 2 : 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: 'rgba(0,107,95,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#006b5f', fontSize: '15px', fontFamily: 'Inter, sans-serif' }}>{t.initials}</div>
                    <div>
                      <h4 style={{ fontWeight: 700, color: '#161d1b', fontSize: '15px', fontFamily: 'Inter, sans-serif' }}>{t.name}</h4>
                      <span style={{ fontSize: '11px', color: '#3c4a46', fontFamily: 'Inter, sans-serif' }}>{t.role}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '15px', color: '#3c4a46', fontStyle: 'italic', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#1a202c', color: 'rgba(244,251,248,0.9)', paddingTop: '64px', paddingBottom: '32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', gap: '32px', marginBottom: '64px' }}>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>SouKni Marketplace</div>
              <p style={{ fontSize: '14px', color: 'rgba(244,251,248,0.7)', lineHeight: 1.7, maxWidth: '260px', marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>Connecting the Moroccan community with trusted services and quality products since 2012.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['🌐', '📤', '💬'].map((icon, i) => <button key={i} style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid rgba(244,251,248,0.2)', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '16px', color: 'rgba(244,251,248,0.7)', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(244,251,248,0.9)'; e.currentTarget.style.color = '#1a202c' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'rgba(244,251,248,0.7)' }}>{icon}</button>)}
              </div>
            </div>
            {[
              { title: 'About Us', links: ['Our Story', 'Careers', 'Press'] },
              { title: 'Support', links: ['Contact Support', 'FAQs', 'Sitemap'] },
              { title: 'Legal', links: ['Terms of Service', 'Privacy Policy'] },
              { title: 'Country', links: ['UAE', 'Morocco', 'Egypt'] },
            ].map(col => (
              <div key={col.title}>
                <h5 style={{ fontWeight: 700, fontSize: '14px', color: 'white', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>{col.title}</h5>
                {col.links.map(link => <a key={link} href="#" style={{ display: 'block', fontSize: '13px', color: col.title === 'Country' && link === 'UAE' ? '#2dd4bf' : 'rgba(244,251,248,0.7)', textDecoration: 'none', marginBottom: '14px', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s', fontWeight: col.title === 'Country' && link === 'UAE' ? 700 : 400 }} onMouseEnter={e => e.currentTarget.style.paddingLeft = '4px'} onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}>{link}</a>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(244,251,248,0.1)', paddingTop: '28px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'rgba(244,251,248,0.5)', fontFamily: 'Inter, sans-serif' }}>© 2026 SouKni Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
