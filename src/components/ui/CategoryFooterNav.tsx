'use client'

import React from 'react'
import Link from 'next/link'

export type RelatedCategory = {
  label: string
  href: string
  emoji?: string
}

// Bottom-of-page navigation: an optional "explore other categories" pill
// grid plus a centered "← Back to [Parent]" link. Used on every sub-category
// page so the user always has a way back up the category tree.
export default function CategoryFooterNav({
  related,
  relatedTitle = 'Explore Other Categories',
  backHref,
  backLabel,
  inkColor = '#161d1b',
  mintDkColor = '#006c53',
}: {
  related?: RelatedCategory[]
  relatedTitle?: string
  backHref: string
  backLabel: string
  inkColor?: string
  mintDkColor?: string
}) {
  return (
    <section style={{ marginTop: 48, marginBottom: 24 }}>
      {related && related.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: 16, fontWeight: 900, color: inkColor, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {relatedTitle}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {related.map(r => (
              <Link
                key={r.href}
                href={r.href}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 100, backgroundColor: 'white', border: '1px solid rgba(107,122,118,0.15)', textDecoration: 'none', fontSize: 12, fontWeight: 700, color: inkColor }}
              >
                {r.emoji && <span>{r.emoji}</span>}{r.label}
              </Link>
            ))}
          </div>
        </div>
      )}
      <div style={{ textAlign: 'center' }}>
        <Link
          href={backHref}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 40px', borderRadius: 100, backgroundColor: inkColor, color: 'white', textDecoration: 'none', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'background 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = mintDkColor }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = inkColor }}
        >
          ← {backLabel}
        </Link>
      </div>
    </section>
  )
}
