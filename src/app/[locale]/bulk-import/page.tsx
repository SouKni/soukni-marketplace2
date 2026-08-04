'use client'

import { useState, use, useRef } from 'react'
import Link from 'next/link'
import { Upload, Download, Check, X, AlertTriangle, ChevronRight, FileSpreadsheet, Zap, Package, Eye, RefreshCw, Play, Pause, CheckCircle } from 'lucide-react'

type Locale = 'en' | 'fr' | 'ar' | 'es' | 'de'

const MINT    = '#22d4a8'
const CREAM   = '#f5ede0'
const SURFACE = '#f4fbf8'
const INK     = '#161d1b'
const MUTED   = '#6b7a76'
const FONT    = "'Inter', system-ui, sans-serif"

type ImportRow = {
  row: number; title: string; price: string; category: string
  city: string; condition: string; description: string
  status: 'valid' | 'error' | 'warning' | 'imported'
  error?: string; warning?: string
}

const SAMPLE_ROWS: ImportRow[] = [
  { row: 1, title: 'BMW M4 Competition 2023', price: '785000', category: 'Motors', city: 'Casablanca', condition: 'Like New', description: 'Full options, 12000km, one owner', status: 'valid' },
  { row: 2, title: 'iPhone 15 Pro Max 256GB', price: '12500', category: 'Electronics', city: 'Rabat', condition: 'New', description: 'Sealed box, original Apple warranty', status: 'valid' },
  { row: 3, title: 'Appartement 3Ch Agdal', price: '2500000', category: 'Property', city: 'Rabat', condition: 'New', description: 'Vue dégagée, parking, 120m²', status: 'warning', warning: 'Category "Property" requires address field' },
  { row: 4, title: '', price: '5000', category: 'Fashion', city: 'Tangier', condition: 'Good', description: 'Sac Gucci authentique', status: 'error', error: 'Title is required' },
  { row: 5, title: 'MacBook Pro M3 14"', price: 'abc', category: 'Electronics', city: 'Marrakech', condition: 'Like New', description: 'Barely used, original box', status: 'error', error: 'Price must be a number' },
  { row: 6, title: 'Sony WH-1000XM5', price: '3400', category: 'Electronics', city: 'Casablanca', condition: 'Good', description: 'Excellent condition, comes with case', status: 'valid' },
]

const CSV_TEMPLATE = `title,price,currency,category,subcategory,city,neighborhood,condition,description,phone,whatsapp
BMW M4 Competition 2023,785000,MAD,Motors,Cars,Casablanca,Maarif,Like New,"Full options 510hp 12000km",0612345678,yes
iPhone 15 Pro Max 256GB,12500,MAD,Electronics,Mobiles,Rabat,Agdal,New,"Sealed box Apple warranty",0612345678,yes
Appartement 3Ch Agdal,2500000,MAD,Property,For Sale,Rabat,Agdal,New,"120m² vue dégagée parking",0612345678,no`

