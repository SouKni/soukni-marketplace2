'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin, Heart, Search, ChevronDown, MessageCircle, Globe, ChevronLeft, ChevronRight, Bell, User, Bookmark, Users, ShieldCheck, Apple, PlayCircle, Smartphone, Star, Calendar, Settings, Fuel, ArrowRight, Award, Plus, Compass, Car, Lock, Briefcase, Sparkles } from 'lucide-react'

const navLinks = ['Motors', 'Property', 'The Vault', 'Home & Living', 'Fashion', 'Jobs', 'Mobiles & Computers', 'Services']

type Rental = {
  id: string
  title: string
  agency: string
  year: string
  trans: string
  fuel: string
  dayPrice: string
  monthPrice?: string
  badge?: 'Diamond' | 'Premium'
  image: string
}

const luxurySUVs: Rental[] = [
  { id: '1', title: 'Range Rover Velar P400', agency: 'Verified Agency', year: '2024', trans: 'Auto', fuel: 'Petrol', dayPrice: '1,200', monthPrice: '28,000', badge: 'Diamond', image: 'https://images.pexels.com/photos/3849554/pexels-photo-3849554.jpeg?auto=compress&w=600' },
  { id: '2', title: 'Maserati Grecale Modena', agency: 'Elite Rental', year: '2024', trans: 'Auto', fuel: 'Petrol', dayPrice: '1,500', monthPrice: '32,000', image: 'https://images.pexels.com/photos/12861158/pexels-photo-12861158.jpeg?auto=compress&w=600' },
  { id: '3', title: 'Porsche Cayenne S', agency: 'Verified Agency', year: '2025', trans: 'Auto', fuel: 'Hybrid', dayPrice: '2,000', monthPrice: '45,000', badge: 'Premium', image: 'https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&w=600' },
  { id: '4', title: 'BMW X5 xDrive40i', agency: 'Verified Agency', year: '2024', trans: 'Auto', fuel: 'Petrol', dayPrice: '1,400', monthPrice: '30,000', image: 'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&w=600' },
]

