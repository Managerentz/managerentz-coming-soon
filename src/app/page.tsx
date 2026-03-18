'use client'

import { useState, useTransition } from 'react'
import { addToWaitlist } from './actions'

export default function Home() {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setMessage(null)
    startTransition(async () => {
      const result = await addToWaitlist(formData)
      if (result.error) {
        setMessage({ type: 'error', text: result.error })
      } else {
        setMessage({ type: 'success', text: "You're on the list! We'll be in touch soon." })
      }
    })
  }

  return (
    <div className="flex h-screen flex-col items-center justify-between bg-[#fcfdfe] px-6 py-8 font-sans text-slate-900 selection:bg-brand-green/30 overflow-hidden">
      {/* Header / Logo */}
      <header className="flex w-full justify-center pt-4">
        <h1 className="text-sm font-black tracking-[0.2em] transform scale-y-110">
          MANAGERENTZ
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center max-w-2xl px-4">
          <h2 className="mb-8 flex flex-col items-center text-6xl font-black leading-[1.1] tracking-tight md:text-8xl">
            <span>Coming</span>
            <span className="bg-gradient-to-br from-brand-green to-brand-green-dark bg-clip-text text-transparent">
              Soon.
            </span>
          </h2>

          <p className="mb-16 max-w-md text-base font-medium leading-relaxed text-slate-500 md:text-lg">
            We're building the ultimate workspace for rental operations. Join the waitlist for early access.
          </p>

          {/* Waitlist Form */}
          <div className="w-full max-w-md">
            <form action={handleSubmit} className="relative flex flex-col items-center gap-4">
              <div className="relative w-full flex items-center p-1.5 rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/50 transition-all focus-within:ring-brand-green/20 focus-within:shadow-[0_8px_30px_rgb(16,185,129,0.08)]">
                <input
                  type="email"
                  name="email"
                  required
                  disabled={isPending}
                  placeholder="Enter your email"
                  className="w-full bg-transparent px-5 py-3 text-sm font-medium outline-none placeholder:text-slate-400 disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={isPending}
                  className="whitespace-nowrap rounded-xl bg-brand-green px-6 py-3 text-sm font-bold text-white transition-all hover:bg-brand-green-dark active:scale-[0.98] shadow-lg shadow-brand-green/20 disabled:opacity-50"
                >
                  {isPending ? 'Joining...' : 'Notify Me'}
                </button>
              </div>
              
              {/* Message Feedback */}
              {message && (
                <div className={`text-xs font-bold px-4 py-2 rounded-lg animate-in fade-in zoom-in-95 duration-300 ${
                  message.type === 'success' 
                  ? 'bg-brand-green/10 text-brand-green' 
                  : 'bg-red-500/10 text-red-500'
                }`}>
                  {message.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto flex flex-col items-center gap-8 pb-8">
        <div className="flex flex-col pt-5 items-center gap-2 text-xs font-medium text-slate-500 md:flex-row md:gap-8">
          <a href="tel:+919944515374" className="transition-colors hover:text-brand-green">
            +91 99445 15374
          </a>
        
          <a href="mailto:managerentz@gmail.com" className="transition-colors hover:text-brand-green">
            managerentz@gmail.com
          </a>
        </div>
        <p className="text-[10px] font-semibold tracking-[0.05em] text-slate-300">
          © 2024 MANAGERENTZ INC.
        </p>
      </footer>
    </div>
  )
}
