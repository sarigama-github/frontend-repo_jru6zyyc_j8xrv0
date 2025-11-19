import { useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function Stars() {
  // create a static starfield using layered gradients for performance
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 mix-blend-screen opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.6) 50%, transparent 51%),' +
            'radial-gradient(1px 1px at 60% 70%, rgba(255,255,255,0.7) 50%, transparent 51%),' +
            'radial-gradient(1.5px 1.5px at 80% 20%, rgba(255,255,255,0.5) 50%, transparent 51%),' +
            'radial-gradient(1px 1px at 35% 80%, rgba(255,255,255,0.8) 50%, transparent 51%),' +
            'radial-gradient(1px 1px at 75% 45%, rgba(255,255,255,0.6) 50%, transparent 51%)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto',
        }}
      />
    </div>
  )
}

export default function ParallaxScene() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 800], [0, -80])
  const y2 = useTransform(scrollY, [0, 800], [0, -160])
  const y3 = useTransform(scrollY, [0, 800], [0, -240])
  const opacityHeroGlow = useTransform(scrollY, [0, 400], [1, 0.4])

  useEffect(() => {
    // smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-slate-950">
      {/* gradient base */}
      <motion.div style={{ y: y1, opacity: opacityHeroGlow }}
        className="absolute -inset-1 bg-[radial-gradient(60%_40%_at_50%_0%,#5eead4_0%,transparent_60%)]"/>

      {/* aurora layers */}
      <motion.div style={{ y: y2 }}
        className="absolute inset-0 opacity-60 blur-3xl"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] rounded-full bg-gradient-to-br from-emerald-400/20 via-cyan-400/15 to-purple-500/20" />
      </motion.div>

      <motion.div style={{ y: y3 }} className="absolute inset-0 opacity-50">
        <div className="absolute bottom-[-30%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-tr from-indigo-500/20 via-fuchsia-400/20 to-pink-500/20 blur-3xl" />
      </motion.div>

      <Stars />
      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px),\
             linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}
