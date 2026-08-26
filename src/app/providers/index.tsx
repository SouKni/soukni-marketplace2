'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

// Mounts the Supabase auth session listener so useStore().user is
// populated app-wide, not just on pages that happen to call useAuth().
function AuthHydrator({ children }: { children: React.ReactNode }) {
  useAuth()
  return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime:  1000 * 60 * 5, // 5 minutes
        gcTime:     1000 * 60 * 10, // 10 minutes
        retry:      1,
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <AuthHydrator>{children}</AuthHydrator>
    </QueryClientProvider>
  )
}
