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

  return { messages, sendMessage, markRead, loading }
}
