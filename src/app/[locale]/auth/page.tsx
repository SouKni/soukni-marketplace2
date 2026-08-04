'use client'

import { useState, use, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Check, Chrome } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

type Mode = 'login' | 'register' | 'forgot'

function AuthPageInner({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth()
  const [mode, setMode] = useState<Mode>('login')
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [forgotSent, setForgotSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')

  const benefits = [
    'Post ads 100% FREE',
    'Save your favourite listings',
    'Chat directly with sellers',
    'Get notified on price drops',
    'Become a Diamond Member',
  ]

  const handleSignIn = async () => {
    setError(null); setSubmitting(true)
    try {
      await signIn(email, password)
      router.push(searchParams.get('next') || `/${locale}`)
    } catch (e: any) {
      setError(e.message || 'Could not sign in')
    } finally {
      setSubmitting(false)
    }
  }

  const handleRegister = async () => {
    if (!agreed) return
    if (password !== confirmPassword) { setError('Passwords do not match'); return }
    setError(null); setSubmitting(true)
    try {
      await signUp(email, password, fullName, phone)
      router.push(`/${locale}/welcome`)
    } catch (e: any) {
      setError(e.message || 'Could not create account')
    } finally {
      setSubmitting(false)
    }
  }

  const handleForgot = async () => {
    setError(null); setSubmitting(true)
    try {
      await resetPassword(email)
      setForgotSent(true)
    } catch (e: any) {
      setError(e.message || 'Could not send reset link')
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoogle = async () => {
    setError(null)
    try {
      await signInWithGoogle()
    } catch (e: any) {
      setError(e.message || 'Could not continue with Google')
    }
  }

  const InputField = ({
    icon, type, placeholder, value, onChange, right
  }: {
    icon: React.ReactNode
    type: string
    placeholder: string
    value: string
    onChange: (v: string) => void
    right?: React.ReactNode
  }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      background: '#F8FAF9', border: '1.5px solid #E2EAE7',
      borderRadius: '14px', padding: '0 16px', height: '52px',
      transition: 'border-color 0.2s'
    }}
      onFocus={e => (e.currentTarget.style.borderColor = '#00D1B2')}
      onBlur={e => (e.currentTarget.style.borderColor = '#E2EAE7')}
    >
      <span style={{ color: '#7A7A7A', flexShrink: 0 }}>{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          flex: 1, border: 'none', outline: 'none', background: 'transparent',
          fontSize: '15px', color: '#1A1A1A', fontFamily: 'inherit'
        }}
      />
      {right && <span style={{ flexShrink: 0, cursor: 'pointer', color: '#7A7A7A' }}>{right}</span>}
    </div>
  )

  const ErrorBox = () => error ? (
    <p style={{ background: '#fef2f2', color: '#dc2626', fontSize: '13px', padding: '10px 14px', borderRadius: '10px', marginBottom: '16px' }}>{error}</p>
  ) : null

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #f4fbf8 0%, #e0faf6 50%, #f4fbf8 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', fontFamily: 'Hanken Grotesk, Inter, system-ui, sans-serif'
    }}>
      <div style={{
        width: '100%', maxWidth: '1000px',
        display: 'grid', gridTemplateColumns: mode === 'forgot' ? '1fr' : '1fr 1fr',
        gap: '0', borderRadius: '32px', overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.12)', background: 'white'
      }}>

        {mode !== 'forgot' && (
          <div style={{
            background: 'linear-gradient(160deg, #00D1B2 0%, #006b5f 100%)',
            padding: '56px 48px', display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ position: 'absolute', top: '40%', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <Link href={`/${locale}`} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
                  <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                    <span style={{ color: 'white', fontWeight: 900, fontSize: '20px' }}>S</span>
                  </div>
                  <span style={{ color: 'white', fontWeight: 800, fontSize: '22px', letterSpacing: '-0.03em' }}>SouKni</span>
                </div>
              </Link>

              <h2 style={{ color: 'white', fontSize: '36px', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.02em' }}>
                {mode === 'login' ? 'Welcome back to the market' : 'Join Morocco\'s #1 Marketplace'}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', lineHeight: 1.6, marginBottom: '40px' }}>
                {mode === 'login'
                  ? 'Thousands of new listings added every day across Morocco.'
                  : 'Buy, sell and discover amazing deals near you.'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {benefits.map(b => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={12} color="white" strokeWidth={3} />
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', fontWeight: 500 }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '32px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              {[['2M+', 'Active Users'], ['500K+', 'Listings'], ['50+', 'Cities']].map(([num, label]) => (
                <div key={label}>
                  <p style={{ color: 'white', fontWeight: 800, fontSize: '22px', lineHeight: 1 }}>{num}</p>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px', marginTop: '4px' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ padding: mode === 'forgot' ? '64px' : '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

          {mode !== 'forgot' && (
            <div style={{ display: 'flex', background: '#F4FBF8', borderRadius: '14px', padding: '4px', marginBottom: '36px' }}>
              {(['login', 'register'] as const).map(m => (
                <button key={m} onClick={() => { setMode(m); setError(null) }} style={{
                  flex: 1, padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                  background: mode === m ? 'white' : 'transparent',
                  color: mode === m ? '#1A1A1A' : '#7A7A7A',
                  fontWeight: mode === m ? 700 : 500, fontSize: '14px',
                  boxShadow: mode === m ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s', fontFamily: 'inherit'
                }}>
                  {m === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>
          )}

          {mode === 'forgot' && (
            <div style={{ maxWidth: '440px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
              <Link href={`/${locale}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
                <div style={{ width: '36px', height: '36px', background: '#00D1B2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontWeight: 900, fontSize: '18px' }}>S</span>
                </div>
                <span style={{ color: '#1A1A1A', fontWeight: 800, fontSize: '20px' }}>SouKni</span>
              </Link>

              {!forgotSent ? (
                <>
                  <div style={{ width: '64px', height: '64px', background: '#e0faf6', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <Mail size={28} color="#00D1B2" />
                  </div>
                  <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1A1A1A', marginBottom: '8px' }}>Reset your password</h2>
                  <p style={{ color: '#7A7A7A', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>
                    Enter your email and we'll send you a link to reset your password.
                  </p>
                  <ErrorBox />
                  <InputField icon={<Mail size={18} />} type="email" placeholder="Your email address" value={email} onChange={setEmail} />
                  <button
                    onClick={handleForgot}
                    disabled={submitting}
                    style={{ width: '100%', marginTop: '16px', background: '#00D1B2', color: 'white', border: 'none', borderRadius: '14px', padding: '14px', fontSize: '15px', fontWeight: 700, cursor: submitting ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: submitting ? 0.7 : 1 }}
                  >
                    {submitting ? 'Sending...' : 'Send Reset Link'} <ArrowRight size={16} />
                  </button>
                </>
              ) : (
                <>
                  <div style={{ width: '64px', height: '64px', background: '#e0faf6', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <Check size={28} color="#00D1B2" />
                  </div>
                  <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1A1A1A', marginBottom: '8px' }}>Check your inbox</h2>
                  <p style={{ color: '#7A7A7A', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px' }}>
                    We sent a reset link to <strong>{email || 'your email'}</strong>. Check your spam folder too.
                  </p>
                </>
              )}

              <button onClick={() => { setMode('login'); setForgotSent(false); setError(null) }} style={{ marginTop: '24px', background: 'none', border: 'none', color: '#00D1B2', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
                ← Back to Sign In
              </button>
            </div>
          )}

          {mode === 'login' && (
            <>
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1A1A1A', marginBottom: '6px', letterSpacing: '-0.02em' }}>Sign in to SouKni</h1>
              <p style={{ color: '#7A7A7A', fontSize: '14px', marginBottom: '28px' }}>Good to see you again 👋</p>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                <button onClick={handleGoogle} style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: 'white', color: '#1A1A1A', border: '1.5px solid #E2EAE7',
                  borderRadius: '12px', padding: '11px', fontSize: '13px', fontWeight: 600, cursor: 'pointer'
                }}>
                  <Chrome size={16} /> Continue with Google
                </button>
                <button disabled title="Phone sign-in coming soon" style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: '#25D366', color: 'white', border: '1.5px solid #25D366', opacity: 0.5,
                  borderRadius: '12px', padding: '11px', fontSize: '13px', fontWeight: 600, cursor: 'not-allowed'
                }}>
                  <Phone size={16} /> Phone (soon)
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ flex: 1, height: '1px', background: '#E2EAE7' }} />
                <span style={{ color: '#7A7A7A', fontSize: '12px', fontWeight: 500 }}>or with email</span>
                <div style={{ flex: 1, height: '1px', background: '#E2EAE7' }} />
              </div>

              <ErrorBox />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                <InputField icon={<Mail size={18} />} type="email" placeholder="Email address" value={email} onChange={setEmail} />
                <InputField
                  icon={<Lock size={18} />}
                  type={showPass ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={setPassword}
                  right={<span onClick={() => setShowPass(!showPass)}>{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</span>}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                <button onClick={() => { setMode('forgot'); setError(null) }} style={{ background: 'none', border: 'none', color: '#00D1B2', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  Forgot password?
                </button>
              </div>

              <button onClick={handleSignIn} disabled={submitting} style={{
                width: '100%', background: '#00D1B2', color: 'white', border: 'none',
                borderRadius: '14px', padding: '14px', fontSize: '15px', fontWeight: 700,
                cursor: submitting ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '8px', marginBottom: '20px', opacity: submitting ? 0.7 : 1
              }}>
                {submitting ? 'Signing in...' : 'Sign In'} <ArrowRight size={16} />
              </button>

              <p style={{ textAlign: 'center', fontSize: '13px', color: '#7A7A7A' }}>
                Don't have an account?{' '}
                <button onClick={() => { setMode('register'); setError(null) }} style={{ background: 'none', border: 'none', color: '#00D1B2', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}>
                  Create one free
                </button>
              </p>
            </>
          )}

          {mode === 'register' && (
            <>
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1A1A1A', marginBottom: '6px', letterSpacing: '-0.02em' }}>Create your account</h1>
              <p style={{ color: '#7A7A7A', fontSize: '14px', marginBottom: '28px' }}>Free forever. No credit card needed.</p>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                <button onClick={handleGoogle} style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: 'white', color: '#1A1A1A', border: '1.5px solid #E2EAE7',
                  borderRadius: '12px', padding: '11px', fontSize: '13px', fontWeight: 600, cursor: 'pointer'
                }}>
                  <Chrome size={16} /> Google
                </button>
                <button disabled title="Phone sign-in coming soon" style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: '#25D366', color: 'white', border: '1.5px solid #25D366', opacity: 0.5,
                  borderRadius: '12px', padding: '11px', fontSize: '13px', fontWeight: 600, cursor: 'not-allowed'
                }}>
                  <Phone size={16} /> Phone (soon)
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ flex: 1, height: '1px', background: '#E2EAE7' }} />
                <span style={{ color: '#7A7A7A', fontSize: '12px', fontWeight: 500 }}>or with email</span>
                <div style={{ flex: 1, height: '1px', background: '#E2EAE7' }} />
              </div>

              <ErrorBox />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                <InputField icon={<User size={18} />} type="text" placeholder="Full name" value={fullName} onChange={setFullName} />
                <InputField icon={<Mail size={18} />} type="email" placeholder="Email address" value={email} onChange={setEmail} />
                <InputField icon={<Phone size={18} />} type="tel" placeholder="Phone number (optional)" value={phone} onChange={setPhone} />
                <InputField
                  icon={<Lock size={18} />}
                  type={showPass ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={password}
                  onChange={setPassword}
                  right={<span onClick={() => setShowPass(!showPass)}>{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</span>}
                />
                <InputField
                  icon={<Lock size={18} />}
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  right={<span onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}</span>}
                />
              </div>

              {password.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} style={{
                        flex: 1, height: '3px', borderRadius: '2px',
                        background: password.length >= i * 2
                          ? i <= 1 ? '#ef4444' : i <= 2 ? '#f59e0b' : i <= 3 ? '#00D1B2' : '#006b5f'
                          : '#E2EAE7'
                      }} />
                    ))}
                  </div>
                  <p style={{ fontSize: '11px', color: '#7A7A7A' }}>
                    {password.length < 4 ? 'Too weak' : password.length < 6 ? 'Weak' : password.length < 8 ? 'Good' : 'Strong'}
                  </p>
                </div>
              )}

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '20px', cursor: 'pointer' }}>
                <div
                  onClick={() => setAgreed(!agreed)}
                  style={{
                    width: '18px', height: '18px', borderRadius: '5px', border: `2px solid ${agreed ? '#00D1B2' : '#E2EAE7'}`,
                    background: agreed ? '#00D1B2' : 'white', flexShrink: 0, marginTop: '1px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s'
                  }}
                >
                  {agreed && <Check size={11} color="white" strokeWidth={3} />}
                </div>
                <span style={{ fontSize: '12px', color: '#7A7A7A', lineHeight: 1.5 }}>
                  I agree to the{' '}
                  <Link href={`/${locale}/terms`} style={{ color: '#00D1B2', fontWeight: 600 }}>Terms of Service</Link>
                  {' '}and{' '}
                  <Link href={`/${locale}/privacy`} style={{ color: '#00D1B2', fontWeight: 600 }}>Privacy Policy</Link>
                </span>
              </label>

              <button
                onClick={handleRegister}
                disabled={!agreed || submitting}
                style={{
                width: '100%', background: agreed ? '#00D1B2' : '#E2EAE7',
                color: agreed ? 'white' : '#7A7A7A', border: 'none',
                borderRadius: '14px', padding: '14px', fontSize: '15px', fontWeight: 700,
                cursor: agreed && !submitting ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '8px', marginBottom: '16px', opacity: submitting ? 0.7 : 1,
                transition: 'all 0.2s'
              }}>
                {submitting ? 'Creating account...' : 'Create Free Account'} <ArrowRight size={16} />
              </button>

              <p style={{ textAlign: 'center', fontSize: '13px', color: '#7A7A7A' }}>
                Already have an account?{' '}
                <button onClick={() => { setMode('login'); setError(null) }} style={{ background: 'none', border: 'none', color: '#00D1B2', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}>
                  Sign in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}


export default function AuthPage(props: any) {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <AuthPageInner {...props} />
    </Suspense>
  )
}
