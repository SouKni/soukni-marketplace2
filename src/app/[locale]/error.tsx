'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4fbf8] p-6 text-center">
      <h2 className="text-2xl font-black text-[#0f172a]">Something went wrong!</h2>
      <p className="mt-2 text-slate-500 text-sm">We couldn't load this part of the marketplace.</p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-xl bg-[#2dd4bf] px-8 py-3 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-[#2dd4bf]/20 transition-all hover:scale-[1.02] active:scale-95"
      >
        Try again
      </button>
    </div>
  )
}
