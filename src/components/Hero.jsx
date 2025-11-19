import { motion } from 'framer-motion'
import ParallaxScene from './ParallaxScene'
import Lottie from 'lottie-react'

// Simple empathic people themed Lottie JSONs hosted from public CDNs
// If you have specific Lottie files, we can replace these URLs later
const lotties = {
  connect: 'https://assets10.lottiefiles.com/packages/lf20_M9p23l.json',
  heart: 'https://assets10.lottiefiles.com/packages/lf20_3vbOcw.json',
  meditate: 'https://assets3.lottiefiles.com/packages/lf20_zrqthn6o.json'
}

function LottieRemote({ url, className }) {
  // We fetch JSON and feed into Lottie component
  const [data, setData] = React.useState(null)
  React.useEffect(() => {
    let active = true
    fetch(url).then(r => r.json()).then(j => { if (active) setData(j) })
    return () => { active = false }
  }, [url])
  if (!data) return <div className={className + ' bg-white/5 rounded-xl animate-pulse'} />
  return <Lottie animationData={data} loop autoplay className={className} />
}

export default function Hero({ onSubscribe }) {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center text-center text-white px-6">
      <ParallaxScene />
      <div className="relative z-10 max-w-6xl w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-teal-200 to-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.35)]"
        >
          EmpathicSuccess.com
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mt-6 text-lg sm:text-2xl text-teal-100/90"
        >
          A warm, world-class community empowering empaths to thrive — with heart-led learning,
          gentle accountability, and practical tools for bold success.
        </motion.p>

        {/* Lottie strip */}
        <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3">
              <LottieRemote url={lotties.connect} className="h-36 sm:h-48" />
              <p className="text-teal-100/90 text-sm mt-2">Deep connection without overwhelm</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3">
              <LottieRemote url={lotties.heart} className="h-36 sm:h-48" />
              <p className="text-teal-100/90 text-sm mt-2">Lead with compassion and clarity</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3">
              <LottieRemote url={lotties.meditate} className="h-36 sm:h-48" />
              <p className="text-teal-100/90 text-sm mt-2">Calm focus, courageous action</p>
            </div>
          </motion.div>
        </div>

        {/* Newsletter form */}
        <Newsletter onSubscribe={onSubscribe} />

        {/* Trust bar */}
        <div className="mt-10 text-teal-100/80 text-sm">
          Join early to receive gentle prompts, success rituals, and community invites.
        </div>
      </div>
    </section>
  )
}

import React from 'react'

function Newsletter({ onSubscribe }) {
  const [firstName, setFirstName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState('idle')
  const [message, setMessage] = React.useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setMessage('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, first_name: firstName, source: 'landing' })
      })
      if (!res.ok) throw new Error('Subscription failed')
      setStatus('success')
      setMessage('You are in. Welcome home!')
      setEmail('')
      setFirstName('')
      onSubscribe && onSubscribe()
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Something went wrong')
    }
  }

  return (
    <form onSubmit={submit} className="mt-10 mx-auto max-w-2xl">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <input
          type="text"
          placeholder="First name (optional)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="flex-1 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400/60"
        />
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-[2] rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400/60"
        />
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-semibold px-6 py-3 hover:shadow-[0_0_30px_rgba(45,212,191,0.45)] transition-shadow"
        >
          {status === 'loading' ? 'Joining…' : 'Join the Newsletter'}
        </button>
      </div>
      {message && (
        <div className={`mt-3 text-sm ${status === 'error' ? 'text-red-200' : 'text-teal-200'}`}>{message}</div>
      )}
      <p className="mt-3 text-xs text-teal-100/70">Zero spam. Always kind. Unsubscribe anytime.</p>
    </form>
  )
}
