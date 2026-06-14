'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Heart, Share2, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'

const filterFields = [
  { label: 'City', value: 'Casablanca', key: 'city' },
  { label: 'Make', value: 'Search Brand', key: 'make' },
  { label: 'Price Range', value: 'Any Price', key: 'price' },
  { label: 'Fuel Type', value: 'Select', key: 'fuel' },
  { label: 'Filters', value: 'Filter Selected', key: 'filters' },
]

const brandPills = [
  { name: 'Mercedes-Benz', count: 385 },
  { name: 'BMW', count: 148 },
  { name: 'Land Rover', count: 162, active: true },
  { name: 'Nissan', count: 170 },
  { name: 'Kia', count: 138 },
  { name: 'Hyundai', count: 138 },
]

const listings = [
  {
    id: '1',
    make: 'Land Rover',
    model: 'Defender 110',
    year: 2024,
    km: '0 km',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    price: '1,245,000',
    monthlyFinance: '14,200',
    badge: 'Premium',
    badgeColor: 'bg-orange-500',
    verified: true,
    description: 'Experience ultimate luxury and capability with the all-new Defender. Perfect for Casablanca streets or desert adventures.',
    image: 'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg?auto=compress&w=800',
    showFinance: true,
  },
  {
    id: '2',
    make: 'BMW',
    model: 'X5 xDrive40i M Sport',
    year: 2024,
    km: '0 km',
    fuel: 'Hybrid',
    transmission: 'Casablanca',
    price: '980,000',
    monthlyFinance: null,
    badge: null,
    badgeColor: '',
    verified: false,
    sponsored: true,
    description: 'The ultimate performance SUV. Fully loaded with premium features for your Moroccan adventure.',
    image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=800',
    showFinance: false,
  },
  {
    id: '3',
    make: 'Mercedes-Benz',
    model: 'EQS 450+',
    year: 2024,
    km: '0 km',
    fuel: 'Electric',
    transmission: '650km Range',
    price: '1,550,000',
    monthlyFinance: null,
    badge: 'New Arrival',
    badgeColor: 'bg-[#2dd4bf]',
    verified: false,
    description: 'Future-forward luxury. Zero emissions, maximum comfort. The pinnacle of the electric era.',
    image: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&w=800',
    showFinance: false,
  },
  {
    id: '4',
    make: 'GAC',
    model: 'EMKOO GS',
    year: 2026,
    km: '0 km',
    fuel: 'Left Hand',
    transmission: 'GCC Specs',
    price: '77,999',
    monthlyFinance: null,
    badge: 'Car of the Week',
    badgeColor: 'bg-orange-500',
    verified: true,
    description: 'GCC | GAC EMKOO | Agency Warranty 5 Years or 150,000 KM. Modern design meets exceptional performance.',
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&w=800',
    showFinance: false,
  },
  {
    id: '5',
    make: 'Range Rover',
    model: 'Velar R-Dynamic',
    year: 2025,
    km: '0 km',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    price: '845,000',
    monthlyFinance: null,
    badge: null,
    badgeColor: '',
    verified: true,
    description: 'The most refined and capable mid-size SUV. R-Dynamic styling with cutting-edge technology.',
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&w=800',
    showFinance: false,
  },
  {
    id: '6',
    make: 'Audi',
    model: 'RS Q8 2024',
    year: 2024,
    km: '0 km',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    price: '1,650,000',
    monthlyFinance: null,
    badge: null,
    badgeColor: '',
    verified: true,
    description: 'The ultimate performance SUV from Audi Sport. Unmatched power meets everyday versatility.',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&w=800',
    showFinance: false,
  },
  {
    id: '7',
    make: 'Porsche',
    model: '911 Turbo S 2024',
    year: 2024,
    km: '0 km',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    price: '2,450,000',
    monthlyFinance: null,
    badge: null,
    badgeColor: '',
    verified: true,
    description: 'The benchmark for everyday supercars. Experience the pinnacle of German engineering.',
    image: 'https://images.pexels.com/photos/2533092/pexels-photo-2533092.jpeg?auto=compress&w=800',
    showFinance: false,
  },
  {
    id: '8',
    make: 'Maserati',
    model: 'Grecale Trofeo 2024',
    year: 2024,
    km: '0 km',
    fuel: 'Gasoline',
    transmission: 'Automatic',
    price: '1,350,000',
    monthlyFinance: null,
    badge: null,
    badgeColor: '',
    verified: true,
    description: 'Italian elegance meets high-performance SUV capability. The Everyday Exceptional.',
    image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&w=800',
    showFinance: false,
  },
]

