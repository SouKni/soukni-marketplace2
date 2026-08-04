import { z } from 'zod'

// ── Auth ───────────────────────────────────────────────────────
export const LoginSchema = z.object({
  email:    z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const RegisterSchema = z.object({
  email:     z.string().email('Invalid email address'),
  password:  z.string().min(8, 'Password must be at least 8 characters'),
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  phone:     z.string().optional(),
  agreed:    z.boolean().refine(v => v === true, 'You must agree to the terms'),
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

// ── Listing ────────────────────────────────────────────────────
export const ListingSchema = z.object({
  title:         z.string().min(5, 'Title must be at least 5 characters').max(80, 'Title too long'),
  description:   z.string().max(2000).optional(),
  category_slug: z.string().min(1, 'Category is required'),
  subcategory:   z.string().min(1, 'Subcategory is required'),
  price:         z.number().positive('Price must be positive').optional(),
  currency:      z.enum(['MAD', 'EUR', 'USD', 'GBP']).default('MAD'),
  negotiable:    z.boolean().default(false),
  hide_price:    z.boolean().default(false),
  free_item:     z.boolean().default(false),
  condition:     z.enum(['new', 'like_new', 'good', 'fair', 'for_parts']).optional(),
  city:          z.string().min(1, 'City is required'),
  neighborhood:  z.string().optional(),
  phone:         z.string().min(8, 'Phone number required'),
  whatsapp:      z.boolean().default(false),
  images:        z.array(z.string()).max(12).default([]),
})

export type ListingInput = z.infer<typeof ListingSchema>

// ── Review ─────────────────────────────────────────────────────
export const ReviewSchema = z.object({
  order_id:    z.string().uuid(),
  reviewee_id: z.string().uuid(),
  rating:      z.number().int().min(1).max(5),
  comment:     z.string().max(500).optional(),
  tags:        z.array(z.string()).max(5).default([]),
  anonymous:   z.boolean().default(false),
})

// ── Report ─────────────────────────────────────────────────────
export const ReportSchema = z.object({
  listing_id:  z.string().uuid(),
  category:    z.string().min(1),
  sub_reason:  z.string().min(1),
  description: z.string().max(1000).optional(),
  urgent:      z.boolean().default(false),
})

// ── Message ────────────────────────────────────────────────────
export const MessageSchema = z.object({
  conversation_id: z.string().uuid(),
  text:            z.string().min(1).max(2000),
  image_url:       z.string().url().optional(),
})

// ── Profile ────────────────────────────────────────────────────
export const ProfileSchema = z.object({
  full_name:    z.string().min(2).max(80),
  username:     z.string().min(3).max(30).regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers and hyphens'),
  bio:          z.string().max(200).optional(),
  city:         z.string().optional(),
  phone:        z.string().optional(),
  whatsapp:     z.boolean().default(false),
})

// ── Bid ────────────────────────────────────────────────────────
export const BidSchema = z.object({
  listing_id:  z.string().uuid(),
  amount:      z.number().positive('Bid must be positive'),
  auto_bid:    z.boolean().default(false),
  max_auto_bid: z.number().positive().optional(),
})
