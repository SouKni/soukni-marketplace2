'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, MessageCircle, Search, Diamond } from 'lucide-react'

const quickCategories = ['All Vehicles', 'Trucks', 'Forklifts', 'Buses', 'Cranes', 'Trailers']

const topRow = [
  { id: '1', title: '2024 SITRAK C7H 6x4', category: 'Trucks • Prime Mover', price: '515,000 MAD', badge: 'Verified', meta1: { label: 'Year', value: '2024' }, meta2: { label: 'Mileage', value: '0 KM' }, image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&w=600' },
  { id: '2', title: 'BRS Offroad Sherpa', category: 'Trailers • Camping Trailer', price: '515,000 MAD', badge: 'Premium Ad', meta1: { label: 'Condition', value: 'Brand New' }, image: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&w=600' },
  { id: '3', title: 'Toyota 3-ton Forklift', category: 'Forklifts • All Terrain', price: '230,000 MAD', badge: 'Featured', meta1: { label: 'Capacity', value: '3,000 KG' }, image: 'https://images.pexels.com/photos/4506105/pexels-photo-4506105.jpeg?auto=compress&w=600' },
  { id: '4', title: 'Yutong C9 Coach Bus', category: 'Buses • Luxury Coach', price: '700,000 MAD', badge: 'Featured', meta1: { label: 'Seats', value: '45+1' }, image: 'https://images.pexels.com/photos/2402235/pexels-photo-2402235.jpeg?auto=compress&w=600' },
]

const agroVehicles = [
  { id: '5', title: '2024 John Deere 8R 410', category: 'Rabat • Tractors', price: '2,850,000', time: '2 hours ago', image: 'https://images.pexels.com/photos/175389/pexels-photo-175389.jpeg?auto=compress&w=600' },
  { id: '6', title: '2024 New Holland CR11', category: 'Rabat • Combines', price: '4,200,000', time: '2 hours ago', image: 'https://images.pexels.com/photos/162240/harvest-combine-harvester-agriculture-machine-162240.jpeg?auto=compress&w=600' },
  { id: '7', title: '2024 Case IH Magnum 380', category: 'Rabat • Tractors', price: '2,650,000', time: '2 hours ago', image: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&w=600' },
  { id: '8', title: '2024 Fendt 1050 Vario', category: 'Rabat • Tractors', price: '3,100,000', time: '2 hours ago', image: 'https://images.pexels.com/photos/175389/pexels-photo-175389.jpeg?auto=compress&w=600' },
]

const liftingEquipment = [
  { id: '9', title: '2024 Kalmar DRU450 Reach Stacker', category: 'Casablanca • Port Equipment', price: '3,850,000', time: 'Just now', image: 'https://images.pexels.com/photos/4506270/pexels-photo-4506270.jpeg?auto=compress&w=600' },
  { id: '10', title: '2024 JCB 540-170 Telehandler', category: 'Tangier • Lifting Equipment', price: '1,250,000', time: '1 hour ago', image: 'https://images.pexels.com/photos/4506105/pexels-photo-4506105.jpeg?auto=compress&w=600' },
  { id: '11', title: '2024 Jungheinrich EKS 412s Forklift', category: 'Rabat • Material Handling', price: '450,000', time: '3 hours ago', image: 'https://images.pexels.com/photos/4506270/pexels-photo-4506270.jpeg?auto=compress&w=600' },
  { id: '12', title: '2024 Goldhofer STZ-VP Lowboy', category: 'Agadir • Specialized Transport', price: '1,850,000', time: '5 hours ago', image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&w=600' },
]

const constructionMachinery = [
  { id: '13', title: '2024 Caterpillar 320 Hydraulic Excavator', category: 'Rabat • Excavators', price: '1,450,000', time: 'Just now', image: 'https://images.pexels.com/photos/162553/excavator-construction-site-machine-162553.jpeg?auto=compress&w=600' },
  { id: '14', title: '2024 Komatsu D65 Bulldozer', category: 'Casablanca • Bulldozers', price: '1,280,000', time: '1 hour ago', image: 'https://images.pexels.com/photos/162553/excavator-construction-site-machine-162553.jpeg?auto=compress&w=600' },
  { id: '15', title: '2024 Liebherr LTM 1060 Mobile Crane', category: 'Tangier • Mobile Cranes', price: '4,800,000', time: '3 hours ago', image: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&w=600' },
  { id: '16', title: '2024 Mercedes-Benz Arocs 3240 Mixer', category: 'Agadir • Concrete Mixers', price: '950,000', time: '5 hours ago', image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&w=600' },
]

function TopCard({ item }: { item: typeof topRow[0] }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '40px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
        <span style={{ position: 'absolute', top: '14px', left: '14px', backgroundColor: 'rgba(0,107,95,0.92)', color: 'white', fontSize: '9px', fontWeight: 800, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{item.badge}</span>
        <button onClick={() => setLiked(!liked)} style={{ position: 'absolute', top: '14px', right: '14px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Heart size={15} color={liked ? '#ef4444' : 'white'} fill={liked ? '#ef4444' : 'none'} />
        </button>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px', gap: '8px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#161d1b', lineHeight: 1.3 }}>{item.title}</h3>
          <span style={{ color: '#2dd4bf', fontWeight: 800, fontSize: '14px', whiteSpace: 'nowrap' }}>{item.price}</span>
        </div>
        <p style={{ fontSize: '12px', color: '#6b7a76', marginBottom: '16px' }}>{item.category}</p>
        <div style={{ display: 'flex', gap: '16px', padding: '12px 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', marginBottom: '16px' }}>
          <div>
            <p style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '2px' }}>{item.meta1.label}</p>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b' }}>{item.meta1.value}</p>
          </div>
          {item.meta2 && (
            <div>
              <p style={{ fontSize: '9px', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '2px' }}>{item.meta2.label}</p>
              <p style={{ fontSize: '13px', fontWeight: 700, color: '#161d1b' }}>{item.meta2.value}</p>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, backgroundColor: '#eef5f2', color: '#3c4a46', border: 'none', padding: '11px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <MessageCircle size={14} /> Chat
          </button>
          <button style={{ flex: 1, backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '11px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Call</button>
        </div>
      </div>
    </article>
  )
}

function IndustrialCard({ item }: { item: typeof agroVehicles[0] }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <article onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: 'white', borderRadius: '40px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />
        <span style={{ position: 'absolute', top: '14px', left: '14px', background: 'linear-gradient(135deg, #2dd4bf, #2dd4bf)', color: 'white', fontSize: '9px', fontWeight: 800, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Diamond size={10} /> Diamond Member
        </span>
        <button onClick={() => setLiked(!liked)} style={{ position: 'absolute', top: '14px', right: '14px', width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Heart size={15} color={liked ? '#ef4444' : 'white'} fill={liked ? '#ef4444' : 'none'} />
        </button>
        <span style={{ position: 'absolute', bottom: '12px', left: '14px', backgroundColor: 'rgba(0,0,0,0.45)', color: 'white', padding: '3px 10px', borderRadius: '100px', fontSize: '11px' }}>{item.time}</span>
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px', gap: '8px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#161d1b', lineHeight: 1.3 }}>{item.title}</h4>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
          <span style={{ color: '#2dd4bf', fontWeight: 800, fontSize: '17px' }}>{item.price}</span>
          <span style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '11px' }}>MAD</span>
        </div>
        <p style={{ fontSize: '12px', color: '#6b7a76', marginBottom: '16px' }}>{item.category}</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ flex: 1, border: '1px solid #e2e8f0', backgroundColor: 'transparent', color: '#3c4a46', padding: '11px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            Message
          </button>
          <button style={{ flex: 1, backgroundColor: '#25D366', color: 'white', border: 'none', padding: '11px', borderRadius: '100px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>WhatsApp</button>
        </div>
      </div>
    </article>
  )
}

function DiscoverySection({ title, items }: { title: string, items: typeof agroVehicles }) {
  return (
    <section style={{ marginBottom: '56px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#161d1b', letterSpacing: '-0.01em' }}>{title}</h2>
        <a href="#" style={{ color: '#2dd4bf', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>View All</a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {items.map(item => <IndustrialCard key={item.id} item={item} />)}
      </div>
    </section>
  )
}

export default function HeavyVehiclesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activeCategory, setActiveCategory] = useState('All Vehicles')
  const [diamondFirst, setDiamondFirst] = useState(false)

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#f4fbf8', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* BREADCRUMB */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b', marginBottom: '28px' }}>
          <Link href={`/${locale}`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
          <span>›</span>
          <Link href={`/${locale}/motors`} style={{ color: '#2dd4bf', textDecoration: 'none', fontWeight: 600 }}>Motors</Link>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: 700 }}>Heavy Vehicles & Trucks</span>
        </nav>

        {/* TITLE + SORT */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.01em' }}>New and Used Heavy & Agro Vehicles for sale in Rabat</h1>
            <p style={{ fontSize: '14px', color: '#64748b' }}>192 active listings found</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ border: '1px solid #e2e8f0', backgroundColor: 'white', padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, color: '#64748b', cursor: 'pointer' }}>Sort: Default</button>
            <button style={{ border: '1px solid #e2e8f0', backgroundColor: 'white', padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, color: '#64748b', cursor: 'pointer' }}>Save Search</button>
          </div>
        </div>

        {/* FILTER BAR */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.6)', borderRadius: '20px', padding: '8px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[{ label: 'City', val: 'Rabat' }, { label: 'Keyword', val: 'Search brands...' }, { label: 'Price (MAD)', val: 'Select range' }, { label: 'Year', val: 'Any Year' }].map((f, i) => (
              <div key={f.label} style={{ padding: '10px 16px', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                <span style={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: 700, color: '#64748b', letterSpacing: '0.1em', marginBottom: '3px' }}>{f.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#0f172a' }}>{f.val}</span>
              </div>
            ))}
          </div>
          <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '14px 20px', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '13px', flexShrink: 0 }}>
            <Search size={18} /> Find Vehicles
          </button>
        </div>

        {/* CATEGORY PILLS + DIAMOND TOGGLE */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {quickCategories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{ padding: '8px 22px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, backgroundColor: activeCategory === cat ? '#2dd4bf' : '#e8efec', color: activeCategory === cat ? 'white' : '#161d1b', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
                {cat}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>Show SouKni Diamond Verified First</span>
            <div onClick={() => setDiamondFirst(!diamondFirst)}
              style={{ width: '44px', height: '24px', borderRadius: '100px', backgroundColor: diamondFirst ? '#2dd4bf' : '#e2e8f0', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: '2px', left: diamondFirst ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        </div>

        {/* TOP ROW GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '56px' }}>
          {topRow.map(item => <TopCard key={item.id} item={item} />)}
        </div>

        {/* BANNERS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '56px' }}>
          <div style={{ position: 'relative', height: '260px', borderRadius: '40px', overflow: 'hidden', background: 'linear-gradient(135deg, #2dd4bf, #2dd4bf)' }}>
            <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px', color: 'white' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.85, marginBottom: '10px' }}>Certified Services</span>
              <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.01em' }}>SouKni Auto Pro</h2>
              <p style={{ maxWidth: '280px', opacity: 0.85, marginBottom: '24px', fontSize: '14px', lineHeight: 1.5 }}>Premium maintenance and diagnostic services for your heavy fleet.</p>
              <Link href={`/${locale}/motors`} style={{ backgroundColor: 'white', color: '#2dd4bf', padding: '12px 28px', borderRadius: '100px', fontWeight: 800, fontSize: '13px', width: 'fit-content', textDecoration: 'none' }}>Explore Services</Link>
            </div>
          </div>
          <div style={{ position: 'relative', height: '260px', borderRadius: '40px', overflow: 'hidden', backgroundColor: '#161d1b' }}>
            <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px', color: 'white' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#62fae3', marginBottom: '10px' }}>Premium Access</span>
              <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.01em' }}>Become a Diamond Member</h2>
              <p style={{ maxWidth: '280px', opacity: 0.8, marginBottom: '24px', fontSize: '14px', lineHeight: 1.5 }}>Enjoy 0% commissions and unlimited priority listings on all motors.</p>
              <button style={{ backgroundColor: '#2dd4bf', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '100px', fontWeight: 800, fontSize: '13px', width: 'fit-content', cursor: 'pointer' }}>Join Now</button>
            </div>
          </div>
        </div>

        <DiscoverySection title="Featured Agro Vehicles" items={agroVehicles} />
        <DiscoverySection title="Featured Material Handling & Lifting" items={liftingEquipment} />
        <DiscoverySection title="Featured Construction Machinery" items={constructionMachinery} />

        {/* PAGINATION */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          <button style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid #e2e8f0', backgroundColor: 'transparent', cursor: 'pointer' }}>‹</button>
          {[1, 2, 3].map(p => (
            <button key={p} style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: 'none', backgroundColor: p === 1 ? '#2dd4bf' : 'transparent', color: p === 1 ? 'white' : '#161d1b', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>{p}</button>
          ))}
          <span style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '13px' }}>...</span>
          <button style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid #e2e8f0', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>12</button>
          <button style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid #e2e8f0', backgroundColor: 'transparent', cursor: 'pointer' }}>›</button>
        </div>

      </div>
    </div>
  )
}
