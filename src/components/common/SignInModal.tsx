import React, { useState } from 'react'
import { X, Mail, Lock, CheckCircle2, User } from 'lucide-react'

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState<string | null>(() => {
    return localStorage.getItem('staynest_user')
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSuccess(true)
    const displayName = email.split('@')[0]
    localStorage.setItem('staynest_user', displayName)
    setLoggedInUser(displayName)
    setTimeout(() => {
      setIsSuccess(false)
      onClose()
    }, 1200)
  }

  const handleGoogleLogin = () => {
    setIsSuccess(true)
    localStorage.setItem('staynest_user', 'Rishikesh Traveller')
    setLoggedInUser('Rishikesh Traveller')
    setTimeout(() => {
      setIsSuccess(false)
      onClose()
    }, 1200)
  }

  const handleSignOut = () => {
    localStorage.removeItem('staynest_user')
    setLoggedInUser(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#E5EAF2] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {loggedInUser ? (
          /* Already Signed In View */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EEF3FD] text-[#1257D6] flex items-center justify-center mx-auto">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0F172A]">Welcome, {loggedInUser}!</h3>
              <p className="text-sm text-[#64748B] mt-1">You are signed in to StayNest Rishikesh.</p>
            </div>
            <div className="pt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 bg-[#1257D6] text-white font-semibold rounded-xl hover:bg-[#0D47A1] transition-colors cursor-pointer"
              >
                Continue exploring stays
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full py-2.5 border border-[#E5EAF2] text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : isSuccess ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-in zoom-in duration-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A]">Signed in successfully!</h3>
            <p className="text-sm text-[#64748B]">Welcome back to StayNest. Enjoy your Rishikesh stay.</p>
          </div>
        ) : (
          /* Sign In / Sign Up Form */
          <div className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#1257D6] text-white flex items-center justify-center text-sm font-bold">
                  S
                </div>
                <span className="text-xl font-bold tracking-tight text-[#0F172A]">StayNest</span>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A]">
                {tab === 'signin' ? 'Sign in to your account' : 'Create an account'}
              </h3>
              <p className="text-xs text-[#64748B] mt-1">
                Unlock exclusive Rishikesh member deals & saved wishlists
              </p>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-5">
              <button
                type="button"
                onClick={() => setTab('signin')}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  tab === 'signin' ? 'bg-white text-[#1257D6] shadow-xs' : 'text-slate-600'
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => setTab('signup')}
                className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  tab === 'signup' ? 'bg-white text-[#1257D6] shadow-xs' : 'text-slate-600'
                }`}
              >
                Create account
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">Email address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full h-10 pl-9 pr-3 text-sm rounded-xl border border-[#E5EAF2] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1257D6] focus:border-[#1257D6]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-[#0F172A]">Password</label>
                  {tab === 'signin' && (
                    <button type="button" className="text-[11px] text-[#1257D6] hover:underline">
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full h-10 pl-9 pr-3 text-sm rounded-xl border border-[#E5EAF2] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1257D6] focus:border-[#1257D6]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-[#1257D6] hover:bg-[#0D47A1] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer mt-2"
              >
                {tab === 'signin' ? 'Sign in' : 'Create free account'}
              </button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5EAF2]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400">or</span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full h-11 border border-[#E5EAF2] hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

