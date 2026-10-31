import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, AlertCircle } from 'lucide-react'

// Clean SVGs for Social Icons matching screenshot
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setSubscribed(true)
    setTimeout(() => {
      setSubscribed(false)
      setEmail('')
    }, 4500)
  }

  return (
    <footer className="w-full bg-white border-t border-[#E5EAF2] pt-10 sm:pt-12 pb-8">
      <div className="site-container">
        {/* Main Footer Columns: Desktop 5 cols, Tablet 2-3, Mobile 1-2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.8fr] gap-8 lg:gap-10 pb-12 items-start">
          
          {/* Col 1: Brand + "Comfort in every stay" + 1 line Rishikesh description */}
          <div className="space-y-2.5">
            <Link to="/" className="inline-flex items-center gap-2 group">
              {/* StayNest 3-Tower Icon */}
              <div className="w-[28px] h-[28px] flex items-center justify-center text-[#1257D6] group-hover:scale-105 transition-transform duration-200">
                <svg
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[28px] h-[28px] fill-[#1257D6]"
                  aria-hidden="true"
                >
                  <rect x="3" y="12" width="8" height="20" rx="1.5" />
                  <rect x="5.5" y="15" width="3" height="2.5" rx="0.5" fill="white" />
                  <rect x="5.5" y="20" width="3" height="2.5" rx="0.5" fill="white" />
                  <rect x="5.5" y="25" width="3" height="2.5" rx="0.5" fill="white" />

                  <rect x="13" y="4" width="10" height="28" rx="1.5" />
                  <rect x="16" y="8" width="4" height="3" rx="0.5" fill="white" />
                  <rect x="16" y="14" width="4" height="3" rx="0.5" fill="white" />
                  <rect x="16" y="20" width="4" height="3" rx="0.5" fill="white" />
                  <rect x="16" y="26" width="4" height="3" rx="0.5" fill="white" />

                  <rect x="25" y="10" width="8" height="22" rx="1.5" />
                  <rect x="27.5" y="14" width="3" height="2.5" rx="0.5" fill="white" />
                  <rect x="27.5" y="19" width="3" height="2.5" rx="0.5" fill="white" />
                  <rect x="27.5" y="24" width="3" height="2.5" rx="0.5" fill="white" />
                </svg>
              </div>
              <span className="text-[22px] font-bold tracking-tight text-[#0F172A] leading-none">
                StayNest
              </span>
            </Link>
            
            <p className="text-[14px] font-semibold text-[#0F172A]">
              Comfort in every stay
            </p>
            
            {/* 1 line Rishikesh description */}
            <p className="text-[13px] text-[#64748B] leading-relaxed max-w-sm">
              Your trusted platform for discovering sacred riverside retreats, boutique hotels, and yoga sanctuaries across Rishikesh, Uttarakhand.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-[12px] uppercase font-semibold text-[#0F172A] tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <Link to="/" className="text-[#64748B] hover:text-[#1257D6] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="text-[#64748B] hover:text-[#1257D6] transition-colors">
                  Hotels in Rishikesh
                </Link>
              </li>
              <li>
                <a href="#offers" className="text-[#64748B] hover:text-[#1257D6] transition-colors">
                  Special Offers
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-[#64748B] hover:text-[#1257D6] transition-colors">
                  Popular Areas
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="space-y-3">
            <h4 className="text-[12px] uppercase font-semibold text-[#0F172A] tracking-wider">
              Support
            </h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <a href="#help" className="text-[#64748B] hover:text-[#1257D6] transition-colors">
                  Help Centre
                </a>
              </li>
              <li>
                <a href="#guide" className="text-[#64748B] hover:text-[#1257D6] transition-colors">
                  Booking Guide
                </a>
              </li>
              <li>
                <a href="#cancellation" className="text-[#64748B] hover:text-[#1257D6] transition-colors">
                  Cancellation Policy
                </a>
              </li>
              <li>
                <a href="#contact" className="text-[#64748B] hover:text-[#1257D6] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div className="space-y-3">
            <h4 className="text-[12px] uppercase font-semibold text-[#0F172A] tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <a href="#about" className="text-[#64748B] hover:text-[#1257D6] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <Link to="/hotels" className="text-[#64748B] hover:text-[#1257D6] transition-colors">
                  List your property
                </Link>
              </li>
              <li>
                <a href="#careers" className="text-[#64748B] hover:text-[#1257D6] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#blog" className="text-[#64748B] hover:text-[#1257D6] transition-colors">
                  Travel Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Follow Us (4 social circles) + "Get travel inspiration" */}
          <div className="space-y-4">
            {/* Follow Us (4 social circles) */}
            <div>
              <h4 className="text-[12px] uppercase font-semibold text-[#0F172A] tracking-wider mb-2.5">
                Follow Us
              </h4>
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-[34px] h-[34px] rounded-full border border-[#E5EAF2] flex items-center justify-center text-[#0F172A] hover:text-[#1257D6] hover:border-[#1257D6] hover:bg-blue-50/50 transition-colors shadow-2xs"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-[34px] h-[34px] rounded-full border border-[#E5EAF2] flex items-center justify-center text-[#0F172A] hover:text-[#1257D6] hover:border-[#1257D6] hover:bg-blue-50/50 transition-colors shadow-2xs"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-[34px] h-[34px] rounded-full border border-[#E5EAF2] flex items-center justify-center text-[#0F172A] hover:text-[#1257D6] hover:border-[#1257D6] hover:bg-blue-50/50 transition-colors shadow-2xs"
                  aria-label="YouTube"
                >
                  <YoutubeIcon />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-[34px] h-[34px] rounded-full border border-[#E5EAF2] flex items-center justify-center text-[#0F172A] hover:text-[#1257D6] hover:border-[#1257D6] hover:bg-blue-50/50 transition-colors shadow-2xs"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon />
                </a>
              </div>
            </div>

            {/* "Get travel inspiration" Email input + arrow button with validation & toast */}
            <div>
              <h4 className="text-[12px] uppercase font-semibold text-[#0F172A] tracking-wider mb-2">
                Get travel inspiration
              </h4>
              <form onSubmit={handleSubscribe} className="space-y-1.5">
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errorMessage) setErrorMessage('')
                    }}
                    placeholder="Enter your email"
                    className="flex-1 min-w-0 h-[40px] px-3.5 text-[13px] rounded-xl border border-[#E5EAF2] bg-[#F8FAFC] focus:bg-white text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#1257D6] focus:border-[#1257D6] transition-all"
                  />
                  <button
                    type="submit"
                    className="w-[40px] h-[40px] rounded-xl bg-[#1257D6] hover:bg-[#0D47A1] text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs cursor-pointer"
                    aria-label="Subscribe to inspiration"
                  >
                    {subscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>

                {/* Validation error */}
                {errorMessage && (
                  <p className="text-[11px] text-red-600 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errorMessage}</span>
                  </p>
                )}

                {/* Success Toast Notification */}
                {subscribed && (
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[12px] flex items-center gap-1.5 animate-in fade-in duration-200">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Thank you for subscribing! Rishikesh guides sent to your inbox.</span>
                  </div>
                )}
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Line: "© 2026 StayNest. All rights reserved." */}
        <div className="pt-6 border-t border-[#E5EAF2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
          <p>© 2026 StayNest. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-[#1257D6] transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-[#1257D6] transition-colors">
              Terms of Service
            </a>
            <a href="#sitemap" className="hover:text-[#1257D6] transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
