// Shared WhatsApp-link logic — single source of truth so every listing card
// builds the link the same way instead of hardcoding a placeholder number.

// Builds a wa.me link from a raw phone string (however it's stored — with or
// without spaces/dashes/country code) and a pre-filled message. Returns null
// when there's no usable phone, so callers can hide the button entirely.
export function buildWhatsAppLink(phone: string | null | undefined, message: string): string | null {
  if (!phone) return null
  const digits = phone.replace(/\D/g, '')
  if (!digits) return null
  const withCountryCode = digits.startsWith('212') ? digits : `212${digits.replace(/^0+/, '')}`
  return `https://wa.me/${withCountryCode}?text=${encodeURIComponent(message)}`
}

export function listingWhatsAppMessage(title: string): string {
  return `Hi, I found your listing "${title}" on SouKni!`
}
