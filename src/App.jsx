import React from 'react'
import Hero from './components/Hero'
import Sections from './components/Sections'

function App() {
  const [joined, setJoined] = React.useState(false)
  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5">
        <a href="/" className="text-teal-200 font-bold tracking-tight">EmpathicSuccess</a>
        <nav className="hidden sm:flex gap-6 text-teal-100/80">
          <a href="#learn" className="hover:text-white transition-colors">Learn</a>
          <a href="#community" className="hover:text-white transition-colors">Community</a>
          <a href="#join" className="hover:text-white transition-colors">Join</a>
        </nav>
      </header>

      <main>
        <Hero onSubscribe={() => setJoined(true)} />
        <Sections />
      </main>

      <footer className="relative py-12 text-center text-teal-100/70">
        <p>Made with care for empaths. © {new Date().getFullYear()} EmpathicSuccess</p>
      </footer>

      {/* Toast */}
      {joined && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="rounded-xl bg-emerald-500/90 text-white px-4 py-2 shadow-lg">
            Welcome — your next brave chapter begins.
          </div>
        </div>
      )}
    </div>
  )
}

export default App
