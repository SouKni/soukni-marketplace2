import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { MessageSchema } from '@/lib/validations/schemas'

// GET — fetch conversations
export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data } = await supabase
    .from('conversations')
    .select(`
      *,
      listings(title, images, price, currency),
      buyer:profiles!buyer_id(full_name, avatar_url, badge),
      seller:profiles!seller_id(full_name, avatar_url, badge)
    `)
    .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
    .order('last_message_at', { ascending: false })

  return NextResponse.json({ conversations: data })
}

// POST — send message
export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body   = await request.json()
  const parsed = MessageSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })

  const { data, error } = await supabase
    .from('messages')
    .insert({ ...parsed.data, sender_id: user.id })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // Update conversation
  await supabase.from('conversations').update({
    last_message: parsed.data.text,
    last_message_at: new Date().toISOString(),
  }).eq('id', parsed.data.conversation_id)

  // Notify recipient (Supabase will broadcast via realtime to their channel)
  // The notification triggers their Web Push via useNotifications hook

  return NextResponse.json({ message: data }, { status: 201 })
}
