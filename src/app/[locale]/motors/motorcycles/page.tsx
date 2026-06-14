'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Heart, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'
const subNav = ['Motors', 'Property', 'Jobs', 'Services', 'The Vault', 'Mobiles & Tablets', 'Community']
const makes = ['Yamaha', 'Honda', 'Kawasaki', 'BMW', 'KTM', 'Ducati', 'Harley-Davidson', 'Vespa']
const motos = [
  { id: 'm1', badge: 'ADVENTURE KING', badgeColor: '#2dd4bf', badgeText: 'white', title: 'BMW R 1250 GS Adventure', subtitle: 'Triple Black Edition | 2024', price: '285,000', priceColor: '#006b5f', specs: ['1250cc', 'New', 'Manual'], image: 'https://images.pexels.com/photos/1616789/pexels-photo-1616789.jpeg?auto=compress&w=700' },
  { id: 'm2', badge: 'PREMIUM SCOOTER', badgeColor: '#ffac5a', badgeText: '#744000', title: 'Yamaha TMAX Tech Max', subtitle: 'Dark Petrol | 2024', price: '165,000', priceColor: '#161d1b', specs: ['560cc', 'New', 'Automatic'], image: 'https://images.pexels.com/photos/2611686/pexels-photo-2611686.jpeg?auto=compress&w=700' },
  { id: 'm3', badge: null, title: 'Triumph Rocket 3 Storm R', subtitle: 'Granite and Sapphire Black | 2024', price: '385,000', priceColor: '#006b5f', specs: ['2500cc', 'New', 'Manual'], image: 'https://images.pexels.com/photos/1715193/pexels-photo-1715193.jpeg?auto=compress&w=700' },
  { id: 'm4', badge: null, title: 'Suzuki Hayabusa', subtitle: 'Glass Sparkle Black | 2024', price: '265,000', priceColor: '#006b5f', specs: ['1340cc', 'New', 'Manual'], image: 'https://images.pexels.com/photos/1464201/pexels-photo-1464201.jpeg?auto=compress&w=700' },
  { id: 'm5', badge: null, title: 'BMW S 1000 RR', subtitle: 'M Package Motorsport | 2024', price: '320,000', priceColor: '#006b5f', specs: ['999cc', 'New', 'Manual'], image: 'https://images.pexels.com/photos/1616789/pexels-photo-1616789.jpeg?auto=compress&w=700' },
  { id: 'm6', badge: null, title: 'Aprilia RSV4 Factory 1100', subtitle: 'Ultra Black | 2024', price: '295,000', priceColor: '#006b5f', specs: ['1099cc', 'New', 'Manual'], image: 'https://images.pexels.com/photos/2611686/pexels-photo-2611686.jpeg?auto=compress&w=700' },
  { id: 'm7', badge: null, title: 'Ducati Panigale V4 S', subtitle: 'Ducati Red | 2024', price: '345,000', priceColor: '#006b5f', specs: ['1103cc', 'New', 'Manual'], image: 'https://images.pexels.com/photos/1715193/pexels-photo-1715193.jpeg?auto=compress&w=700' },
  { id: 'm8', badge: null, title: 'Vespa GTS 300 Super Sport', subtitle: 'Orange | 2024', price: '85,000', priceColor: '#161d1b', specs: ['278cc', 'New', 'Automatic'], image: 'https://images.pexels.com/photos/1464201/pexels-photo-1464201.jpeg?auto=compress&w=700' },
  { id: 'm9', badge: null, title: 'Honda CRF1100L Africa Twin', subtitle: 'Grand Prix Red | 2023', price: '195,000', priceColor: '#006b5f', specs: ['1100cc', 'Used', 'Manual'], image: 'https://images.pexels.com/photos/1616789/pexels-photo-1616789.jpeg?auto=compress&w=700' },
  { id: 'm10', badge: 'TRACK ONLY', badgeColor: '#2dd4bf', badgeText: 'white', title: 'Kawasaki Ninja H2R', subtitle: 'Carbon Fiber Finish | 2024', price: '550,000', priceColor: '#006b5f', specs: ['998cc Supercharged', 'New', 'Manual'], image: 'https://images.pexels.com/photos/2611686/pexels-photo-2611686.jpeg?auto=compress&w=700' },
  { id: 'm11', badge: null, title: 'MV Agusta Superveloce 800', subtitle: 'Rosso and Gold | 2024', price: '245,000', priceColor: '#006b5f', specs: ['798cc', 'New', 'Manual'], image: 'https://images.pexels.com/photos/1715193/pexels-photo-1715193.jpeg?auto=compress&w=700' },
  { id: 'm12', badge: null, title: 'Harley-Davidson Nightster Special', subtitle: 'Billiard Gray | 2024', price: '185,000', priceColor: '#006b5f', specs: ['975cc', 'New', 'Manual'], image: 'https://images.pexels.com/photos/1464201/pexels-photo-1464201.jpeg?auto=compress&w=700' },
  { id: 'm13', badge: null, title: 'Moto Guzzi V100 Mandello', subtitle: 'Bianco Polare | 2024', price: '195,000', priceColor: '#006b5f', specs: ['1042cc', 'New', 'Manual'], image: 'https://images.pexels.com/photos/1616789/pexels-photo-1616789.jpeg?auto=compress&w=700' },
  { id: 'm14', badge: null, title: 'BMW C 400 GT', subtitle: 'Callisto Grey Metallic | 2024', price: '95,000', priceColor: '#161d1b', specs: ['350cc', 'New', 'Automatic'], image: 'https://images.pexels.com/photos/2611686/pexels-photo-2611686.jpeg?auto=compress&w=700' },
  { id: 'm15', badge: null, title: 'Honda Forza 750', subtitle: 'Iridium Gray Metallic | 2024', price: '135,000', priceColor: '#161d1b', specs: ['745cc', 'New', 'Automatic'], image: 'https://images.pexels.com/photos/1715193/pexels-photo-1715193.jpeg?auto=compress&w=700' },
  { id: 'm16', badge: null, title: 'Ducati Streetfighter V4 S', subtitle: 'Grey Nero | 2024', price: '315,000', priceColor: '#006b5f', specs: ['1103cc', 'New', 'Manual'], image: 'https://images.pexels.com/photos/1464201/pexels-photo-1464201.jpeg?auto=compress&w=700' },
]
function MotoCard({ moto }: { moto: typeof motos[0] }) {
  const [saved, setSaved] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.45)', borderRadius: '48px', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', boxShadow: hovered ? '0 20px 48px rgba(107,122,118,0.16)' : '0 4px 20px rgba(107,122,118,0.08)', transition: 'all 0.3s ease', transform: hovered ? 'translateY(-3px)' : 'translateY(0)' }}>
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden', backgroundColor: '#e8efec' }}>
        <img src={moto.image} alt={moto.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        {moto.badge && <div style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: moto.badgeColor, color: moto.badgeText, fontSize: '10px', fontWeight: 800, padding: '4px 12px', borderRadius: '100px', letterSpacing: '0.06em', fontFamily: 'Inter, sans-serif' }}>{moto.badge}</div>}
        <button onClick={e => { e.stopPropagation(); setSaved(!saved) }} style={{ position: 'absolute', top: '12px', right: '12px', width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(12px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Heart size={17} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : '#161d1b'} />
        </button>
      </div>
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#161d1b', lineHeight: 1.2, marginBottom: '4px', fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{moto.title}</h3>
            <p style={{ fontSize: '13px', color: '#6b7a76', fontFamily: 'Inter, sans-serif' }}>{moto.subtitle}</p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: moto.priceColor, lineHeight: 1, letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>{moto.price}</div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#6b7a76', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>MAD</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {moto.specs.map(spec => <span key={spec} style={{ padding: '3px 10px', backgroundColor: '#e8efec', color: '#3c4a46', fontSize: '10px', fontWeight: 700, borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif' }}>{spec}</span>)}
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          {[{ emoji: '📞', label: 'Call' }, { emoji: '💬', label: 'WhatsApp' }, { emoji: '✉️', label: 'Message' }].map(btn => (
            <button key={btn.label} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '9px 4px', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.4)', backgroundColor: '#f4fbf8', fontSize: '11px', fontWeight: 700, color: '#161d1b', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#e8efec'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f4fbf8'}>
              <span style={{ fontSize: '13px' }}>{btn.emoji}</span> {btn.label}
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}
export default function MotorcyclesPage() {
  const [activeSubNav, setActiveSubNav] = useState('Motors')
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'white', borderBottom: '1px solid rgba(186,202,197,0.3)', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '14px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/en" style={{ textDecoration: 'none', fontSize: '28px', fontWeight: 800, color: '#006b5f', letterSpacing: '-0.03em', fontFamily: 'Inter, sans-serif' }}>SouKni</Link>
            <button style={{ fontSize: '13px', fontWeight: 600, color: '#3c4a46', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>Casablanca ▾</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {['Insurances', 'Pro', 'Finance'].map(item => <a key={item} href="#" style={{ fontSize: '14px', fontWeight: 600, color: '#3c4a46', textDecoration: 'none' }}>{item}</a>)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button style={{ backgroundColor: '#006b5f', color: 'white', border: 'none', padding: '9px 20px', borderRadius: '100px', fontSize: '12px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>100% FREE ADS</button>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(186,202,197,0.22)', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 40px', display: 'flex', gap: '32px' }}>
            {subNav.map(item => <button key={item} onClick={() => setActiveSubNav(item)} style={{ padding: '10px 0', fontSize: '13px', fontWeight: 600, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap', color: activeSubNav === item ? '#161d1b' : '#6b7a76', borderBottom: activeSubNav === item ? '2px solid #2dd4bf' : '2px solid transparent', transition: 'all 0.15s', fontFamily: 'Inter, sans-serif' }}>{item}</button>)}
          </div>
        </div>
      </header>
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '32px 40px 80px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6b7a76', fontFamily: 'Inter, sans-serif' }}>
          {['Home', 'Motors', 'Motorcycles & Scooters'].map((c, i, arr) => <span key={c} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><a href="#" style={{ color: i === arr.length-1 ? '#161d1b' : '#6b7a76', textDecoration: 'none', fontWeight: i === arr.length-1 ? 600 : 400 }}>{c}</a>{i < arr.length-1 && <span>›</span>}</span>)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '44px', fontWeight: 800, color: '#161d1b', marginBottom: '10px', letterSpacing: '-0.02em', fontFamily: 'Inter, sans-serif' }}>Motorcycles & Scooters For Sale</h1>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(45,212,191,0.12)', color: '#006b5f', padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 800, marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>✓ 100% FREE ADS</div>
            <p style={{ fontSize: '16px', color: '#6b7a76', fontFamily: 'Inter, sans-serif' }}>4,852 Ads available in Morocco</p>
          </div>
        </div>
        <div style={{ backgroundColor: 'white', border: '1px solid rgba(186,202,197,0.35)', borderRadius: '12px', display: 'flex', overflow: 'hidden' }}>
          {[{ label: 'City', value: 'Casablanca', hasValue: true }, { label: 'Make And Model', placeholder: 'Search Make, Model...', isInput: true }, { label: 'Price Range', placeholder: 'Select' }, { label: 'Year', placeholder: 'Select' }, { label: 'Kilometers', placeholder: 'Select' }, { label: 'Filters', placeholder: 'Keyword...' }].map((f, i) => (
            <div key={f.label} style={{ flex: f.isInput ? 2 : 1, minWidth: f.isInput ? '160px' : '90px', padding: '10px 16px', borderRight: i < 5 ? '1px solid rgba(186,202,197,0.35)' : 'none', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eef5f2'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
              <label style={{ display: 'block', fontSize: '9px', fontWeight: 800, color: '#605e58', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px', fontFamily: 'Inter, sans-serif' }}>{f.label}</label>
              {f.isInput ? <input type="text" placeholder={f.placeholder} style={{ width: '100%', border: 'none', backgroundColor: 'transparent', fontSize: '13px', outline: 'none', padding: 0, fontFamily: 'Inter, sans-serif' }} /> : <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: '13px', fontWeight: f.hasValue ? 600 : 400, color: f.hasValue ? '#161d1b' : 'rgba(107,122,118,0.7)', fontFamily: 'Inter, sans-serif' }}>{f.hasValue ? f.value : f.placeholder}</span><span style={{ color: '#605e58' }}>▾</span></div>}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
          {makes.map(m => <button key={m} style={{ whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.35)', backgroundColor: '#f4fbf8', fontSize: '13px', fontWeight: 600, color: '#161d1b', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dde4e1'} onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f4fbf8'}>{m}</button>)}
          <button style={{ whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(186,202,197,0.35)', backgroundColor: '#f4fbf8', fontSize: '13px', fontWeight: 600, color: '#2dd4bf', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>View More</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {motos.slice(0, 6).map(m => <MotoCard key={m.id} moto={m} />)}
        </div>
        <div style={{ borderRadius: '48px', overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f4c3a 100%)', padding: '36px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '48px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#2dd4bf', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>Partenaire Officiel</div>
              <h3 style={{ fontSize: '30px', fontWeight: 800, color: 'white', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>Votre tarif en 3 minutes</h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif' }}>Assurance moto dès 99 MAD/mois</p>
            </div>
            <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '14px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Obtenir un devis →</button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {motos.slice(6, 8).map(m => <MotoCard key={m.id} moto={m} />)}
        </div>
        <div style={{ position: 'relative', width: '100%', minHeight: '400px', borderRadius: '48px', overflow: 'hidden', cursor: 'pointer' }}>
          <img src="https://images.pexels.com/photos/1616789/pexels-photo-1616789.jpeg?auto=compress&w=1600" alt="SouKni Moto Pro" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)', display: 'flex', alignItems: 'center' }}>
            <div style={{ maxWidth: '560px', padding: '40px 56px' }}>
              <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '24px', padding: '36px 40px' }}>
                <h2 style={{ fontSize: '42px', fontWeight: 800, color: 'white', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>SouKni Moto & Scooter Pro</h2>
                <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.88)', marginBottom: '28px', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>The Ultimate Destination for Premium Rides & Expert Care.</p>
                <button style={{ backgroundColor: '#2dd4bf', color: '#00201c', border: 'none', padding: '15px 32px', borderRadius: '100px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Explore the Pro Collection →</button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {motos.slice(8, 16).map(m => <MotoCard key={m.id} moto={m} />)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
          <div style={{ display: 'flex', gap: '6px', marginRight: '16px' }}>
            {[ChevronsLeft, ChevronLeft].map((Icon, i) => <button key={i} style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid rgba(186,202,197,0.35)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dde4e1'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}><Icon size={15} color="#6b7a76" /></button>)}
          </div>
          {[1, 2, 3, 4, 5, '...', 10].map((page, i) => <button key={i} onClick={() => typeof page === 'number' && setCurrentPage(page)} style={{ width: '40px', height: '40px', borderRadius: '8px', border: page === currentPage ? 'none' : '1px solid rgba(186,202,197,0.35)', backgroundColor: page === currentPage ? '#2b3230' : 'transparent', color: page === currentPage ? 'white' : '#6b7a76', fontSize: '13px', fontWeight: page === currentPage ? 700 : 400, cursor: page === '...' ? 'default' : 'pointer', fontFamily: 'Inter, sans-serif' }}>{page}</button>)}
          <div style={{ display: 'flex', gap: '6px', marginLeft: '16px' }}>
            {[ChevronRight, ChevronsRight].map((Icon, i) => <button key={i} style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid rgba(186,202,197,0.35)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dde4e1'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}><Icon size={15} color="#6b7a76" /></button>)}
          </div>
        </div>
      </div>
      <footer style={{ backgroundColor: '#7A7A7A', color: 'white', padding: '64px 40px 24px' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>
            <div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: 'white', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>SouKni</div>
              <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>"The Market in your Pocket"</p>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>Morocco's premium marketplace for real estate, motors, electronics and more.</p>
            </div>
            {[{ title: 'Marketplace', links: ['Real Estate', 'Motors', 'Jobs', 'Services'] }, { title: 'Company', links: ['About Us', 'Careers', 'Legal', 'Privacy Policy'] }].map(col => <div key={col.title}><h4 style={{ fontWeight: 700, fontSize: '14px', color: 'white', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif' }}>{col.title}</h4>{col.links.map(link => <a key={link} href="#" style={{ display: 'block', fontSize: '14px', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', marginBottom: '14px', fontFamily: 'Inter, sans-serif' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}>{link}</a>)}</div>)}
            <div>
              <h4 style={{ fontWeight: 700, fontSize: '14px', color: 'white', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif' }}>Experience</h4>
              {[{ icon: '📱', sub: 'Download on the', title: 'App Store' }, { icon: '▶', sub: 'Get it on', title: 'Google Play' }].map(app => <a key={app.title} href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none', marginBottom: '10px' }}><span style={{ fontSize: '24px' }}>{app.icon}</span><div><p style={{ fontSize: '9px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>{app.sub}</p><p style={{ fontSize: '14px', fontWeight: 700, color: 'white', fontFamily: 'Inter, sans-serif' }}>{app.title}</p></div></a>)}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif' }}>© 2026 SouKni. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
