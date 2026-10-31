import React, { useState } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  Sparkles,
  MessageSquare,
} from 'lucide-react'
import { cn } from '../lib/utils'

interface FormData {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Booking Inquiry',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ticketId, setTicketId] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const validate = (): boolean => {
    const errs: FormErrors = {}

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name.'
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Name must be at least 2 characters.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.'
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.'
    }

    if (formData.phone.trim()) {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,12}$/
      if (!phoneRegex.test(formData.phone.trim())) {
        errs.phone = 'Please enter a valid phone number (e.g. +91 98970 00000).'
      }
    }

    if (!formData.message.trim()) {
      errs.message = 'Please write your message.'
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Message must be at least 15 characters long.'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setTimeout(() => {
      const randomTicket = `SN-RSH-${Math.floor(100000 + Math.random() * 900000)}`
      setTicketId(randomTicket)
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 800)
  }

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: 'Booking Inquiry',
      message: '',
    })
    setErrors({})
    setIsSubmitted(false)
  }

  const faqs = [
    {
      q: 'Do Rishikesh hotels arrange airport and railway transfers?',
      a: 'Yes, most partner resorts and boutique hotels in Tapovan, Laxman Jhula, and Shivpuri offer pre-arranged private cab pickups from Jolly Grant Airport Dehradun (DED, ~35 mins) and Yog Nagari Rishikesh / Haridwar Railway Stations.',
    },
    {
      q: 'What is the best area to stay for first-time visitors?',
      a: 'For beginners and spiritual travelers, Tapovan and Laxman Jhula are ideal due to high walkability, peaceful river views, yoga schools, and famous organic cafes. For thrill-seekers, Shivpuri is the premier destination for riverside campsites and rafting.',
    },
    {
      q: 'Are yoga sessions and Ganga Aarti visits included in stays?',
      a: 'Many listed riverside properties (such as Aloha On The Ganges and Divine Resort) offer complimentary daily morning sunrise yoga and evening shuttle assistance for the Parmarth Niketan or Triveni Ghat Ganga Aarti.',
    },
    {
      q: 'What is the cancellation policy on StayNest?',
      a: 'Over 85% of our verified Rishikesh properties offer 100% Free Cancellation up to 48 hours before check-in. The exact policy is clearly highlighted on each room selection card.',
    },
  ]

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Navbar />

      <main className="flex-1 section-spacing">
        <div className="site-container">
          {/* Header */}
          <div className="max-w-2xl mb-10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1257D6] mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Devbhoomi Rishikesh Support</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight">
              Get in Touch with Our Rishikesh Team
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] mt-2">
              Have questions about booking a riverside resort, ashram stay, or planning a group adventure in Rishikesh? Our local Uttarakhand concierges are here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Contact Cards + FAQs (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Office & Direct Contact Info Card */}
              <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 shadow-sm space-y-5">
                <h2 className="text-lg font-bold text-[#0F172A] pb-3 border-b border-[#E5EAF2]">
                  Our Local Rishikesh Office
                </h2>

                <div className="space-y-4 text-sm text-[#0F172A]">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EEF3FD] text-[#1257D6] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold block text-xs uppercase tracking-wider text-[#64748B]">
                        Physical Address
                      </span>
                      <p className="mt-0.5 leading-relaxed">
                        StayNest Concierge Desk, Tapovan Chowk, Badrinath Road, Rishikesh, Uttarakhand 249192, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EEF3FD] text-[#1257D6] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold block text-xs uppercase tracking-wider text-[#64748B]">
                        Phone & WhatsApp
                      </span>
                      <p className="mt-0.5 font-medium">
                        +91 135 243 0000 / +91 98970 88210
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EEF3FD] text-[#1257D6] flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold block text-xs uppercase tracking-wider text-[#64748B]">
                        Email Inquiries
                      </span>
                      <p className="mt-0.5 font-medium">
                        concierge@staynest-rishikesh.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EEF3FD] text-[#1257D6] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold block text-xs uppercase tracking-wider text-[#64748B]">
                        Concierge Hours
                      </span>
                      <p className="mt-0.5 leading-relaxed text-[#64748B]">
                        Monday – Sunday, 7:00 AM – 10:00 PM IST (Ganga Aarti friendly hours)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rishikesh FAQ Section */}
              <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#E5EAF2]">
                  <HelpCircle className="w-4 h-4 text-[#1257D6]" />
                  <h3 className="font-bold text-sm text-[#0F172A] uppercase tracking-wider">
                    Frequently Asked Questions
                  </h3>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="border border-[#E5EAF2] rounded-xl overflow-hidden transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full text-left p-3.5 bg-slate-50/50 hover:bg-slate-50 flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-[#0F172A] cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200',
                            openFaq === idx && 'rotate-180 text-[#1257D6]'
                          )}
                        />
                      </button>
                      {openFaq === idx && (
                        <div className="p-3.5 bg-white text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#E5EAF2]">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 sm:p-8 shadow-sm">
                {isSubmitted ? (
                  /* Success Feedback */
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs border border-emerald-100">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                        Inquiry Received
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                        Thank you, {formData.fullName}!
                      </h2>
                      <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
                        We have logged your request under ticket reference{' '}
                        <strong className="text-[#0F172A] font-semibold">{ticketId}</strong>. A dedicated StayNest Rishikesh concierge will review your message and reply via email within 2 hours.
                      </p>
                    </div>

                    <div className="bg-[#F5F8FC] rounded-xl p-4 max-w-md mx-auto text-left text-xs text-[#64748B] space-y-1 border border-[#E5EAF2]">
                      <div><strong>Subject:</strong> {formData.subject}</div>
                      <div><strong>Email:</strong> {formData.email}</div>
                      {formData.phone && <div><strong>Phone:</strong> {formData.phone}</div>}
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center justify-center gap-2 h-10 px-5 bg-[#1257D6] hover:bg-[#0D47A1] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-xs"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Send Another Message</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Contact Form */
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div>
                      <h2 className="text-xl font-bold text-[#0F172A]">
                        Send Us a Message
                      </h2>
                      <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                        Fill in your details below and our Rishikesh local reservation specialists will get back to you promptly.
                      </p>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Vikram Sharma"
                        className={cn(
                          'w-full h-11 px-3.5 rounded-xl border bg-white text-sm text-[#0F172A] focus:outline-none focus:ring-2 transition-all',
                          errors.fullName
                            ? 'border-rose-400 focus:ring-rose-200'
                            : 'border-[#E5EAF2] focus:border-[#1257D6] focus:ring-[#EEF3FD]'
                        )}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Email & Phone Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-1.5">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="vikram@example.com"
                          className={cn(
                            'w-full h-11 px-3.5 rounded-xl border bg-white text-sm text-[#0F172A] focus:outline-none focus:ring-2 transition-all',
                            errors.email
                              ? 'border-rose-400 focus:ring-rose-200'
                              : 'border-[#E5EAF2] focus:border-[#1257D6] focus:ring-[#EEF3FD]'
                          )}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-1.5">
                          Phone Number <span className="text-[#64748B] font-normal">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98970 00000"
                          className={cn(
                            'w-full h-11 px-3.5 rounded-xl border bg-white text-sm text-[#0F172A] focus:outline-none focus:ring-2 transition-all',
                            errors.phone
                              ? 'border-rose-400 focus:ring-rose-200'
                              : 'border-[#E5EAF2] focus:border-[#1257D6] focus:ring-[#EEF3FD]'
                          )}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Topic / Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-1.5">
                        Inquiry Topic <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full h-11 px-3.5 rounded-xl border border-[#E5EAF2] bg-white text-sm text-[#0F172A] focus:outline-none focus:border-[#1257D6] focus:ring-2 focus:ring-[#EEF3FD] appearance-none pr-9 cursor-pointer"
                        >
                          <option value="Booking Inquiry">Booking Inquiry / Room Selection</option>
                          <option value="List Your Rishikesh Property">List Your Rishikesh Property</option>
                          <option value="Rafting & Yoga Package">Rafting & Yoga Retreat Package</option>
                          <option value="Modification or Cancellation">Modification or Cancellation Request</option>
                          <option value="General Question">General Question about Rishikesh</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Message Area */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-[#0F172A] uppercase tracking-wider mb-1.5">
                        Your Message <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your trip dates, preferred area (Tapovan, Shivpuri, etc.), guest count, or special requests..."
                        className={cn(
                          'w-full p-3.5 rounded-xl border bg-white text-sm text-[#0F172A] focus:outline-none focus:ring-2 transition-all resize-y',
                          errors.message
                            ? 'border-rose-400 focus:ring-rose-200'
                            : 'border-[#E5EAF2] focus:border-[#1257D6] focus:ring-[#EEF3FD]'
                        )}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-[#1257D6] hover:bg-[#0D47A1] active:bg-[#0A3882] disabled:opacity-70 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

