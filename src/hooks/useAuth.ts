'use client'
import { useState, useEffect, useCallback } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import { useStore } from '@/lib/store'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export function useAuth() {
  const supabase = getSupabaseClient()
  const { user, setUser } = useStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) fetchProfile(session.user)
      else { setUser(null); setLoading(false) }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) fetchProfile(session.user)
      else setUser(null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (supabaseUser: SupabaseUser) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single()

    setUser(data ? {
      id:         data.id,
      email:      supabaseUser.email || '',
      full_name:  data.full_name || '',
      avatar_url: data.avatar_url,
      badge:      data.badge,
      city:       data.city,
      phone:      data.phone,
    } : null)
    setLoading(false)
  }

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }, [supabase])

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/api/auth/callback` }
    })
    if (error) throw error
  }, [supabase])

  const signUp = useCallback(async (email: string, password: string, full_name: string, phone?: string) => {
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name, phone }, emailRedirectTo: `${window.location.origin}/api/auth/callback` }
    })
    if (error) throw error
  }, [supabase])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
  }, [supabase])

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    if (error) throw error
  }, [supabase])

  return { user, loading, signIn, signInWithGoogle, signUp, signOut, resetPassword }
}