const testimonials = [
  { text: 'Excellent service. Found my dream car in less than a week. The verified badge gave me peace of mind.', name: 'Ahmed B.', city: 'Casablanca' },
  { text: 'The mobile app is so smooth. Contacting sellers via WhatsApp is a game changer for the Moroccan market.', name: 'Sara K.', city: 'Marrakech' },
  { text: 'Transparent pricing and great filters. Highly recommended for anyone looking for new car imports.', name: 'Yassine L.', city: 'Rabat' },
]

function NewCarCard({ listing }: { listing: typeof listings[0] }) {
  const [liked, setLiked] = useState(false)

  return (
    <article
      className="bg-white overflow-hidden shadow-sm flex flex-col md:flex-row group border border-transparent hover:border-[#2dd4bf]/20 transition-all"
      style={{ borderRadius: '2.5rem' }}
    >
      {/* Image */}
      <div className="relative w-full md:w-[40%] h-72 md:h-auto overflow-hidden flex-shrink-0">
        <img
          src={listing.image}
          alt={`${listing.make} ${listing.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {listing.badge && (
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`${listing.badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider`}>
              {listing.badge}
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="bg-black/20 hover:bg-black/40 backdrop-blur-md p-2 rounded-full text-white transition-colors">
            <Share2 size={14} />
          </button>
          <button
            onClick={() => setLiked(!liked)}
            className="bg-black/20 hover:bg-black/40 backdrop-blur-md p-2 rounded-full text-white transition-colors"
          >
            <Heart size={14} fill={liked ? '#ef4444' : 'none'} color={liked ? '#ef4444' : 'white'} />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-[#0f172a]">
              {listing.make} • {listing.model}
            </h2>
            {listing.verified && (
              <div className="flex items-center gap-1 text-[#2dd4bf]">
                <CheckCircle size={18} className="fill-[#2dd4bf] text-white" />
                <span className="text-xs font-bold uppercase tracking-widest">Verified</span>
              </div>
            )}
            {listing.sponsored && (
              <span className="text-[10px] font-bold text-[#7A7A7A]/50 uppercase tracking-widest">Sponsored</span>
            )}
          </div>

          <div className="flex gap-4 text-xs font-medium text-[#7A7A7A] mb-4 opacity-70 flex-wrap">
            <span>{listing.year}</span>
            <span>•</span>
            <span>{listing.km}</span>
            <span>•</span>
            <span>{listing.fuel}</span>
            <span>•</span>
            <span>{listing.transmission}</span>
          </div>

          <p className="text-sm text-[#7A7A7A] line-clamp-2 leading-relaxed mb-6">
            {listing.description}
          </p>

          {listing.showFinance ? (
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#f4fbf8] p-4 rounded-2xl">
                <span className="block text-[10px] font-bold text-[#7A7A7A] uppercase tracking-widest mb-1">Selling Price</span>
                <span className="text-xl font-bold text-[#2dd4bf]">{listing.price} <span className="text-xs">MAD</span></span>
              </div>
              <div className="bg-[#f4fbf8] p-4 rounded-2xl">
                <span className="block text-[10px] font-bold text-[#7A7A7A] uppercase tracking-widest mb-1">Monthly Finance</span>
                <span className="text-xl font-bold text-[#0f172a]">{listing.monthlyFinance} <span className="text-xs">MAD/mo</span></span>
              </div>
            </div>
          ) : (
            <div className="bg-[#f4fbf8] p-4 rounded-2xl w-fit mb-8">
              <span className="block text-[10px] font-bold text-[#7A7A7A] uppercase tracking-widest mb-1">
                {listing.showFinance ? 'Selling Price' : 'Price'}
              </span>
              <span className="text-xl font-bold text-[#2dd4bf]">{listing.price} <span className="text-xs">MAD</span></span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button className="flex-1 py-3 border-2 border-[#2dd4bf] text-[#2dd4bf] font-bold rounded-xl hover:bg-[#2dd4bf] hover:text-white transition-all flex items-center justify-center gap-2 text-sm">
            💬 SouKni Message
          </button>
          <button className="flex-1 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 text-sm">
            📱 WhatsApp
          </button>
        </div>
      </div>
    </article>
  )
}

export default function NewCarsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params)
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="bg-[#f4fbf8] min-h-screen" style={{ fontFamily: "'Hanken Grotesk', Inter, sans-serif" }}>

      {/* HEADER */}
      <header
        className="sticky top-0 z-50 border-b px-6 py-4"
        style={{ background: 'rgba(244,251,248,0.8)', backdropFilter: 'blur(20px)', borderColor: 'rgba(212,220,217,0.3)' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-[#2dd4bf] h-10 w-10 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-[#0f172a]">
                SouKni<span className="text-[#2dd4bf]"> Auto Pro</span>
              </span>
            </div>
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#0f172a]">
              <a href="#" className="hover:text-[#2dd4bf] transition-colors">Insurance</a>
              <a href="#" className="text-[#2dd4bf] underline underline-offset-8">Auto Pro</a>
              <a href="#" className="hover:text-[#2dd4bf] transition-colors">Finance</a>
              <a href="#" className="hover:text-[#2dd4bf] transition-colors">New Vehicles</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-[#2dd4bf]/10 rounded-full transition-colors text-[#0f172a]">🔔</button>
            <button className="p-2 hover:bg-[#2dd4bf]/10 rounded-full transition-colors text-[#0f172a]">♡</button>
            <button className="bg-[#0f172a] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#2dd4bf] transition-colors shadow-lg">
              List Your Car
            </button>
          </div>
        </div>

        {/* Category Subnav */}
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-[#d4dcd9]/20 flex items-center justify-center gap-10 text-xs uppercase tracking-widest font-semibold opacity-70">
          {['Motors', 'Property', 'Jobs', 'The Vault', 'Services', 'Mobiles & Tablets', 'Community'].map(item => (
            <a key={item} href="#" className="hover:text-[#2dd4bf] transition-colors text-[#0f172a]">{item}</a>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* BREADCRUMBS */}
        <nav className="flex text-xs mb-6 text-[#7A7A7A]/70 gap-2">
          <a href="#">Home</a> <span>›</span>
          <a href="#">Motors</a> <span>›</span>
          <span className="text-[#7A7A7A] font-semibold">New Cars</span>
        </nav>

        {/* FILTER BAR */}
        <section className="bg-white/60 p-6 rounded-[2.5rem] border border-white mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filterFields.map(field => (
              <div key={field.key}>
                <label className="block text-[10px] font-bold uppercase mb-1 tracking-widest opacity-60 text-[#0f172a]">
                  {field.label}
                </label>
                <div className="w-full border-none bg-[#f4fbf8] rounded-lg text-sm px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-[#e8efec] transition-colors">
                  <span className="text-[#0f172a]">{field.value}</span>
                  <svg className="w-4 h-4 text-[#7A7A7A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LIST STATS */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-bold text-[#0f172a]">New Cars for Sale in Morocco</h1>
            <span className="bg-[#2dd4bf]/10 text-[#2dd4bf] text-xs font-bold px-2 py-0.5 rounded-full">3,580 Ads</span>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-xs font-semibold bg-white px-4 py-2 rounded-lg shadow-sm border border-[#d4dcd9]/20 text-[#0f172a]">
              ⇅ Sort: Default
            </button>
            <button className="flex items-center gap-2 text-xs font-semibold bg-white px-4 py-2 rounded-lg shadow-sm border border-[#d4dcd9]/20 text-[#0f172a]">
              🔖 Save Search
            </button>
          </div>
        </div>

        {/* BRAND CHIPS */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {brandPills.map(brand => (
            <button
              key={brand.name}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                brand.active
                  ? 'bg-[#2dd4bf] text-white'
                  : 'bg-white border border-[#d4dcd9]/30 hover:border-[#2dd4bf] text-[#0f172a]'
              }`}
            >
              {brand.name} ({brand.count})
            </button>
          ))}
          <button className="whitespace-nowrap px-4 py-2 bg-[#d4dcd9]/20 rounded-full text-xs font-bold text-[#0f172a]">
            View All Brands
          </button>
        </div>

        {/* LISTINGS */}
        <div className="grid grid-cols-1 gap-8">

          {/* First 1 listing */}
          <NewCarCard listing={listings[0]} />

          {/* PROMO BANNER 1 */}
          <section className="relative h-64 overflow-hidden group" style={{ borderRadius: '2.5rem' }}>
            <img
              src="https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&w=1400"
              alt="SouKni Immo Pro"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#0f172a]/40 flex flex-col items-center justify-center text-center p-8"
              style={{ backdropFilter: 'blur(2px)' }}>
              <span className="text-[10px] font-bold text-[#2dd4bf] uppercase tracking-[0.3em] mb-4">SouKni Immo Pro</span>
              <h2 className="text-3xl font-bold text-white mb-6">Elevate Your Lifestyle with SouKni Immo Pro</h2>
              <button className="bg-[#2dd4bf] text-[#0f172a] px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                Explore Real Estate
              </button>
            </div>
          </section>

          {/* Listings 2-4 */}
          {listings.slice(1, 4).map(l => <NewCarCard key={l.id} listing={l} />)}

          {/* PROMO BANNER 2 — Insurance */}
          <section className="relative h-64 overflow-hidden group" style={{ borderRadius: '2.5rem' }}>
            <div
              className="w-full h-full flex flex-col items-center justify-center text-center p-8"
              style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
            >
              <div
                className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 max-w-2xl"
              >
                <span className="text-[10px] font-bold text-[#2dd4bf] uppercase tracking-[0.3em] mb-2 block">Partenaire Officiel</span>
                <h2 className="text-2xl font-bold text-[#0f172a] mb-4">Assurez votre nouveau véhicule au meilleur prix</h2>
                <button className="bg-[#2dd4bf] text-white px-8 py-2.5 rounded-full font-bold hover:scale-105 transition-transform shadow-lg">
                  Obtenir mon devis
                </button>
              </div>
            </div>
          </section>

          {/* Remaining listings */}
          {listings.slice(4).map(l => <NewCarCard key={l.id} listing={l} />)}

        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-center gap-2 mt-16 mb-20">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#d4dcd9]/30 hover:border-[#2dd4bf] transition-colors">
            <ChevronLeft size={16} />
          </button>
          {[1, 2, 3].map(p => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-colors ${
                currentPage === p ? 'bg-[#2dd4bf] text-white' : 'hover:bg-[#2dd4bf]/10 text-[#0f172a]'
              }`}
            >
              {p}
            </button>
          ))}
          <span className="mx-2 opacity-30">...</span>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#2dd4bf]/10 transition-colors text-[#0f172a]">48</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-[#d4dcd9]/30 hover:border-[#2dd4bf] transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* TESTIMONIALS */}
        <section className="bg-white/40 p-12 rounded-[2.5rem] border border-white mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold mb-2 text-[#0f172a]">Ils nous ont fait confiance</h3>
            <div className="flex items-center justify-center gap-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-green-500 flex items-center justify-center text-white text-[10px]">★</div>
                ))}
              </div>
              <span className="text-sm font-semibold ml-2 text-[#0f172a]">Trustpilot</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow-sm">
                <p className="text-sm italic mb-4 text-[#7A7A7A]">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2dd4bf]/20 flex items-center justify-center text-[#2dd4bf] font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0f172a]">{t.name}</p>
                    <p className="text-[10px] opacity-50 uppercase font-bold text-[#0f172a]">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* APP DOWNLOAD */}
        <section className="bg-white border border-[#d4dcd9]/20 p-10 flex flex-col md:flex-row items-center justify-between gap-10 mb-20" style={{ borderRadius: '2.5rem' }}>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-[#0f172a]">Find amazing deals on the go.</h2>
            <p className="text-xl text-[#2dd4bf] font-semibold mb-8">Download the app now!</p>
            <div className="flex flex-wrap gap-4">
              {['🍎 App Store', '▶ Google Play', '🏪 AppGallery'].map(store => (
                <button key={store} className="bg-[#0f172a] text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-[#1e293b] transition-colors">
                  {store}
                </button>
              ))}
            </div>
          </div>
          <div className="relative w-64 h-64 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#d4dcd9]/20 rounded-3xl rotate-6" />
            <div className="relative z-10 bg-white p-4 rounded-[2rem] shadow-2xl border-4 border-[#0f172a]/10 w-48 h-80 flex flex-col">
              <div className="w-12 h-1 bg-[#0f172a]/20 rounded-full mx-auto mb-4" />
              <div className="flex-1 bg-[#2dd4bf]/5 rounded-xl border border-[#2dd4bf]/20 overflow-hidden p-2">
                <div className="h-4 bg-[#2dd4bf]/20 w-3/4 rounded mb-2" />
                <div className="h-24 bg-[#2dd4bf]/10 rounded mb-2" />
                <div className="space-y-2">
                  <div className="h-2 bg-[#7A7A7A]/10 w-full rounded" />
                  <div className="h-2 bg-[#7A7A7A]/10 w-5/6 rounded" />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="pt-20 pb-10" style={{ backgroundColor: '#7A7A7A' }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-[#2dd4bf] h-8 w-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">SouKni</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-8">
              "The Market in your Pocket"<br/>
              Morocco's premium marketplace for real estate, motors, electronics and more.
            </p>
          </div>
          {[
            { title: 'Marketplace', links: ['Real Estate', 'Motors', 'Jobs', 'Services', 'The Vault'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Legal', 'Privacy Policy', 'Terms of Service'] },
            { title: 'Download SouKni App', links: [] },
          ].map((col, i) => (
            <div key={col.title}>
              <h4 className="font-bold mb-6 text-white">{col.title}</h4>
              {col.links.length > 0 ? (
                <ul className="text-sm space-y-4 text-white/60">
                  {col.links.map(link => (
                    <li key={link}><a href="#" className="hover:text-[#2dd4bf] transition-colors">{link}</a></li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-3">
                  {['🍎 App Store', '▶ Google Play'].map(store => (
                    <a key={store} href="#" className="block bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-all text-white text-sm font-bold">
                      {store}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-white/50 uppercase tracking-widest font-bold">
          <p>© 2026 SouKni Motors Marketplace. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Help Center</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>

    </div>
  )
}