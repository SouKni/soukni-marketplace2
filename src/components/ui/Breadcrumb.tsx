'use client'

import React from 'react'
import Link from 'next/link'

export type BreadcrumbItem = {
  label: string
  href?: string | null
}

// Matches the "Home › Category › Subcategory" trail pattern already used on
// most category pages, componentized so every page renders it consistently.
export default function Breadcrumb({
  items,
  mutedColor = '#6b7a76',
  inkColor = '#161d1b',
  style,
}: {
  items: BreadcrumbItem[]
  mutedColor?: string
  inkColor?: string
  style?: React.CSSProperties
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 6,
        fontSize: 11,
        fontWeight: 700,
        color: mutedColor,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        marginBottom: 8,
        ...style,
      }}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <React.Fragment key={i}>
            {item.href && !isLast ? (
              <Link href={item.href} style={{ color: mutedColor, textDecoration: 'none' }}>
                {item.label}
              </Link>
            ) : (
              <span style={{ color: isLast ? inkColor : mutedColor }}>{item.label}</span>
            )}
            {!isLast && <span>›</span>}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
