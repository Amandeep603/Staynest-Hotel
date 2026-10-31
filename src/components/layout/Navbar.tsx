import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home as HomeIcon, User, ChevronDown, Menu, X, Heart } from 'lucide-react'
import { getWishlist, WISHLIST_CHANGE_EVENT } from '../../lib/wishlist'
import { SignInModal } from '../common/SignInModal'
import { cn } from '../../lib/utils'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)
  const [wishlistCount, setWishlistCount] = useState<number>(() => getWishlist().length)
  const location = useLocation()

  // Real-time wishlist count sync
  useEffect(() => {
    const handleSync = () => {
      setWishlistCount(getWishlist().length)
    }
    window.addEventListener(WISHLIST_CHANGE_EVENT, handleSync)
    return () => window.removeEventListener(WISHLIST_CHANGE_EVENT, handleSync)
  }, [])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Hotels', href: '/hotels' },
    { label: 'Offers', href: '/offers' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-[#E5EAF2] shadow-2xs">
        <div className="site-container">
          {/* Navbar Height: 64px (h-16) */}
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Brand Logo */}
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-7 h-7 flex items-center justify-center text-[#1257D6] group-hover:scale-105 transition-transform duration-200 shrink-0">
                <svg
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 fill-[#1257D6]"
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

            {/* Center: Desktop Navigation Links (>=1024px) */}
            <nav className="hidden lg:flex items-center gap-8 h-full">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={cn(
                      'relative h-full inline-flex items-center text-[14px] font-medium transition-colors duration-150',
                      active
                        ? 'text-[#1257D6] font-semibold'
                        : 'text-slate-600 hover:text-[#1257D6]'
                    )}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1257D6] rounded-t-full" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Right: Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Wishlist Link with Heart Icon + Live Count Badge */}
              <Link
                to="/wishlist"
                className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#E5EAF2] hover:bg-slate-50 text-slate-700 hover:text-[#1257D6] transition-colors"
                aria-label={`Wishlist (${wishlistCount} items)`}
                title="View saved stays"
              >
                <Heart className={cn('w-4 h-4', wishlistCount > 0 ? 'text-red-500 fill-red-500' : 'text-slate-600')} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1257D6] text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* "List your property" */}
              <Link
                to="/hotels"
                className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-[#D0E1FD] bg-[#F4F8FE] hover:bg-[#E8F0FE] text-[#1257D6] text-[13px] font-semibold transition-all duration-150 shadow-2xs"
              >
                <HomeIcon className="w-3.5 h-3.5 text-[#1257D6]" />
                <span>List your property</span>
              </Link>

              {/* "Sign in" button */}
              <button
                type="button"
                onClick={() => setSignInOpen(true)}
                className="inline-flex items-center gap-1.5 h-9 px-2.5 rounded-lg text-slate-700 hover:text-[#1257D6] hover:bg-slate-50 transition-colors duration-150 text-[13px] font-medium cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <User className="w-3 h-3" />
                </div>
                <span>Sign in</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* Mobile Actions: Wishlist Heart + Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                to="/wishlist"
                className="relative p-2 rounded-lg text-slate-700 hover:bg-slate-100"
                aria-label="Wishlist"
              >
                <Heart className={cn('w-5 h-5', wishlistCount > 0 ? 'text-red-500 fill-red-500' : 'text-slate-600')} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#1257D6] text-white text-[9px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E5EAF2] bg-white px-4 pt-3 pb-5 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'px-3.5 py-2.5 rounded-xl text-[14px] font-medium transition-colors flex items-center justify-between',
                      active
                        ? 'bg-[#EEF3FD] text-[#1257D6] font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    )}
                  >
                    <span>{link.label}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-[#1257D6]" />}
                  </Link>
                )
              })}
            </div>

            <div className="pt-3 border-t border-[#E5EAF2] flex flex-col gap-2.5">
              <Link
                to="/hotels"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl border border-[#D0E1FD] bg-[#F4F8FE] text-[#1257D6] text-[13px] font-semibold transition-colors"
              >
                <HomeIcon className="w-4 h-4 text-[#1257D6]" />
                <span>List your property</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  setSignInOpen(true)
                }}
                className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl border border-[#E5EAF2] text-slate-700 text-[13px] font-medium hover:bg-slate-50 transition-colors"
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>Sign in</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Sign In Dummy Modal */}
      <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
    </>
  )
}
