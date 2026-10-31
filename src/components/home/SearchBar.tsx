import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapPin,
  Calendar,
  Users,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
} from 'lucide-react'
import { cn } from '../../lib/utils'

interface AreaOption {
  id: string
  name: string
  subtitle: string
}

export function SearchBar() {
  const navigate = useNavigate()

  // Areas list strictly for Rishikesh
  const rishikeshAreas: AreaOption[] = [
    { id: 'all', name: 'Rishikesh, Uttarakhand', subtitle: 'All localities & valley' },
    { id: 'laxman-jhula', name: 'Laxman Jhula', subtitle: 'Suspension bridge & Cliffside stays' },
    { id: 'tapovan', name: 'Tapovan', subtitle: 'Yoga ashrams & vibrant cafes' },
    { id: 'ram-jhula', name: 'Ram Jhula / Swarg Ashram', subtitle: 'Ganga ghats & Parmarth Aarti' },
    { id: 'shivpuri', name: 'Shivpuri', subtitle: 'Rafting haven & Luxury beach camps' },
    { id: 'muni-ki-reti', name: 'Muni Ki Reti', subtitle: 'Sacred ashrams & Pilgrim ghats' },
  ]

  // Search state
  const [selectedArea, setSelectedArea] = useState<string>('Rishikesh, Uttarakhand')
  const [selectedAreaId, setSelectedAreaId] = useState<string>('all')

  // Dates state (stored as Date objects for real calendar calculations)
  // Default to November 2026 as per screenshot / prompt
  const [checkInDate, setCheckInDate] = useState<Date>(new Date(2026, 10, 12)) // 12 Nov 2026
  const [checkOutDate, setCheckOutDate] = useState<Date>(new Date(2026, 10, 15)) // 15 Nov 2026

  // Calendar month navigation state
  const [calendarViewDate, setCalendarViewDate] = useState<Date>(new Date(2026, 10, 1))

  // Guests state
  const [adults, setAdults] = useState<number>(2)
  const [children, setChildren] = useState<number>(0)
  const [rooms, setRooms] = useState<number>(1)

  // Active popover: 'area' | 'checkin' | 'checkout' | 'guests' | null
  const [activePopover, setActivePopover] = useState<'area' | 'checkin' | 'checkout' | 'guests' | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActivePopover(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Helper date formatter: "12 Nov 2026"
  const formatDate = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  // Handle Date Selection with checkout >= checkin enforcement
  const handleSelectDate = (date: Date, type: 'checkin' | 'checkout') => {
    if (type === 'checkin') {
      setCheckInDate(date)
      // If new check-in is >= current check-out, push check-out to checkin + 3 days
      if (date.getTime() >= checkOutDate.getTime()) {
        const nextCheckout = new Date(date)
        nextCheckout.setDate(date.getDate() + 3)
        setCheckOutDate(nextCheckout)
      }
      setActivePopover('checkout')
    } else {
      if (date.getTime() >= checkInDate.getTime()) {
        setCheckOutDate(date)
        setActivePopover(null)
      }
    }
  }

  // Handle search submission
  const handleSearch = () => {
    const params = new URLSearchParams()
    params.set('area', selectedAreaId)
    params.set('checkin', formatDate(checkInDate))
    params.set('checkout', formatDate(checkOutDate))
    params.set('adults', String(adults))
    params.set('rooms', String(rooms))
    if (children > 0) {
      params.set('children', String(children))
    }

    navigate(`/hotels?${params.toString()}`)
  }

  // Calendar generation helpers
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = (pickerType: 'checkin' | 'checkout') => {
    const year = calendarViewDate.getFullYear()
    const month = calendarViewDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const monthsNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8" />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDayDate = new Date(year, month, day)
      const isCheckIn = currentDayDate.toDateString() === checkInDate.toDateString()
      const isCheckOut = currentDayDate.toDateString() === checkOutDate.toDateString()
      const isInRange =
        currentDayDate.getTime() > checkInDate.getTime() &&
        currentDayDate.getTime() < checkOutDate.getTime()

      // Disabled if picking checkout and day is before checkin
      const isDisabled = pickerType === 'checkout' && currentDayDate.getTime() < checkInDate.getTime()

      days.push(
        <button
          key={day}
          type="button"
          disabled={isDisabled}
          onClick={() => handleSelectDate(currentDayDate, pickerType)}
          className={cn(
            'h-8 w-8 rounded-full text-xs font-medium flex items-center justify-center transition-colors cursor-pointer',
            isCheckIn || isCheckOut
              ? 'bg-[#1257D6] text-white font-bold shadow-xs'
              : isInRange
              ? 'bg-[#EEF3FD] text-[#1257D6] rounded-none'
              : isDisabled
              ? 'text-slate-300 pointer-events-none'
              : 'hover:bg-slate-100 text-slate-700'
          )}
        >
          {day}
        </button>
      )
    }

    return (
      <div className="p-3 w-[290px] bg-white rounded-xl shadow-xl border border-[#E5EAF2]">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#E5EAF2]">
          <span className="text-xs font-bold text-[#0F172A]">
            {monthsNames[month]} {year}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCalendarViewDate(new Date(year, month - 1, 1))}
              className="p-1 rounded-md hover:bg-slate-100 text-slate-600 cursor-pointer"
              aria-label="Previous Month"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setCalendarViewDate(new Date(year, month + 1, 1))}
              className="p-1 rounded-md hover:bg-slate-100 text-slate-600 cursor-pointer"
              aria-label="Next Month"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-400 mb-1">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">{days}</div>

        <div className="mt-2.5 pt-2 border-t border-[#E5EAF2] flex items-center justify-between text-[11px] text-slate-500">
          <span>{pickerType === 'checkin' ? 'Select Check-in' : 'Select Check-out'}</span>
          <button
            type="button"
            onClick={() => setActivePopover(null)}
            className="text-[#1257D6] font-semibold hover:underline cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative site-container -mt-10 z-30" ref={containerRef}>
      {/* Search Card Container: white, rounded-2xl, shadow-xl, p-3 */}
      <div className="bg-white rounded-2xl shadow-xl border border-[#E5EAF2] p-3">
        
        {/* ========================================================
            DESKTOP (>=1024px): SINGLE ROW, flex-nowrap, grid
            Vertical dividers between fields. Text never wraps/truncates.
           ======================================================== */}
        <div className="hidden lg:grid lg:grid-cols-[1.2fr_auto_1fr_auto_1fr_auto_1.1fr_auto] items-center gap-0 w-full">
          
          {/* Field 1: Where to? */}
          <div className="relative px-1 xl:px-2">
            <button
              type="button"
              onClick={() => setActivePopover(activePopover === 'area' ? null : 'area')}
              className={cn(
                'w-full flex items-center justify-between gap-1.5 xl:gap-2.5 py-1.5 px-1.5 xl:px-2 rounded-xl text-left transition-colors cursor-pointer',
                activePopover === 'area' ? 'bg-[#EEF3FD]' : 'hover:bg-slate-50'
              )}
            >
              <div className="flex items-center gap-1.5 xl:gap-2.5 min-w-0">
                <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#EEF3FD] flex items-center justify-center shrink-0 text-[#1257D6]">
                  <MapPin className="w-4 h-4 xl:w-5 xl:h-5 text-[#1257D6]" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] xl:text-[11px] font-semibold text-[#64748B] uppercase tracking-wider leading-tight">
                    Where to?
                  </span>
                  <span className="block text-[13px] xl:text-[15px] font-semibold text-[#0F172A] whitespace-nowrap leading-tight mt-0.5 truncate">
                    {selectedArea}
                  </span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-slate-400 shrink-0 ml-1" />
            </button>

            {/* Area Popover */}
            {activePopover === 'area' && (
              <div className="absolute top-full left-0 mt-3 w-80 bg-white rounded-xl border border-[#E5EAF2] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 border-b border-[#E5EAF2] mb-1">
                  <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                    Select Rishikesh Area
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto space-y-1">
                  {rishikeshAreas.map((area) => {
                    const isSelected = selectedArea === area.name
                    return (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => {
                          setSelectedArea(area.name)
                          setSelectedAreaId(area.id)
                          setActivePopover(null)
                        }}
                        className={cn(
                          'w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer',
                          isSelected
                            ? 'bg-[#EEF3FD] text-[#1257D6] font-semibold'
                            : 'hover:bg-slate-50 text-[#0F172A]'
                        )}
                      >
                        <div>
                          <div className="text-sm font-semibold">{area.name}</div>
                          <div className="text-xs text-[#64748B]">{area.subtitle}</div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#1257D6] shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Divider 1 */}
          <div className="w-px h-8 xl:h-10 bg-[#E5EAF2] shrink-0" />

          {/* Field 2: Check-in */}
          <div className="relative px-1 xl:px-2">
            <button
              type="button"
              onClick={() => setActivePopover(activePopover === 'checkin' ? null : 'checkin')}
              className={cn(
                'w-full flex items-center justify-between gap-1.5 xl:gap-2.5 py-1.5 px-1.5 xl:px-2 rounded-xl text-left transition-colors cursor-pointer',
                activePopover === 'checkin' ? 'bg-[#EEF3FD]' : 'hover:bg-slate-50'
              )}
            >
              <div className="flex items-center gap-1.5 xl:gap-2.5 min-w-0">
                <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#EEF3FD] flex items-center justify-center shrink-0 text-[#1257D6]">
                  <Calendar className="w-4 h-4 xl:w-5 xl:h-5 text-[#1257D6]" />
                </div>
                <div>
                  <span className="block text-[10px] xl:text-[11px] font-semibold text-[#64748B] uppercase tracking-wider leading-tight">
                    Check-in
                  </span>
                  <span className="block text-[13px] xl:text-[15px] font-semibold text-[#0F172A] whitespace-nowrap leading-tight mt-0.5">
                    {formatDate(checkInDate)}
                  </span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-slate-400 shrink-0 ml-1" />
            </button>

            {/* Check-in Calendar Popover */}
            {activePopover === 'checkin' && (
              <div className="absolute top-full left-0 mt-3 z-50">
                {renderCalendar('checkin')}
              </div>
            )}
          </div>

          {/* Divider 2 */}
          <div className="w-px h-8 xl:h-10 bg-[#E5EAF2] shrink-0" />

          {/* Field 3: Check-out */}
          <div className="relative px-1 xl:px-2">
            <button
              type="button"
              onClick={() => setActivePopover(activePopover === 'checkout' ? null : 'checkout')}
              className={cn(
                'w-full flex items-center justify-between gap-1.5 xl:gap-2.5 py-1.5 px-1.5 xl:px-2 rounded-xl text-left transition-colors cursor-pointer',
                activePopover === 'checkout' ? 'bg-[#EEF3FD]' : 'hover:bg-slate-50'
              )}
            >
              <div className="flex items-center gap-1.5 xl:gap-2.5 min-w-0">
                <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#EEF3FD] flex items-center justify-center shrink-0 text-[#1257D6]">
                  <Calendar className="w-4 h-4 xl:w-5 xl:h-5 text-[#1257D6]" />
                </div>
                <div>
                  <span className="block text-[10px] xl:text-[11px] font-semibold text-[#64748B] uppercase tracking-wider leading-tight">
                    Check-out
                  </span>
                  <span className="block text-[13px] xl:text-[15px] font-semibold text-[#0F172A] whitespace-nowrap leading-tight mt-0.5">
                    {formatDate(checkOutDate)}
                  </span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-slate-400 shrink-0 ml-1" />
            </button>

            {/* Check-out Calendar Popover */}
            {activePopover === 'checkout' && (
              <div className="absolute top-full left-0 mt-3 z-50">
                {renderCalendar('checkout')}
              </div>
            )}
          </div>

          {/* Divider 3 */}
          <div className="w-px h-8 xl:h-10 bg-[#E5EAF2] shrink-0" />

          {/* Field 4: Guests */}
          <div className="relative px-1 xl:px-2">
            <button
              type="button"
              onClick={() => setActivePopover(activePopover === 'guests' ? null : 'guests')}
              className={cn(
                'w-full flex items-center justify-between gap-1.5 xl:gap-2.5 py-1.5 px-1.5 xl:px-2 rounded-xl text-left transition-colors cursor-pointer',
                activePopover === 'guests' ? 'bg-[#EEF3FD]' : 'hover:bg-slate-50'
              )}
            >
              <div className="flex items-center gap-1.5 xl:gap-2.5 min-w-0">
                <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#EEF3FD] flex items-center justify-center shrink-0 text-[#1257D6]">
                  <Users className="w-4 h-4 xl:w-5 xl:h-5 text-[#1257D6]" />
                </div>
                <div>
                  <span className="block text-[10px] xl:text-[11px] font-semibold text-[#64748B] uppercase tracking-wider leading-tight">
                    Guests
                  </span>
                  <span className="block text-[13px] xl:text-[15px] font-semibold text-[#0F172A] whitespace-nowrap leading-tight mt-0.5">
                    {adults + children} {adults + children === 1 ? 'adult' : 'adults'} · {rooms} {rooms === 1 ? 'room' : 'rooms'}
                  </span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-slate-400 shrink-0 ml-1" />
            </button>

            {/* Guests Popover */}
            {activePopover === 'guests' && (
              <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-xl border border-[#E5EAF2] shadow-2xl p-4 z-50">
                <div className="space-y-4">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-[#0F172A]">Adults</div>
                      <div className="text-xs text-[#64748B]">Ages 13 or above</div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        disabled={adults <= 1}
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 rounded-full border border-[#E5EAF2] flex items-center justify-center text-slate-700 hover:border-[#1257D6] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-[#0F172A]">{adults}</span>
                      <button
                        type="button"
                        disabled={adults >= 10}
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 rounded-full border border-[#E5EAF2] flex items-center justify-center text-slate-700 hover:border-[#1257D6] disabled:opacity-40 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#E5EAF2]">
                    <div>
                      <div className="text-sm font-semibold text-[#0F172A]">Children</div>
                      <div className="text-xs text-[#64748B]">Ages 0 to 12</div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        disabled={children <= 0}
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 rounded-full border border-[#E5EAF2] flex items-center justify-center text-slate-700 hover:border-[#1257D6] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-[#0F172A]">{children}</span>
                      <button
                        type="button"
                        disabled={children >= 6}
                        onClick={() => setChildren(children + 1)}
                        className="w-8 h-8 rounded-full border border-[#E5EAF2] flex items-center justify-center text-slate-700 hover:border-[#1257D6] disabled:opacity-40 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Rooms */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#E5EAF2]">
                    <div>
                      <div className="text-sm font-semibold text-[#0F172A]">Rooms</div>
                      <div className="text-xs text-[#64748B]">Total rooms</div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        disabled={rooms <= 1}
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        className="w-8 h-8 rounded-full border border-[#E5EAF2] flex items-center justify-center text-slate-700 hover:border-[#1257D6] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-[#0F172A]">{rooms}</span>
                      <button
                        type="button"
                        disabled={rooms >= 6}
                        onClick={() => setRooms(rooms + 1)}
                        className="w-8 h-8 rounded-full border border-[#E5EAF2] flex items-center justify-center text-slate-700 hover:border-[#1257D6] disabled:opacity-40 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActivePopover(null)}
                    className="w-full mt-2 py-2.5 bg-[#1257D6] text-white text-xs font-semibold rounded-lg hover:bg-[#0D47A1] transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Button: "Search hotels" */}
          <div className="pl-1 xl:pl-2">
            <button
              type="button"
              onClick={handleSearch}
              className="h-12 xl:h-14 px-4 xl:px-8 bg-[#1257D6] hover:bg-[#0D47A1] active:bg-[#0B57D0] text-white font-semibold text-xs sm:text-sm xl:text-[16px] rounded-xl shadow-xs hover:shadow transition-all duration-150 flex items-center justify-center gap-1.5 xl:gap-2 group cursor-pointer whitespace-nowrap"
            >
              <Search className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span>Search hotels</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            TABLET (sm to lg: 640px - 1023px): 2x2 grid + full-width button
            MOBILE (<640px): stacked 1-col + full-width button
           ======================================================== */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
            
            {/* Field 1: Where to? */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActivePopover(activePopover === 'area' ? null : 'area')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#E5EAF2] bg-slate-50/70 hover:bg-slate-50 text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#EEF3FD] flex items-center justify-center shrink-0 text-[#1257D6]">
                    <MapPin className="w-5 h-5 text-[#1257D6]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                      Where to?
                    </span>
                    <span className="block text-[15px] font-semibold text-[#0F172A] truncate">
                      {selectedArea}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
              </button>

              {activePopover === 'area' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[#E5EAF2] shadow-2xl p-2 z-50">
                  {rishikeshAreas.map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => {
                        setSelectedArea(area.name)
                        setSelectedAreaId(area.id)
                        setActivePopover(null)
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-slate-50 text-sm font-semibold"
                    >
                      <span>{area.name}</span>
                      {selectedArea === area.name && <Check className="w-4 h-4 text-[#1257D6]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Field 2: Check-in */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActivePopover(activePopover === 'checkin' ? null : 'checkin')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#E5EAF2] bg-slate-50/70 hover:bg-slate-50 text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#EEF3FD] flex items-center justify-center shrink-0 text-[#1257D6]">
                    <Calendar className="w-5 h-5 text-[#1257D6]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                      Check-in
                    </span>
                    <span className="block text-[15px] font-semibold text-[#0F172A]">
                      {formatDate(checkInDate)}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
              </button>

              {activePopover === 'checkin' && (
                <div className="absolute top-full left-0 mt-2 z-50">
                  {renderCalendar('checkin')}
                </div>
              )}
            </div>

            {/* Field 3: Check-out */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActivePopover(activePopover === 'checkout' ? null : 'checkout')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#E5EAF2] bg-slate-50/70 hover:bg-slate-50 text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#EEF3FD] flex items-center justify-center shrink-0 text-[#1257D6]">
                    <Calendar className="w-5 h-5 text-[#1257D6]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                      Check-out
                    </span>
                    <span className="block text-[15px] font-semibold text-[#0F172A]">
                      {formatDate(checkOutDate)}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
              </button>

              {activePopover === 'checkout' && (
                <div className="absolute top-full left-0 mt-2 z-50">
                  {renderCalendar('checkout')}
                </div>
              )}
            </div>

            {/* Field 4: Guests */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActivePopover(activePopover === 'guests' ? null : 'guests')}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#E5EAF2] bg-slate-50/70 hover:bg-slate-50 text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#EEF3FD] flex items-center justify-center shrink-0 text-[#1257D6]">
                    <Users className="w-5 h-5 text-[#1257D6]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                      Guests
                    </span>
                    <span className="block text-[15px] font-semibold text-[#0F172A]">
                      {adults + children} {adults + children === 1 ? 'adult' : 'adults'} · {rooms} {rooms === 1 ? 'room' : 'rooms'}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
              </button>

              {activePopover === 'guests' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-[#E5EAF2] shadow-2xl p-4 z-50">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Adults</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={adults <= 1}
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{adults}</span>
                        <button
                          type="button"
                          disabled={adults >= 10}
                          onClick={() => setAdults(adults + 1)}
                          className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-sm font-semibold">Rooms</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={rooms <= 1}
                          onClick={() => setRooms(Math.max(1, rooms - 1))}
                          className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-sm font-bold">{rooms}</span>
                        <button
                          type="button"
                          disabled={rooms >= 6}
                          onClick={() => setRooms(rooms + 1)}
                          className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActivePopover(null)}
                      className="w-full mt-2 py-2 bg-[#1257D6] text-white text-xs font-semibold rounded-lg"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Full-width "Search hotels" button for Mobile & Tablet */}
          <button
            type="button"
            onClick={handleSearch}
            className="w-full h-14 bg-[#1257D6] hover:bg-[#0D47A1] text-white font-semibold text-[16px] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Search className="w-5 h-5 text-white" />
            <span>Search hotels</span>
          </button>
        </div>

      </div>
    </div>
  )
}
