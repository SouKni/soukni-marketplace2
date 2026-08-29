import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

type CloudinaryCreds = { cloud_name: string; api_key: string; api_secret: string }

// CLOUDINARY_URL is cloudinary://<api_key>:<api_secret>@<cloud_name> — parse
// it ourselves rather than relying on the SDK's own env auto-parsing, which
// runs at import time and throws synchronously (crashing this whole route,
// not just returning an error) if the value is malformed.
function parseCloudinaryUrl(raw: string): CloudinaryCreds | null {
  try {
    const parsed = new URL(raw)
    if (parsed.protocol !== 'cloudinary:' || !parsed.username || !parsed.password || !parsed.hostname) return null
    return { cloud_name: parsed.hostname, api_key: parsed.username, api_secret: decodeURIComponent(parsed.password) }
  } catch {
    return null
  }
}

function resolveCloudinaryCreds(): CloudinaryCreds | null {
  if (process.env.CLOUDINARY_URL) {
    const fromUrl = parseCloudinaryUrl(process.env.CLOUDINARY_URL)
    if (fromUrl) return fromUrl
    console.error('[upload] CLOUDINARY_URL is set but not in the expected cloudinary://<api_key>:<api_secret>@<cloud_name> format')
  }
  if (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    return {
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    }
  }
  return null
}

export async function POST(request: NextRequest) {
  const creds = resolveCloudinaryCreds()
  if (!creds) {
    return NextResponse.json({ error: 'Photo upload is not configured yet.' }, { status: 503 })
  }

  // Imported dynamically and wrapped in try/catch: the cloudinary package
  // reads process.env.CLOUDINARY_URL itself the moment it's loaded and
  // throws synchronously if it's malformed, regardless of the creds we
  // pass to .config() below — a static top-level import would crash this
  // entire route on every request rather than returning a clean error.
  let cloudinary: typeof import('cloudinary').v2
  try {
    cloudinary = (await import('cloudinary')).v2
    cloudinary.config(creds)
  } catch (e: any) {
    console.error('[upload] Cloudinary SDK failed to initialize:', e)
    return NextResponse.json({ error: 'Photo upload is not configured correctly.' }, { status: 503 })
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const file     = formData.get('file') as File
  const type     = formData.get('type') as string || 'listing'

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  // Validate file
  if (!file.type.startsWith('image/'))
    return NextResponse.json({ error: 'Only images are allowed' }, { status: 400 })
  if (file.size > 10 * 1024 * 1024)
    return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())
  const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

  try {
    const result = await cloudinary.uploader.upload(base64, {
      folder:         `soukni/${type}/${user.id}`,
      transformation: [
        { width: 1200, height: 900, crop: 'limit', quality: 'auto', fetch_format: 'auto' }
      ],
    })
    return NextResponse.json({ url: result.secure_url, public_id: result.public_id })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