const sedans: Rental[] = [
  { id: '5', title: 'Mercedes S-Class 580', agency: '', year: '', trans: '', fuel: '', dayPrice: '2,500', badge: 'Diamond', image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&w=600' },
  { id: '6', title: 'BMW 7 Series i7', agency: '', year: '', trans: '', fuel: '', dayPrice: '2,400', image: 'https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg?auto=compress&w=600' },
  { id: '7', title: 'Audi A8 L Quattro', agency: '', year: '', trans: '', fuel: '', dayPrice: '2,100', image: 'https://images.pexels.com/photos/3954425/pexels-photo-3954425.jpeg?auto=compress&w=600' },
  { id: '8', title: 'Lexus LS 500h', agency: '', year: '', trans: '', fuel: '', dayPrice: '1,900', image: 'https://images.pexels.com/photos/3954422/pexels-photo-3954422.jpeg?auto=compress&w=600' },
]

const economyFleet = [
  { id: '9', title: 'VW Tiguan 2023', dayPrice: '600', image: 'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&w=600' },
  { id: '10', title: 'Toyota RAV4 Hybrid', dayPrice: '550', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=600' },
  { id: '11', title: 'Dacia Duster 2024', dayPrice: '400', image: 'https://images.pexels.com/photos/3954422/pexels-photo-3954422.jpeg?auto=compress&w=600' },
  { id: '12', title: 'Renault Clio 5', dayPrice: '350', image: 'https://images.pexels.com/photos/3954425/pexels-photo-3954425.jpeg?auto=compress&w=600' },
]

const testimonials = [
  { id: 't1', name: 'Sofia Benani', location: 'Rabat, Morocco', quote: "I've been using SouKni for all my business trips. The rental process is seamless and the 'Verified Agency' badge gives me total peace of mind. Truly the best hub in Morocco!", avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&w=200' },
  { id: 't2', name: 'Youssef Alami', location: 'Casablanca', quote: 'Found a luxury SUV for my family vacation in under 5 minutes. The WhatsApp integration makes communicating with agencies so much faster. Highly recommend!', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&w=200' },
  { id: 't3', name: 'Marc & Emma', location: 'Tourists', quote: 'Renting a car for our Morocco tour was so easy through SouKni. The filters helped us find exactly what we needed for the Atlas mountains!', avatar: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&w=200' },
]

function LuxuryCard({ r }: { r: Rental }) {
  const [saved, setSaved] = useState(false)
  return (
    <div style={{ position: 'relative', backgroundColor: '#eef5f2', borderRadius: '3rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'box-shadow 0.5s' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'}
    >
      <div style={{ position: 'relative', height: '256px', overflow: 'hidden' }}>
        <img src={r.image} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
          {r.badge === 'Diamond' && <span style={{ backgroundColor: '#006b5f', color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>Diamond</span>}
          {r.badge === 'Premium' && <span style={{ backgroundColor: '#ffac5a', color: '#744000', fontSize: '10px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>Premium</span>}
          <button onClick={() => setSaved(!saved)} style={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', border: 'none', padding: '8px', borderRadius: '100px', cursor: 'pointer', color: saved ? '#ba1a1a' : '#006b5f', display: 'flex' }}>
            <Heart size={16} fill={saved ? '#ba1a1a' : 'none'} />
          </button>
        </div>
      </div>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <ShieldCheck size={16} color="#006b5f" fill="#006b5f" />
          <span style={{ fontSize: '13px', color: '#006b5f', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.03em' }}>{r.agency}</span>
        </div>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#161d1b', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis' as const, whiteSpace: 'nowrap' as const }}>{r.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#6b7a76', fontSize: '12px', marginBottom: '16px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {r.year}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Settings size={14} /> {r.trans}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Fuel size={14} /> {r.fuel}</span>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: '#006b5f', fontWeight: 700, fontSize: '24px' }}>{r.dayPrice} MAD <span style={{ fontSize: '12px', fontWeight: 400, color: '#6b7a76' }}>/day</span></p>
          {r.monthPrice && <p style={{ fontSize: '12px', color: '#6b7a76', marginTop: '4px' }}>{r.monthPrice} MAD /month</p>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <button style={{ backgroundColor: '#006b5f', color: 'white', padding: '12px', borderRadius: '1rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 600, fontSize: '14px' }}>
            <MessageCircle size={16} /> Message
          </button>
          <button style={{ backgroundColor: '#25D366', color: 'white', padding: '12px', borderRadius: '1rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 600, fontSize: '14px' }}>
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}

function SedanCard({ r }: { r: Rental }) {
  return (
    <div style={{ position: 'relative', backgroundColor: '#eef5f2', borderRadius: '3rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'box-shadow 0.5s' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'}
    >
      <div style={{ position: 'relative', height: '256px', overflow: 'hidden' }}>
        <img src={r.image} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        {r.badge === 'Diamond' && (
          <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
            <span style={{ backgroundColor: '#006b5f', color: 'white', fontSize: '10px', fontWeight: 700, padding: '4px 12px', borderRadius: '100px', textTransform: 'uppercase' as const }}>Diamond</span>
          </div>
        )}
      </div>
      <div style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#161d1b', marginBottom: '4px' }}>{r.title}</h3>
        <p style={{ color: '#006b5f', fontWeight: 700, fontSize: '20px' }}>{r.dayPrice} MAD <span style={{ fontSize: '12px', fontWeight: 400, color: '#6b7a76' }}>/day</span></p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '24px' }}>
          <button style={{ backgroundColor: '#006b5f', color: 'white', padding: '8px', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>Message</button>
          <button style={{ backgroundColor: '#25D366', color: 'white', padding: '8px', borderRadius: '0.75rem', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>WhatsApp</button>
        </div>
      </div>
    </div>
  )
}
export default function CarRentalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [activeSeller, setActiveSeller] = useState('All Sellers')
  const [diamondFirst, setDiamondFirst] = useState(true)
  const [activeCategory, setActiveCategory] = useState('SUVs (2181)')

  return (
    <div style={{ fontFamily: 'Hanken Grotesk, Inter, sans-serif', backgroundColor: '#f4fbf8', color: '#161d1b', minHeight: '100vh', paddingBottom: '90px' }}>

      {/* ── HEADER (consistent SouKni header) ── */}
      <nav style={{ backgroundColor: 'rgba(244,251,248,0.8)', backdropFilter: 'blur(20px)', borderTop: '4px solid rgba(0,107,95,0.1)', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href={`/${locale}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#006b5f', letterSpacing: '-0.02em' }}>SouKni</span>
            </Link>
            <div style={{ position: 'relative' }}>
              <select style={{ appearance: 'none' as const, backgroundColor: '#eef5f2', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '100px', padding: '6px 28px 6px 16px', fontSize: '13px', fontWeight: 600, color: '#3c4a46', cursor: 'pointer', fontFamily: 'inherit' }}>
                <option>Cities: Rabat</option><option>Casablanca</option><option>Marrakech</option><option>Tangier</option>
              </select>
              <ChevronDown size={16} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' as const, color: '#3c4a46' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {[
                { icon: Globe, label: 'Languages (FR, ES, AR, EN)' },
                { icon: undefined, label: 'Currency (MAD, EUR, GBP, USD)', emoji: '💳' },
                { icon: Heart, label: 'Favorites' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', padding: '0 8px', cursor: 'pointer' }}>
                  {item.icon ? <item.icon size={20} color="#3c4a46" /> : <span style={{ fontSize: '18px' }}>{item.emoji}</span>}
                  <span style={{ fontSize: '9px', color: 'rgba(60,74,70,0.7)', whiteSpace: 'nowrap' as const }}>{item.label}</span>
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', padding: '0 8px', cursor: 'pointer', position: 'relative' }}>
                <span style={{ position: 'relative' }}><Bell size={20} color="#3c4a46" /><span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '6px', height: '6px', backgroundColor: '#ba1a1a', borderRadius: '50%', border: '2px solid #f4fbf8' }} /></span>
                <span style={{ fontSize: '9px', color: 'rgba(60,74,70,0.7)' }}>Notifications</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', padding: '0 16px', cursor: 'pointer', borderLeft: '1px solid rgba(186,202,197,0.2)', marginLeft: '8px' }}>
                <User size={20} color="#3c4a46" />
                <span style={{ fontSize: '11px', color: '#3c4a46' }}>Login / Sign up</span>
              </div>
              <button style={{ backgroundColor: '#006b5f', color: 'white', padding: '10px 24px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 700, marginLeft: '8px', textTransform: 'uppercase' as const }}>
                Place your 100% FREE Ad
              </button>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(186,202,197,0.2)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', gap: '32px', height: '48px' }}>
            {navLinks.map((l, i) => (
              <span key={l} style={{ fontSize: '13px', fontWeight: i === 0 ? 700 : 600, color: i === 0 ? '#006b5f' : '#3c4a46', cursor: 'pointer', borderBottom: i === 0 ? '2px solid #006b5f' : 'none', height: '100%', display: 'flex', alignItems: 'center' }}>{l}</span>
            ))}
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px 128px' }}>
        {/* ── HERO SEARCH ── */}
        <section style={{ position: 'relative', height: '500px', width: '100%', borderRadius: '3rem', overflow: 'hidden', marginTop: '32px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&w=1600" alt="Luxury Automotive Background" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }} />
          <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '640px', padding: '0 20px' }}>
            <h1 style={{ color: 'white', textAlign: 'center' as const, fontSize: '48px', fontWeight: 700, marginBottom: '32px' }}>Discover Your Perfect Rental</h1>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', padding: '8px', borderRadius: '100px', display: 'flex', alignItems: 'center', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.4)', width: '100%' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 24px', borderRight: '1px solid rgba(255,255,255,0.2)' }}>
                <MapPin size={20} color="white" style={{ marginRight: '12px' }} />
                <input placeholder="Cities & More" style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', width: '100%', fontFamily: 'inherit', fontSize: '15px' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 24px', borderRight: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>Vehicles Type</span>
                  <ChevronDown size={20} color="white" />
                </div>
              </div>
              <div style={{ paddingLeft: '8px' }}>
                <button style={{ backgroundColor: '#2dd4bf', color: '#00574d', padding: '12px 40px', borderRadius: '100px', border: 'none', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Search size={20} /> EXPLORE
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── FILTER BAR + BREADCRUMBS ── */}
        <section style={{ marginBottom: '32px' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '2.5rem', padding: '16px', boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '16px', alignItems: 'center' }}>
              <div style={{ padding: '0 16px', borderRight: '1px solid rgba(186,202,197,0.3)' }}>
                <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#6b7a76', marginBottom: '4px' }}>Cities and neighbourhoods</label>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span style={{ fontWeight: 700 }}>Rabat</span>
                  <ChevronDown size={18} color="#006b5f" />
                </div>
              </div>
              <div style={{ padding: '0 16px', borderRight: '1px solid rgba(186,202,197,0.3)' }}>
                <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#6b7a76', marginBottom: '4px' }}>Rental Options</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input placeholder="Daily, Weekly, Monthly" style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontFamily: 'inherit', fontSize: '15px' }} />
                  <Search size={18} color="#006b5f" />
                </div>
              </div>
              <div style={{ padding: '0 16px', borderRight: '1px solid rgba(186,202,197,0.3)' }}>
                <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#6b7a76', marginBottom: '4px' }}>Cars Models</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input placeholder="SUVs, Sedans, Trucks" style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontFamily: 'inherit', fontSize: '15px' }} />
                  <MapPin size={18} color="#006b5f" />
                </div>
              </div>
              <div style={{ padding: '0 16px', borderRight: '1px solid rgba(186,202,197,0.3)' }}>
                <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#6b7a76', marginBottom: '4px' }}>Price (MAD)</label>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span style={{ color: '#bacac5' }}>Select</span>
                  <ChevronDown size={18} color="#006b5f" />
                </div>
              </div>
              <div style={{ padding: '0 16px' }}>
                <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#6b7a76', marginBottom: '4px' }}>Filters</label>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span style={{ fontWeight: 700 }}>1 filter selected</span>
                  <ChevronDown size={18} color="#006b5f" />
                </div>
              </div>
            </div>
          </div>
          <nav style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7a76' }}>
            <span style={{ cursor: 'pointer' }}>Rabat</span><ChevronRight size={14} />
            <span style={{ cursor: 'pointer' }}>Motors</span><ChevronRight size={14} />
            <span style={{ color: '#161d1b', fontWeight: 700 }}>Rental Cars</span>
          </nav>
        </section>

        {/* ── RESULTS HEADER + CATEGORY PILLS ── */}
        <section style={{ marginTop: '48px', maxWidth: '896px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600 }}>New and Used Rental Cars in Morocco <span style={{ color: '#6b7a76', fontWeight: 400 }}>• 6,856 Ads</span></h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'white', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                <ChevronDown size={16} /> Sort: Default
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: 'white', border: '1px solid rgba(186,202,197,0.3)', borderRadius: '12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                <Bookmark size={16} /> Save Search
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' as const, paddingBottom: '16px' }}>
            {[
              { label: 'SUVs (2181)' },
              { label: 'Sedans (2088)' },
              { label: 'Luxury (884)' },
              { label: 'Utility/Trucks (736)' },
            ].map(c => (
              <button key={c.label} onClick={() => setActiveCategory(c.label)}
                style={{ whiteSpace: 'nowrap' as const, padding: '8px 24px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', backgroundColor: activeCategory === c.label ? 'rgba(45,212,191,0.2)' : 'white', color: activeCategory === c.label ? '#006b5f' : '#161d1b', border: activeCategory === c.label ? '1px solid rgba(0,107,95,0.2)' : '1px solid rgba(186,202,197,0.3)' }}>
                {c.label}
              </button>
            ))}
            <button style={{ whiteSpace: 'nowrap' as const, padding: '8px 24px', fontSize: '13px', fontWeight: 700, color: '#006b5f', background: 'none', border: 'none', cursor: 'pointer' }}>View More</button>
          </div>
        </section>

        {/* ── LUXURY SUV FLEET ── */}
        <section style={{ marginTop: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' as const }}>
            <button onClick={() => setActiveSeller('All Sellers')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '1rem', fontWeight: 700, cursor: 'pointer', backgroundColor: activeSeller === 'All Sellers' ? 'rgba(45,212,191,0.2)' : 'white', color: activeSeller === 'All Sellers' ? '#006b5f' : '#3c4a46', border: activeSeller === 'All Sellers' ? '1px solid #006b5f' : '1px solid rgba(186,202,197,0.3)' }}>
              <Users size={20} /> All Sellers
            </button>
            <button onClick={() => setActiveSeller('SouKni Members')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '1rem', fontWeight: 700, cursor: 'pointer', backgroundColor: activeSeller === 'SouKni Members' ? 'rgba(45,212,191,0.2)' : 'white', color: activeSeller === 'SouKni Members' ? '#006b5f' : '#3c4a46', border: activeSeller === 'SouKni Members' ? '1px solid #006b5f' : '1px solid rgba(186,202,197,0.3)' }}>
              <User size={20} /> SouKni Members
            </button>
            <button onClick={() => setActiveSeller('SouKni Pro')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '1rem', fontWeight: 700, cursor: 'pointer', backgroundColor: activeSeller === 'SouKni Pro' ? 'rgba(45,212,191,0.2)' : 'white', color: activeSeller === 'SouKni Pro' ? '#006b5f' : '#3c4a46', border: activeSeller === 'SouKni Pro' ? '1px solid #006b5f' : '1px solid rgba(186,202,197,0.3)' }}>
              <ShieldCheck size={20} /> SouKni Pro
            </button>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#3c4a46', textTransform: 'uppercase' as const, letterSpacing: '0.03em' }}>SouKni Diamond Certified First</span>
              <button onClick={() => setDiamondFirst(!diamondFirst)} style={{ position: 'relative', width: '44px', height: '24px', borderRadius: '100px', backgroundColor: diamondFirst ? '#2dd4bf' : '#e8efec', border: 'none', cursor: 'pointer' }}>
                <div style={{ position: 'absolute', top: '2px', left: diamondFirst ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Luxury SUV Fleet</h2>
              <p style={{ color: '#3c4a46', marginTop: '4px' }}>Premium all-terrain dominance for your Moroccan adventure.</p>
            </div>
            <button style={{ color: '#006b5f', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }}>
              View All SUVs <ArrowRight size={16} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
            {luxurySUVs.map(r => <LuxuryCard key={r.id} r={r} />)}
          </div>
        </section>

        {/* ── CINEMATIC AUTO RENTAL PRO BANNER ── */}
        <section style={{ marginTop: '64px' }}>
          <div style={{ position: 'relative', borderRadius: '4rem', overflow: 'hidden', padding: '80px', backgroundColor: '#006b5f', minHeight: '300px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: '48px' }}>
              <div style={{ maxWidth: '560px' }}>
                <h2 style={{ color: 'white', fontSize: '40px', fontWeight: 700, marginBottom: '16px' }}>SouKni Auto Rental Pro</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px' }}>Unlock advanced fleet management tools, verified badges, and 10x more reach for your rental Agency. The future of cars &amp; Trucks rentals in Morocco is here.</p>
                <button style={{ marginTop: '32px', backgroundColor: 'white', color: '#006b5f', padding: '16px 40px', borderRadius: '100px', border: 'none', fontWeight: 700, cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                  Get Started for FREE
                </button>
              </div>
              <div style={{ flex: '1 1 280px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.4)', padding: '32px', borderRadius: '3rem', textAlign: 'center' as const, maxWidth: '280px' }}>
                  <Award size={48} color="white" style={{ marginBottom: '16px' }} />
                  <h3 style={{ color: 'white', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>Verified Partner</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Join 500+ Elite Agencies Members across the Kingdom.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXECUTIVE SEDANS ── */}
        <section style={{ marginTop: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Executive Sedans</h2>
              <p style={{ color: '#3c4a46', marginTop: '4px' }}>Unmatched comfort for business and city transit.</p>
            </div>
            <button style={{ color: '#006b5f', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }}>
              View All Sedans <ArrowRight size={16} />
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
            {sedans.map(r => <SedanCard key={r.id} r={r} />)}
          </div>
        </section>

        {/* ── DIAMOND MEMBER BANNER ── */}
        <section style={{ marginTop: '64px' }}>
          <div style={{ background: 'linear-gradient(to right, #006b5f, #2dd4bf)', padding: '48px', borderRadius: '3.5rem', display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', color: 'white', boxShadow: '0 25px 50px rgba(0,107,95,0.1)', gap: '32px' }}>
            <div>
              <h2 style={{ fontSize: '40px', fontWeight: 700, lineHeight: 1.2, marginBottom: '16px' }}>Become a Diamond Member</h2>
              <p style={{ opacity: 0.9, maxWidth: '560px' }}>Get priority listing status, unlimited photos, and a custom dashboard to track your fleet's performance in real-time. Elevate your brand with SouKni Diamond.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '32px', fontWeight: 700 }}>Only 0,00 MAD<span style={{ fontSize: '14px', fontWeight: 400, opacity: 0.7 }}> /mo</span></div>
              <button style={{ backgroundColor: 'white', color: '#006b5f', padding: '16px 48px', borderRadius: '100px', border: 'none', fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 16px rgba(0,0,0,0.15)', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                Join the Elite For FREE!
              </button>
            </div>
          </div>
        </section>

        {/* ── ECONOMY & URBAN FLEET ── */}
        <section style={{ marginTop: '64px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Economy &amp; Urban Fleet</h2>
            <p style={{ color: '#3c4a46', marginTop: '4px' }}>Smart choices for every day travel across Morocco.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
            {economyFleet.map(e => (
              <div key={e.id} style={{ backgroundColor: 'white', padding: '16px', borderRadius: '2.5rem', border: '1px solid rgba(186,202,197,0.3)', transition: 'border-color 0.2s' }}
                onMouseEnter={ev => ev.currentTarget.style.borderColor = '#006b5f'}
                onMouseLeave={ev => ev.currentTarget.style.borderColor = 'rgba(186,202,197,0.3)'}>
                <div style={{ aspectRatio: '16/9', borderRadius: '1.5rem', overflow: 'hidden', marginBottom: '16px' }}>
                  <img src={e.image} alt={e.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ fontWeight: 700, color: '#161d1b' }}>{e.title}</h4>
                <p style={{ color: '#006b5f', fontWeight: 700 }}>{e.dayPrice} MAD <span style={{ fontSize: '11px', fontWeight: 400, color: '#6b7a76' }}>/day</span></p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SOCIAL PROOF / TRUSTPILOT ── */}
        <section style={{ marginTop: '64px', padding: '64px 0', backgroundColor: '#dde4e1', borderRadius: '4rem', overflow: 'hidden' }}>
          <div style={{ textAlign: 'center' as const, marginBottom: '48px', padding: '0 32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>Trusted by 10k+ Buyers &amp; Sellers in Morocco</h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#00b67a' }}>
              {[1, 2, 3, 4].map(i => <Star key={i} size={20} fill="#00b67a" />)}
              <Star size={20} fill="#00b67a" style={{ clipPath: 'inset(0 50% 0 0)' }} />
              <span style={{ color: '#161d1b', fontWeight: 700, marginLeft: '8px' }}>4.8 / 5 on Google</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '24px', overflowX: 'auto' as const, padding: '0 40px 32px' }}>
            {testimonials.map(t => (
              <div key={t.id} style={{ minWidth: '320px', backgroundColor: 'white', padding: '32px', borderRadius: '2.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden' }}>
                    <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700 }}>{t.name}</p>
                    <p style={{ fontSize: '12px', color: '#6b7a76' }}>{t.location}</p>
                  </div>
                </div>
                <p style={{ color: '#3c4a46', fontSize: '14px', fontStyle: 'italic' as const }}>"{t.quote}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PAGINATION ── */}
        <section style={{ marginTop: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <button style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronLeft size={20} /></button>
          <button style={{ width: '48px', height: '48px', borderRadius: '50%', border: 'none', backgroundColor: '#006b5f', color: 'white', fontWeight: 700, cursor: 'pointer' }}>1</button>
          {[2, 3].map(n => (
            <button key={n} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', fontWeight: 600, cursor: 'pointer' }}>{n}</button>
          ))}
          <span style={{ color: '#6b7a76' }}>...</span>
          <button style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', fontWeight: 600, cursor: 'pointer' }}>12</button>
          <button style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(186,202,197,0.3)', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronRight size={20} /></button>
        </section>
      </main>

      {/* ── APP BANNER ── */}
      <section style={{ maxWidth: '1440px', margin: '0 auto 80px', padding: '0 40px' }}>
        <div style={{ backgroundColor: '#2b3230', borderRadius: '4rem', padding: '48px', display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: '48px', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'relative', zIndex: 10, maxWidth: '480px' }}>
            <h2 style={{ color: 'white', fontSize: '40px', fontWeight: 700, marginBottom: '16px' }}>Join the SouKni Family</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>Download our mobile app to get instant notifications, message sellers on the go, and browse thousands of listings with ease.</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button style={{ backgroundColor: 'white', color: '#161d1b', padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                <Apple size={24} /> App Store
              </button>
              <button style={{ backgroundColor: 'white', color: '#161d1b', padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                <PlayCircle size={24} /> Google Play
              </button>
            </div>
          </div>
          <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '320px', display: 'flex', justifyContent: 'center' }}>
            <Smartphone size={140} color="rgba(45,212,191,0.4)" />
          </div>
          <div style={{ position: 'absolute', right: '-80px', bottom: '-80px', width: '320px', height: '320px', backgroundColor: '#2dd4bf', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.2 }} />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#dde4e1', padding: '80px 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '48px', marginBottom: '80px' }}>
          <div>
            <span style={{ fontSize: '32px', fontWeight: 700, color: '#006b5f', display: 'block', marginBottom: '24px' }}>SouKni MarketPlace</span>
            <p style={{ color: '#3c4a46', maxWidth: '320px', marginBottom: '32px' }}>The Kingdom's leading classifieds platform for motors, estate, jobs, and more. Built for Morocco, by Morocco.</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              {[Sparkles, Globe, Compass].map((Icon, i) => (
                <button key={i} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', color: '#006b5f', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}><Icon size={20} /></button>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '24px' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
              {['About Us', 'Careers', 'Press', 'Blog'].map(l => <li key={l}><a href="#" style={{ color: '#3c4a46', textDecoration: 'none', fontSize: '14px' }}>{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '24px' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
              {['Help Center', 'Safety Advice', 'Contact Us', 'Terms of Use'].map(l => <li key={l}><a href="#" style={{ color: '#3c4a46', textDecoration: 'none', fontSize: '14px' }}>{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '24px' }}>Top Cities</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
              {['Casablanca', 'Rabat', 'Marrakesh', 'Tangier'].map(l => <li key={l}><a href="#" style={{ color: '#3c4a46', textDecoration: 'none', fontSize: '14px' }}>{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '24px' }}>Languages</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' as const, gap: '16px' }}>
              <li><a href="#" style={{ color: '#006b5f', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>العربية</a></li>
              <li><a href="#" style={{ color: '#3c4a46', textDecoration: 'none', fontSize: '14px' }}>Français</a></li>
              <li><a href="#" style={{ color: '#3c4a46', textDecoration: 'none', fontSize: '14px' }}>English</a></li>
              <li><span style={{ color: '#3c4a46', fontSize: '14px' }}>Espanol</span></li>
            </ul>
          </div>
        </div>
        <div style={{ maxWidth: '1440px', margin: '0 auto', paddingTop: '32px', borderTop: '1px solid rgba(186,202,197,0.5)', display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: '16px', color: '#6b7a76', fontSize: '12px' }}>
          <p>© SouKni 2026. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '32px' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Cookie Settings</a>
          </div>
        </div>
      </footer>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: 'rgba(244,251,248,0.7)', backdropFilter: 'blur(40px)', borderTop: '1px solid rgba(255,255,255,0.2)', zIndex: 50, display: 'none', alignItems: 'center', justifyContent: 'space-around', padding: '12px 16px 24px', borderRadius: '3rem 3rem 0 0', boxShadow: '0 -8px 32px rgba(0,0,0,0.05)' }} className="md:hidden">
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', color: '#006b5f', backgroundColor: 'rgba(45,212,191,0.3)', borderRadius: '100px', padding: '8px 24px' }}>
          <Car size={24} /><span style={{ fontSize: '11px', marginTop: '4px' }}>Motors</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', color: 'rgba(60,74,70,0.8)' }}>
          <span style={{ fontSize: '24px' }}>🏠</span><span style={{ fontSize: '11px', marginTop: '4px' }}>Estate</span>
        </div>
        <div style={{ position: 'relative', top: '-32px' }}>
          <button style={{ width: '56px', height: '56px', backgroundColor: '#006b5f', color: 'white', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,107,95,0.4)' }}>
            <Plus size={28} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', color: 'rgba(60,74,70,0.8)' }}>
          <Lock size={24} /><span style={{ fontSize: '11px', marginTop: '4px' }}>Vault</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', color: 'rgba(60,74,70,0.8)' }}>
          <Briefcase size={24} /><span style={{ fontSize: '11px', marginTop: '4px' }}>Jobs</span>
        </div>
      </nav>
    </div>
  )
}
