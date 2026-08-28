'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import { useStore } from '@/lib/store'

export function useMessages(conversationId?: string) {
  const supabase = getSupabaseClient()
  const { user }  = useStore()
  const [messages, setMessages]       = useState<any[]>([])
  const [loading, setLoading]         = useState(false)
  const channelRef = useRef<any>(null)

  // Fetch messages
  useEffect(() => {
    if (!conversationId) return
    setLoading(true)
    supabase
      .from('messages')
      .select('*, profiles(full_name, avatar_url)')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .then(({ data }) => { setMessages(data || []); setLoading(false) })
  }, [conversationId])

  // ── 🔔 SUPABASE REALTIME ──────────────────────────────────────
  // This is the production real-time replacement for setTimeout simulation
  useEffect(() => {
    if (!conversationId) return

    // Subscribe to new messages in this conversation
    channelRef.current = supabase
      .channel(`messages:${conversationId}`)
      .on('postgres_changes', {
        event:  'INSERT',
        schema: 'public',
        table:  'messages',
        filter: `conversation_id=eq.${conversationId}`,
      }, (payload) => {
        // New message arrives — add to state
        setMessages(prev => [...prev, payload.new])
      })
      .on('postgres_changes', {
        event:  'UPDATE',
        schema: 'public',
        table:  'messages',
        filter: `conversation_id=eq.${conversationId}`,
      }, (payload) => {
        // Message read status updated
        setMessages(prev => prev.map(m => m.id === payload.new.id ? payload.new : m))
      })
      .subscribe()

    return () => {
      if (channelRef.current) supabase.removeChannel(channelRef.current)
    }
  }, [conversationId])

  const sendMessage = useCallback(async (text: string, imageUrl?: string) => {
    if (!conversationId || !user) return
    const { data, error } = await supabase
      .from('messages')
      .insert({ conversation_id: conversationId, sender_id: user.id, text, image_url: imageUrl })
      .select()
      .single()
    if (error) throw error

    // Update conversation last message
    await supabase.from('conversations').update({
      last_message: text,
      last_message_at: new Date().toISOString(),
    }).eq('id', conversationId)

    return data
  }, [conversationId, user, supabase])

  const markRead = useCallback(async () => {
    if (!conversationId || !user) return
    await supabase
      .from('messages')
      .update({ read: true, read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .neq('sender_id', user.id)
  }, [conversationId, user, supabase])

  // Finds the existing thread for this (listing, buyer, seller) triple, or
  // creates one. Relies on the DB unique constraint rather than a
  // check-then-insert race — if two tabs create it simultaneously, the
  // second insert fails on the constraint and we just re-select.
  const startConversation = useCallback(async (listingId: string | null, sellerId: string) => {
    if (!user) return null
    if (user.id === sellerId) return null // can't message yourself

    const { data: existing } = await supabase
      .from('conversations')
      .select('id')
      .eq('buyer_id', user.id)
      .eq('seller_id', sellerId)
      .eq('listing_id', listingId)
      .maybeSingle()
    if (existing) return existing.id

    const { data: created, error } = await supabase
      .from('conversations')
      .insert({ listing_id: listingId, buyer_id: user.id, seller_id: sellerId })
      .select('id')
      .single()

    if (error) {
      // Unique-constraint race: someone else (or another tab) created it
      // first — fetch the one that now exists instead of failing.
      const { data: raceWinner } = await supabase
        .from('conversations')
        .select('id')
        .eq('buyer_id', user.id)
        .eq('seller_id', sellerId)
        .eq('listing_id', listingId)
        .maybeSingle()
      return raceWinner?.id ?? null
    }
    return created.id
  }, [user, supabase])

  // Full inbox for the signed-in user, newest activity first, with the
  // other participant and (if any) the related listing resolved.
  const fetchConversations = useCallback(async () => {
    if (!user) return []
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        listings(id, title, images, price, currency),
        buyer:profiles!buyer_id(full_name, avatar_url, badge),
        seller:profiles!seller_id(full_name, avatar_url, badge)
      `)
      .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
      .order('last_message_at', { ascending: false })
    if (error) return []
    return data || []
  }, [user, supabase])

  // All messages for a specific thread, oldest first — same shape as the
  // auto-fetch above, exposed as a callable for callers that don't want to
  // mount this hook with a conversationId (e.g. a header preview dropdown).
  const fetchMessages = useCallback(async (id: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*, profiles(full_name, avatar_url)')
      .eq('conversation_id', id)
      .order('created_at', { ascending: true })
    if (error) return []
    return data || []
  }, [supabase])

  return { messages, sendMessage, markRead, markAsRead: markRead, loading, startConversation, fetchConversations, fetchMessages }
}