export default function BulkImportPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = use(params)
  const fileRef = useRef<HTMLInputElement>(null)

  const [stage, setStage]           = useState<'upload' | 'preview' | 'importing' | 'done'>('upload')
  const [rows, setRows]             = useState<ImportRow[]>([])
  const [importProgress, setImportProgress] = useState(0)
  const [dragOver, setDragOver]     = useState(false)
  const [fileName, setFileName]     = useState('')

  const validRows   = rows.filter(r => r.status === 'valid')
  const errorRows   = rows.filter(r => r.status === 'error')
  const warningRows = rows.filter(r => r.status === 'warning')

  const handleFile = (file: File) => {
    setFileName(file.name)
    // Simulate CSV parsing — in production use PapaParse
    setTimeout(() => {
      setRows(SAMPLE_ROWS)
      setStage('preview')
    }, 800)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && (file.name.endsWith('.csv') || file.name.endsWith('.xlsx'))) handleFile(file)
  }

  const startImport = () => {
    setStage('importing')
    setImportProgress(0)
    const valid = rows.filter(r => r.status === 'valid' || r.status === 'warning')
    let i = 0
    const interval = setInterval(() => {
      i++
      setImportProgress(Math.round((i / valid.length) * 100))
      setRows(prev => prev.map((r, idx) =>
        idx === i - 1 && (r.status === 'valid' || r.status === 'warning')
          ? { ...r, status: 'imported' as const }
          : r
      ))
      if (i >= valid.length) {
        clearInterval(interval)
        setTimeout(() => setStage('done'), 500)
      }
    }, 400)
  }

  const downloadTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = 'soukni-import-template.csv'; a.click()
  }

  return (
    <div style={{ background: SURFACE, minHeight: '100vh', fontFamily: FONT }}>
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Header */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
          <Link href={`/${locale}/account`} style={{ fontSize: '13px', color: MUTED, textDecoration: 'none', fontWeight: 700 }}>Account</Link>
          <ChevronRight size={13} color={MUTED} />
          <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>Bulk Import</span>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileSpreadsheet size={22} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '2px' }}>Bulk Listing Import</h1>
            <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>Import hundreds of listings at once from CSV or Excel</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#e6f9f3', borderRadius: '100px', border: `1px solid ${MINT}` }}>
            <Zap size={13} color={MINT} />
            <span style={{ fontSize: '12px', fontWeight: 900, color: '#0f9b8e' }}>Pro & Diamond only</span>
          </div>
        </div>

        {/* UPLOAD STAGE */}
        {stage === 'upload' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Drop zone */}
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                style={{ border: `2px dashed ${dragOver ? MINT : '#e2eae6'}`, borderRadius: '20px', padding: '56px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', cursor: 'pointer', background: dragOver ? '#f0fdf9' : 'white', transition: 'all 0.2s' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: dragOver ? MINT : SURFACE, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
                  <Upload size={28} color={dragOver ? 'white' : MUTED} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '16px', fontWeight: 900, color: INK, marginBottom: '4px', letterSpacing: '-0.03em' }}>Drop your file here</p>
                  <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700 }}>or click to browse · CSV or XLSX · Max 5MB · Up to 500 listings</p>
                </div>
              </div>
              <input ref={fileRef} type="file" accept=".csv,.xlsx" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />

              {/* Template download */}
              <div style={{ background: 'white', borderRadius: '16px', padding: '18px 20px', border: '1px solid #e2eae6', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#e6f9f3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Download size={18} color={MINT} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '2px' }}>Download Import Template</p>
                  <p style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>Start from our CSV template with all required columns</p>
                </div>
                <button onClick={downloadTemplate}
                  style={{ padding: '9px 18px', borderRadius: '10px', background: MINT, color: 'white', border: 'none', fontSize: '12px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, whiteSpace: 'nowrap' }}>
                  Download CSV
                </button>
              </div>
            </div>

            {/* Requirements */}
            <div style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2eae6' }}>
              <p style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '14px', letterSpacing: '-0.03em' }}>Required Columns</p>
              {['title', 'price', 'currency', 'category', 'city', 'condition', 'description', 'phone'].map((col, i) => (
                <div key={col} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 0', borderBottom: i < 7 ? '1px solid #f4fbf8' : 'none' }}>
                  <Check size={12} color={MINT} />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: INK, fontFamily: 'monospace', background: SURFACE, padding: '2px 6px', borderRadius: '4px' }}>{col}</span>
                </div>
              ))}
              <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginTop: '12px' }}>Optional: subcategory, neighborhood, whatsapp, photos_url</p>
            </div>
          </div>
        )}

        {/* PREVIEW STAGE */}
        {stage === 'preview' && (
          <div>
            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: 'Total Rows', value: rows.length, color: INK, bg: 'white' },
                { label: 'Ready to Import', value: validRows.length + warningRows.length, color: '#0f9b8e', bg: '#e6f9f3' },
                { label: 'Warnings', value: warningRows.length, color: '#b45309', bg: '#fff4e0' },
                { label: 'Errors', value: errorRows.length, color: '#dc2626', bg: '#fee2e2' },
              ].map(s => (
                <div key={s.label} style={{ background: s.bg, borderRadius: '14px', padding: '16px', border: '1px solid #e2eae6', textAlign: 'center' }}>
                  <p style={{ fontSize: '24px', fontWeight: 900, color: s.color, letterSpacing: '-0.05em' }}>{s.value}</p>
                  <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700, marginTop: '2px' }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* File info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'white', borderRadius: '12px', border: '1px solid #e2eae6', marginBottom: '16px' }}>
              <FileSpreadsheet size={18} color={MINT} />
              <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>{fileName || 'sample-import.csv'}</span>
              <span style={{ fontSize: '12px', color: MUTED, fontWeight: 700 }}>{rows.length} rows detected</span>
              <button onClick={() => { setStage('upload'); setRows([]) }}
                style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 900, color: MUTED, background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONT, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <RefreshCw size={12} /> Change file
              </button>
            </div>

            {/* Rows table */}
            <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2eae6', overflow: 'hidden', marginBottom: '20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: SURFACE }}>
                    {['#', 'Title', 'Price', 'Category', 'City', 'Condition', 'Status'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: '10px', fontWeight: 900, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(r => (
                    <tr key={r.row} style={{ borderTop: '1px solid #f4fbf8', background: r.status === 'error' ? '#fff5f5' : r.status === 'warning' ? '#fffbeb' : r.status === 'imported' ? '#f0fdf9' : 'white' }}>
                      <td style={{ padding: '12px 14px', fontSize: '12px', fontWeight: 700, color: MUTED }}>{r.row}</td>
                      <td style={{ padding: '12px 14px', fontSize: '12px', fontWeight: 900, color: r.title ? INK : '#ef4444', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {r.title || '⚠ Missing title'}
                      </td>
                      <td style={{ padding: '12px 14px', fontSize: '12px', fontWeight: 900, color: MINT }}>
                        {isNaN(Number(r.price)) ? <span style={{ color: '#ef4444' }}>Invalid</span> : `${Number(r.price).toLocaleString()} MAD`}
                      </td>
                      <td style={{ padding: '12px 14px', fontSize: '12px', fontWeight: 700, color: MUTED }}>{r.category}</td>
                      <td style={{ padding: '12px 14px', fontSize: '12px', fontWeight: 700, color: MUTED }}>{r.city}</td>
                      <td style={{ padding: '12px 14px', fontSize: '12px', fontWeight: 700, color: MUTED }}>{r.condition}</td>
                      <td style={{ padding: '12px 14px' }}>
                        {r.status === 'valid'    && <span style={{ fontSize: '10px', fontWeight: 900, padding: '3px 8px', borderRadius: '100px', background: '#e6f9f3', color: '#0f9b8e' }}>✓ Ready</span>}
                        {r.status === 'warning'  && <span style={{ fontSize: '10px', fontWeight: 900, padding: '3px 8px', borderRadius: '100px', background: '#fff4e0', color: '#b45309' }}>⚠ {r.warning}</span>}
                        {r.status === 'error'    && <span style={{ fontSize: '10px', fontWeight: 900, padding: '3px 8px', borderRadius: '100px', background: '#fee2e2', color: '#dc2626' }}>✕ {r.error}</span>}
                        {r.status === 'imported' && <span style={{ fontSize: '10px', fontWeight: 900, padding: '3px 8px', borderRadius: '100px', background: '#e6f9f3', color: '#0f9b8e' }}>💎 Imported</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action */}
            {errorRows.length > 0 && (
              <div style={{ padding: '14px 16px', background: '#fff5f5', borderRadius: '12px', border: '1px solid #fecaca', marginBottom: '16px', display: 'flex', gap: '10px' }}>
                <AlertTriangle size={15} color="#ef4444" style={{ flexShrink: 0, marginTop: '1px' }} />
                <p style={{ fontSize: '12px', color: '#dc2626', fontWeight: 700 }}>
                  {errorRows.length} row{errorRows.length > 1 ? 's' : ''} have errors and will be skipped. Fix them in your CSV and re-upload, or proceed to import the {validRows.length + warningRows.length} valid rows.
                </p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => { setStage('upload'); setRows([]) }}
                style={{ padding: '13px 24px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: 'white', color: INK, fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                ← Back
              </button>
              <button onClick={startImport}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '13px', borderRadius: '12px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, color: 'white', border: 'none', fontSize: '15px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT, boxShadow: `0 4px 20px rgba(34,212,168,0.3)` }}>
                <Play size={16} /> Import {validRows.length + warningRows.length} Listings
              </button>
            </div>
          </div>
        )}

        {/* IMPORTING */}
        {stage === 'importing' && (
          <div style={{ background: 'white', borderRadius: '24px', padding: '48px 32px', border: '1px solid #e2eae6', textAlign: 'center' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: '#f0fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Package size={32} color={MINT} style={{ animation: 'bounce 0.6s infinite alternate' }} />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '8px' }}>Importing your listings...</h2>
            <p style={{ fontSize: '13px', color: MUTED, fontWeight: 700, marginBottom: '28px' }}>Please don't close this page</p>
            {/* Progress bar */}
            <div style={{ height: '8px', background: '#e2eae6', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px', maxWidth: '400px', margin: '0 auto 12px' }}>
              <div style={{ height: '100%', width: `${importProgress}%`, background: `linear-gradient(90deg, ${MINT}, #0f9b8e)`, borderRadius: '4px', transition: 'width 0.3s ease' }} />
            </div>
            <p style={{ fontSize: '14px', fontWeight: 900, color: MINT }}>{importProgress}%</p>
          </div>
        )}

        {/* DONE */}
        {stage === 'done' && (
          <div style={{ background: 'white', borderRadius: '24px', padding: '48px 32px', border: '1px solid #e2eae6', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: `linear-gradient(135deg, ${MINT}, #0f9b8e)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: `0 12px 32px rgba(34,212,168,0.35)` }}>
              <CheckCircle size={40} color="white" />
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: INK, letterSpacing: '-0.05em', marginBottom: '8px' }}>Import Complete! 🎉</h2>
            <p style={{ fontSize: '14px', color: MUTED, fontWeight: 700, marginBottom: '28px' }}>
              <strong style={{ color: INK }}>{validRows.length + warningRows.length} listings</strong> have been published to SouKni
              {errorRows.length > 0 && <span> · <span style={{ color: '#ef4444' }}>{errorRows.length} skipped</span></span>}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', maxWidth: '440px', margin: '0 auto 28px' }}>
              {[
                { label: 'Imported', value: validRows.length + warningRows.length, color: MINT },
                { label: 'Skipped', value: errorRows.length, color: '#ef4444' },
                { label: 'Total', value: rows.length, color: INK },
              ].map(s => (
                <div key={s.label} style={{ background: SURFACE, borderRadius: '12px', padding: '14px' }}>
                  <p style={{ fontSize: '22px', fontWeight: 900, color: s.color, letterSpacing: '-0.05em' }}>{s.value}</p>
                  <p style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{s.label}</p>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={() => { setStage('upload'); setRows([]); setImportProgress(0) }}
                style={{ padding: '12px 22px', borderRadius: '12px', border: '1.5px solid #e2eae6', background: 'white', color: INK, fontSize: '14px', fontWeight: 900, cursor: 'pointer', fontFamily: FONT }}>
                Import More
              </button>
              <Link href={`/${locale}/account/my-ads`}
                style={{ padding: '12px 22px', borderRadius: '12px', background: MINT, color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 900 }}>
                View My Ads
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
