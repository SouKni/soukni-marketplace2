'use client'
import { useState, useEffect } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import { useStore } from '@/lib/store'

export function useNotifications() {
  const supabase = getSupabaseClient()
  const { user, setUnreadCount } = useStore()
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    if (!user) return

    // Fetch existing
    supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data }) => {
        setNotifications(data || [])
        setUnreadCount((data || []).filter((n: any) => !n.read).length)
      })

    // Real-time: new notifications pushed from server
    const channel = supabase
      .channel(`notifications:${user.id}`)
      .on('postgres_changes', {
        event:  'INSERT',
        schema: 'public',
        table:  'notifications',
        filter: `user_id=eq.${user.id}`,
      }, (payload) => {
        setNotifications(prev => [payload.new, ...prev])
        setUnreadCount(notifications.filter((n: any) => !n.read).length + 1)
        // Trigger Web Push if granted
        if (Notification.permission === 'granted') {
          new Notification(payload.new.title, {
            body: payload.new.body,
            icon: '/favicon.ico',
            tag:  payload.new.id,
          })
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [user])

  const markRead = async (id: string) => {
    await supabase.from('notifications').update({ read: true }).eq('id', id)
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    setUnreadCount(Math.max(0, notifications.filter((n: any) => !n.read).length - 1))
  }

  const markAllRead = async () => {
    if (!user) return
    await supabase.from('notifications').update({ read: true }).eq('user_id', user.id)
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  return { notifications, markRead, markAllRead }
}
