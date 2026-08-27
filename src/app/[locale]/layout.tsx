import type { Metadata } from 'next'
import type { Locale } from '@/lib/types'
import { MarketProvider } from '@/context/MarketContext'
import Header from '@/components/sections/Header'
import Footer from '@/components/layout/Footer'
import '../globals.css'
import { Providers } from '../providers'
import SouKniConcierge from '@/components/ui/SouKniConcierge'
import BackToTop from '@/components/ui/BackToTop'

export async function generateStaticParams() {
  return [
    { locale: 'en' }, { locale: 'fr' },
    { locale: 'ar' }, { locale: 'es' }, { locale: 'de' },
    { locale: 'ber' },
  ]
}

export const metadata: Metadata = {
  title: 'Soukni — Buy, Sell & Discover in Morocco',
  description: "Morocco's premium marketplace for real estate, motors, electronics, fashion and more.",
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const isRTL = locale === 'ar'

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#f4fbf8', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <Providers>
          <MarketProvider>
            <Header locale={locale} />
            <main>{children}</main>
            <Footer locale={locale} />
            <SouKniConcierge locale={locale} />
            <BackToTop />
          </MarketProvider>
        </Providers>
      </body>
    </html>
  )
}
